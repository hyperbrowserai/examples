import type { Outcome, Task } from "./types.js";
import type { TrialResult } from "./loop.js";

// Markers commonly present on CAPTCHA / bot-wall pages. Detection is best
// effort; when nothing matches and the failure isn't clearly the model's,
// the trial is tagged `unclassified`, never silently guessed.
const BOT_WALL_MARKERS = [
  "captcha",
  "verify you are human",
  "are you a robot",
  "unusual traffic",
  "access denied",
  "attention required",
  "just a moment",
  "cf-challenge",
  "perimeterx",
  "datadome",
  "bot or not", // DataDome interstitial title (e.g. expedia)
  "human or a bot", // DataDome interstitial body
  "enable javascript and cookies to continue", // Cloudflare challenge body
];

export function detectBotWall(title: string, bodySnippet: string): boolean {
  const hay = `${title}\n${bodySnippet}`.toLowerCase();
  return BOT_WALL_MARKERS.some((m) => hay.includes(m));
}

function normalizeUrl(u: string): string {
  try {
    const url = new URL(u);
    return `${url.origin}${url.pathname.replace(/\/$/, "")}`;
  } catch {
    return u.replace(/[#?].*$/, "").replace(/\/$/, "");
  }
}

export function evaluatePass(task: Task, result: TrialResult): boolean {
  const pc = task.passCondition;
  switch (pc.type) {
    case "answerEquals":
      return result.finalAnswer !== null && result.finalAnswer.trim().toLowerCase() === pc.value.trim().toLowerCase();
    case "answerContains":
      return result.finalAnswer !== null && result.finalAnswer.toLowerCase().includes(pc.value.toLowerCase());
    case "urlReached": {
      const target = normalizeUrl(pc.value);
      return result.visitedUrls.some((u) => normalizeUrl(u) === target);
    }
    case "elementExists":
      return result.elementFound === true;
  }
}

export function score(task: Task, result: TrialResult): { pass: boolean; outcome: Outcome; failureDetail?: string } {
  const pass = evaluatePass(task, result);
  if (pass) return { pass: true, outcome: "pass" };

  if (detectBotWall(result.finalTitle, result.finalBodySnippet)) {
    return { pass: false, outcome: "infra_web_failure", failureDetail: "bot wall / CAPTCHA markers on final page" };
  }
  if (result.infraError) {
    if (/timeout|net::|navigation/i.test(result.infraError)) {
      return { pass: false, outcome: "infra_web_failure", failureDetail: result.infraError };
    }
    return { pass: false, outcome: "unclassified", failureDetail: result.infraError };
  }
  if (result.refused) {
    return { pass: false, outcome: "model_failure", failureDetail: "model refused" };
  }
  if (result.steps.length > 0) {
    const gaveAnswer = result.finalAnswer !== null;
    return {
      pass: false,
      outcome: "model_failure",
      failureDetail: gaveAnswer ? "wrong answer" : "no answer / goal not reached within limits",
    };
  }
  return { pass: false, outcome: "unclassified", failureDetail: "no steps executed" };
}
