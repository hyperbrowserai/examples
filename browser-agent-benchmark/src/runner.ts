import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { Hyperbrowser } from "@hyperbrowser/sdk";
import { makeSolAdapter } from "./adapters/openai.js";
import { makeGrokAdapter } from "./adapters/xai.js";
import { makeFableAdapter } from "./adapters/anthropic.js";
import { runTrial } from "./loop.js";
import { score } from "./scorer.js";
import { costUsd } from "./pricing.js";
import { c } from "./colors.js";
import type { ModelAdapter, Task, TrialRecord, Usage } from "./types.js";

const RESULTS_DIR = path.join(import.meta.dirname, "..", "results");

function parseArgs(argv: string[]) {
  const args = { trials: 3, concurrency: 1, dryRun: false, runId: "", models: [] as string[] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--trials") args.trials = Number(argv[++i]);
    else if (argv[i] === "--concurrency") args.concurrency = Number(argv[++i]);
    else if (argv[i] === "--dry-run") args.dryRun = true;
    else if (argv[i] === "--run-id") args.runId = argv[++i];
    else if (argv[i] === "--models") args.models = argv[++i].split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (!Number.isInteger(args.trials) || args.trials < 1) throw new Error("--trials must be a positive integer");
  if (!Number.isInteger(args.concurrency) || args.concurrency < 1) throw new Error("--concurrency must be a positive integer");
  return args;
}

function loadTasks(): Task[] {
  const raw = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "..", "tasks.json"), "utf8"));
  return raw.tasks as Task[];
}

function completedKeys(file: string): Set<string> {
  if (!fs.existsSync(file)) return new Set();
  const keys = new Set<string>();
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    const r = JSON.parse(line) as TrialRecord;
    keys.add(`${r.model}:${r.taskId}:${r.trial}`);
  }
  return keys;
}

interface Job {
  task: Task;
  trial: number;
  adapter: ModelAdapter;
}

async function runJob(hb: Hyperbrowser, runId: string, job: Job): Promise<TrialRecord> {
  const { task, trial, adapter } = job;
  let record: TrialRecord;
  try {
    const result = await runTrial(hb, adapter, task);
    const verdict = score(task, result);
    record = {
      runId,
      model: adapter.key,
      modelId: adapter.modelId,
      taskId: task.id,
      category: task.category,
      trial,
      steps: result.steps,
      finalAnswer: result.finalAnswer,
      finalUrl: result.finalUrl,
      wallTimeMs: result.wallTimeMs,
      usage: result.usage,
      ...verdict,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    // Session-create failures are web infra; anything else is unclassified.
    const msg = String(err instanceof Error ? err.message : err).slice(0, 500);
    const isSessionFailure = /session|wsEndpoint|hyperbrowser/i.test(msg);
    record = {
      runId,
      model: adapter.key,
      modelId: adapter.modelId,
      taskId: task.id,
      category: task.category,
      trial,
      steps: [],
      finalAnswer: null,
      finalUrl: null,
      wallTimeMs: 0,
      usage: { input: 0, output: 0 },
      pass: false,
      outcome: isSessionFailure ? "infra_web_failure" : "unclassified",
      failureDetail: msg,
      timestamp: new Date().toISOString(),
    };
  }
  return record;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const allAdapters = [makeSolAdapter(), makeGrokAdapter(), makeFableAdapter()];
  const adapters = args.models.length ? allAdapters.filter((a) => args.models.includes(a.key)) : allAdapters;
  if (adapters.length === 0) throw new Error(`--models matched no adapters; valid keys: ${allAdapters.map((a) => a.key).join(", ")}`);
  const allTasks = loadTasks();

  const tasks = args.dryRun ? allTasks.slice(0, 2) : allTasks;
  const trials = args.dryRun ? 1 : args.trials;
  const runId = args.runId || (args.dryRun ? "dry-run" : `run-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}`);

  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const outFile = path.join(RESULTS_DIR, `${runId}.jsonl`);
  const done = completedKeys(outFile);
  if (done.size > 0) console.log(c.yellow(`Resuming ${runId}: ${done.size} completed trials will be skipped`));

  // Interleaved: task1×sol, task1×grok, task1×fable, task2×sol, ... so no
  // model sees a different web than the others.
  const jobs: Job[] = [];
  for (const task of tasks) {
    for (let trial = 1; trial <= trials; trial++) {
      for (const adapter of adapters) {
        if (!done.has(`${adapter.key}:${task.id}:${trial}`)) jobs.push({ task, trial, adapter });
      }
    }
  }
  console.log(c.bold(`${runId}: ${jobs.length} trials to run (${tasks.length} tasks x ${trials} trials x ${adapters.length} models), concurrency ${args.concurrency}`));

  const hb = new Hyperbrowser({ apiKey: process.env.HYPERBROWSER_API_KEY });
  let next = 0;
  const worker = async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      const label = `${c.magenta(job.adapter.key)} / ${c.cyan(job.task.id)} / trial ${job.trial}`;
      console.log(c.bold(`> ${label}`));
      const record = await runJob(hb, runId, job);
      fs.appendFileSync(outFile, JSON.stringify(record) + "\n");
      const verdict = record.pass
        ? c.green("PASS")
        : c.red(`FAIL (${record.outcome}${record.failureDetail ? `: ${record.failureDetail}` : ""})`);
      const stats = c.dim(`${record.steps.length} steps, ${(record.wallTimeMs / 1000).toFixed(1)}s, ${record.usage.input}+${record.usage.output} tok`);
      console.log(`  ${verdict} ${c.dim("—")} ${stats}`);
    }
  };
  await Promise.all(Array.from({ length: args.concurrency }, worker));

  console.log(`\n${c.bold("Results:")} ${c.cyan(outFile)}`);

  if (args.dryRun) {
    const records = fs
      .readFileSync(outFile, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l) as TrialRecord);
    console.log(`\nProjected cost for a full run (${allTasks.length} tasks x ${args.trials} trials):`);
    for (const adapter of adapters) {
      const mine = records.filter((r) => r.model === adapter.key);
      if (mine.length === 0) continue;
      const avg: Usage = {
        input: mine.reduce((s, r) => s + r.usage.input, 0) / mine.length,
        output: mine.reduce((s, r) => s + r.usage.output, 0) / mine.length,
      };
      const fullTrials = allTasks.length * args.trials;
      const projected = costUsd(adapter.key, { input: avg.input * fullTrials, output: avg.output * fullTrials });
      console.log(
        `  ${adapter.key} (${adapter.modelId}): ~${Math.round(avg.input)}+${Math.round(avg.output)} tok/trial measured -> ~$${projected.toFixed(2)} for ${fullTrials} trials`,
      );
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
