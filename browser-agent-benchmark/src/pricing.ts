import type { ModelKey } from "./types.js";

// USD per 1M tokens. Verified 2026-07: OpenAI gpt-5.6-sol $5/$30,
// xAI grok-4.5 $2/$6, Anthropic Claude Fable 5 (claude-fable-5) $10/$50.
export const PRICING: Record<ModelKey, { input: number; output: number }> = {
  sol: { input: 5, output: 30 },
  grok: { input: 2, output: 6 },
  fable: { input: 10, output: 50 },
};

export function costUsd(model: ModelKey, usage: { input: number; output: number }): number {
  const p = PRICING[model];
  return (usage.input * p.input + usage.output * p.output) / 1_000_000;
}
