import { Hyperbrowser } from "@hyperbrowser/sdk";
import { chromium, type Page } from "playwright-core";
import { ModelRefusalError, type Action, type ChatMessage, type ModelAdapter, type StepLog, type Task, type Usage } from "./types.js";

export const MAX_STEPS = 20;
export const WALL_CLOCK_MS = 3 * 60 * 1000;

// One system prompt for all models. Committed here; never tuned per model.
export const SYSTEM_PROMPT = `You control a web browser to complete one task. Each turn you receive the current page URL, title, and a screenshot. Reply with EXACTLY ONE action as a single JSON object and nothing else.

Actions:
{"action":"click","selector":"<css selector>"}
{"action":"type","selector":"<css selector>","text":"<text>"} (clears the field, then types)
{"action":"navigate","url":"<absolute url>"}
{"action":"scroll","direction":"up"} or {"action":"scroll","direction":"down"}
{"action":"extract","answer":"<answer text>"} (records your answer to the task)
{"action":"done"} (ends the task; if the task asks for information, extract first, then done)

Rules: use standard CSS selectors. Steps are limited, so act decisively.`;

const FORMAT_REMINDER =
  'Your reply was not a single valid action JSON object. Reply with exactly one JSON object from the action list, e.g. {"action":"done"} — no prose, no code fences.';

export function parseAction(text: string): Action | null {
  let t = text.trim();
  const fence = t.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fence) t = fence[1].trim();
  let obj: unknown;
  try {
    obj = JSON.parse(t);
  } catch {
    return null;
  }
  if (typeof obj !== "object" || obj === null) return null;
  const a = obj as Record<string, unknown>;
  switch (a.action) {
    case "click":
      return typeof a.selector === "string" ? { action: "click", selector: a.selector } : null;
    case "type":
      return typeof a.selector === "string" && typeof a.text === "string"
        ? { action: "type", selector: a.selector, text: a.text }
        : null;
    case "navigate":
      return typeof a.url === "string" ? { action: "navigate", url: a.url } : null;
    case "scroll":
      return a.direction === "up" || a.direction === "down" ? { action: "scroll", direction: a.direction } : null;
    case "extract":
      return typeof a.answer === "string" ? { action: "extract", answer: a.answer } : null;
    case "done":
      return { action: "done" };
    default:
      return null;
  }
}

async function execute(page: Page, action: Action): Promise<void> {
  switch (action.action) {
    case "click":
      await page.click(action.selector, { timeout: 10_000 });
      break;
    case "type":
      await page.fill(action.selector, action.text, { timeout: 10_000 });
      break;
    case "navigate":
      await page.goto(action.url, { waitUntil: "domcontentloaded", timeout: 20_000 });
      break;
    case "scroll":
      await page.mouse.wheel(0, action.direction === "down" ? 600 : -600);
      break;
    case "extract":
    case "done":
      break;
  }
}

export interface TrialResult {
  steps: StepLog[];
  finalAnswer: string | null;
  finalUrl: string | null;
  visitedUrls: string[];
  finalTitle: string;
  finalBodySnippet: string;
  elementFound: boolean | null; // only checked for elementExists tasks
  refused: boolean;
  wallTimeMs: number;
  usage: Usage;
  /** set when the trial aborted on a session/navigation error */
  infraError?: string;
}

export async function runTrial(hb: Hyperbrowser, adapter: ModelAdapter, task: Task): Promise<TrialResult> {
  const start = Date.now();
  const deadline = start + WALL_CLOCK_MS;
  const steps: StepLog[] = [];
  const visitedUrls: string[] = [];
  const usage: Usage = { input: 0, output: 0 };
  let finalAnswer: string | null = null;
  let refused = false;
  let infraError: string | undefined;
  let finalUrl: string | null = null;
  let finalTitle = "";
  let finalBodySnippet = "";
  let elementFound: boolean | null = null;

  const session = await hb.sessions.create({ timeoutMinutes: 5 });
  let browser;
  try {
    browser = await chromium.connectOverCDP(session.wsEndpoint);
    const context = browser.contexts()[0] ?? (await browser.newContext());
    const page = context.pages()[0] ?? (await context.newPage());

    try {
      await page.goto(task.startUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
    } catch (err) {
      infraError = `initial navigation failed: ${String(err)}`;
    }

    if (!infraError) {
      const messages: ChatMessage[] = [{ role: "user", text: `Task: ${task.instruction}` }];
      let lastExecError: string | undefined;
      let done = false;

      for (let n = 1; n <= MAX_STEPS && !done && Date.now() < deadline; n++) {
        // Observation: one format for all models. Only the latest screenshot
        // is sent as an image; older observations stay as text.
        for (const m of messages) delete m.imageB64;
        const shot = await page.screenshot({ type: "png" });
        visitedUrls.push(page.url());
        const obs =
          `URL: ${page.url()}\nTitle: ${await page.title()}` +
          (lastExecError ? `\nPrevious action failed: ${lastExecError}` : "");
        messages.push({ role: "user", text: obs, imageB64: shot.toString("base64") });
        lastExecError = undefined;

        const t0 = Date.now();
        let reply = await adapter.step(SYSTEM_PROMPT, messages);
        usage.input += reply.usage.input;
        usage.output += reply.usage.output;
        let action = parseAction(reply.text);
        let parseError = false;

        if (!action) {
          // one retry with a format reminder; second failure = no-op error step
          messages.push({ role: "assistant", text: reply.text });
          messages.push({ role: "user", text: FORMAT_REMINDER });
          reply = await adapter.step(SYSTEM_PROMPT, messages);
          usage.input += reply.usage.input;
          usage.output += reply.usage.output;
          action = parseAction(reply.text);
          if (!action) parseError = true;
        }
        const latencyMs = Date.now() - t0;
        messages.push({ role: "assistant", text: reply.text });

        if (!action) {
          steps.push({ n, action: { raw: reply.text }, parseError: true, latencyMs, usage: reply.usage });
          continue;
        }

        let execError: string | undefined;
        try {
          await execute(page, action);
        } catch (err) {
          execError = String(err instanceof Error ? err.message : err).slice(0, 300);
          lastExecError = execError;
        }
        if (action.action === "extract") finalAnswer = action.answer;
        if (action.action === "done") done = true;

        steps.push({
          n,
          action,
          ...(parseError ? { parseError: true as const } : {}),
          ...(execError ? { execError } : {}),
          latencyMs,
          usage: reply.usage,
        });
      }
    }

    finalUrl = page.url();
    visitedUrls.push(finalUrl);
    try {
      finalTitle = await page.title();
      finalBodySnippet = ((await page.textContent("body")) ?? "").slice(0, 2000);
    } catch {
      /* page may be gone; scorer works with what we have */
    }
    if (task.passCondition.type === "elementExists") {
      try {
        elementFound = (await page.$(task.passCondition.selector)) !== null;
      } catch {
        elementFound = false;
      }
    }
  } catch (err) {
    if (err instanceof ModelRefusalError) refused = true;
    else throw err;
  } finally {
    try {
      await browser?.close();
    } catch {}
    try {
      await hb.sessions.stop(session.id);
    } catch {}
  }

  return {
    steps,
    finalAnswer,
    finalUrl,
    visitedUrls,
    finalTitle,
    finalBodySnippet,
    elementFound,
    refused,
    wallTimeMs: Date.now() - start,
    usage,
    ...(infraError ? { infraError } : {}),
  };
}
