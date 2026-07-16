import fs from "node:fs";
import path from "node:path";
import { costUsd } from "./pricing.js";
import { c as col } from "./colors.js";
import type { Category, ModelKey, Outcome, TrialRecord } from "./types.js";

function median(xs: number[]): number {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function pct(n: number, d: number): string {
  return d === 0 ? "-" : `${((100 * n) / d).toFixed(0)}% (${n}/${d})`;
}

interface ModelSummary {
  modelId: string;
  trials: number;
  passed: number;
  successRate: number;
  byCategory: Record<string, { trials: number; passed: number; successRate: number }>;
  medianSteps: number;
  medianWallTimeMs: number;
  tokens: { input: number; output: number };
  totalCostUsd: number;
  costPerCompletedTaskUsd: number | null;
  failures: Record<Outcome, number>;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: npm run analyze -- results/<runid>.jsonl");
    process.exit(1);
  }
  const records = fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l) as TrialRecord);
  if (records.length === 0) {
    console.error("no records in file");
    process.exit(1);
  }

  const models = [...new Set(records.map((r) => r.model))] as ModelKey[];
  const categories = [...new Set(records.map((r) => r.category))] as Category[];
  const summary: Record<string, ModelSummary> = {};

  for (const model of models) {
    const mine = records.filter((r) => r.model === model);
    const passed = mine.filter((r) => r.pass);
    const byCategory: ModelSummary["byCategory"] = {};
    for (const cat of categories) {
      const c = mine.filter((r) => r.category === cat);
      const p = c.filter((r) => r.pass).length;
      byCategory[cat] = { trials: c.length, passed: p, successRate: c.length ? p / c.length : 0 };
    }
    const tokens = {
      input: mine.reduce((s, r) => s + r.usage.input, 0),
      output: mine.reduce((s, r) => s + r.usage.output, 0),
    };
    const totalCost = costUsd(model, tokens);
    const failures = { pass: 0, model_failure: 0, infra_web_failure: 0, unclassified: 0 } as Record<Outcome, number>;
    for (const r of mine) failures[r.outcome]++;

    summary[model] = {
      modelId: mine[0].modelId,
      trials: mine.length,
      passed: passed.length,
      successRate: mine.length ? passed.length / mine.length : 0,
      byCategory,
      medianSteps: median(mine.map((r) => r.steps.length)),
      medianWallTimeMs: median(mine.map((r) => r.wallTimeMs)),
      tokens,
      totalCostUsd: totalCost,
      costPerCompletedTaskUsd: passed.length ? totalCost / passed.length : null,
      failures,
    };
  }

  for (const model of models) {
    const s = summary[model];
    const rate = s.successRate >= 0.5 ? col.green : s.successRate > 0 ? col.yellow : col.red;
    console.log(`\n${col.bold(`=== ${col.magenta(model)} (${s.modelId}) ===`)}`);
    console.log(`  ${col.bold("success")}: ${rate(pct(s.passed, s.trials))}`);
    for (const cat of categories) {
      const cs = s.byCategory[cat];
      console.log(`    ${col.cyan(cat.padEnd(14))} ${pct(cs.passed, cs.trials)}`);
    }
    console.log(`  ${col.dim("median steps:")} ${s.medianSteps}`);
    console.log(`  ${col.dim("median wall time:")} ${(s.medianWallTimeMs / 1000).toFixed(1)}s`);
    console.log(`  ${col.dim("tokens:")} ${s.tokens.input} in / ${s.tokens.output} out (${col.bold(`$${s.totalCostUsd.toFixed(2)}`)} total)`);
    console.log(`  ${col.dim("$/completed task:")} ${s.costPerCompletedTaskUsd === null ? "n/a (0 passed)" : col.bold(`$${s.costPerCompletedTaskUsd.toFixed(2)}`)}`);
    console.log(
      `  ${col.dim("failures:")} model=${col.red(s.failures.model_failure)} infra_web=${col.yellow(s.failures.infra_web_failure)} unclassified=${col.yellow(s.failures.unclassified)}`,
    );
  }

  const outPath = path.join(path.dirname(file), "summary.json");
  fs.writeFileSync(outPath, JSON.stringify({ source: path.basename(file), generatedAt: new Date().toISOString(), models: summary }, null, 2));
  console.log(`\n${col.bold("Chart-ready summary:")} ${col.cyan(outPath)}`);
}

main();
