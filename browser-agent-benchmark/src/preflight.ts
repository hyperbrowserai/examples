import "dotenv/config";
import { makeSolAdapter } from "./adapters/openai.js";
import { makeGrokAdapter } from "./adapters/xai.js";
import { makeFableAdapter } from "./adapters/anthropic.js";

async function main() {
  let failed = false;
  for (const adapter of [makeSolAdapter(), makeGrokAdapter(), makeFableAdapter()]) {
    process.stdout.write(`${adapter.key.padEnd(6)} ${adapter.modelId.padEnd(16)} -> `);
    try {
      console.log(`OK, resolved: ${await adapter.preflight()}`);
    } catch (err) {
      failed = true;
      console.log(`FAILED: ${String(err instanceof Error ? err.message : err)}`);
    }
  }
  if (failed) {
    console.error("\nOne or more model strings failed. Fix them before benchmarking — do not guess.");
    process.exit(1);
  }
}

main();
