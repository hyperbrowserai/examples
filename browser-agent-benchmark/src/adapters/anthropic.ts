import Anthropic from "@anthropic-ai/sdk";
import { ModelRefusalError, type ChatMessage, type ModelAdapter, type Usage } from "../types.js";

// Verified against the installed @anthropic-ai/sdk Model union and Anthropic's
// models list at build time (2026-07). Fable 5 has no "high" reasoning knob in
// the OpenAI sense: thinking is always on and the `thinking` param must be
// omitted. The closest control is output_config.effort, whose default — "high"
// — matches the spirit of the other models' settings, so we set it explicitly.
const MODEL = "claude-fable-5";

function toAnthropicMessages(messages: ChatMessage[]): Anthropic.MessageParam[] {
  return messages.map((m): Anthropic.MessageParam => {
    if (m.role === "assistant") return { role: "assistant", content: m.text };
    if (m.imageB64) {
      return {
        role: "user",
        content: [
          { type: "text", text: m.text },
          { type: "image", source: { type: "base64", media_type: "image/png", data: m.imageB64 } },
        ],
      };
    }
    return { role: "user", content: m.text };
  });
}

function usageOf(u: Anthropic.Usage): Usage {
  return {
    input: u.input_tokens + (u.cache_creation_input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0),
    output: u.output_tokens,
  };
}

export function makeFableAdapter(): ModelAdapter {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  async function create(messages: Anthropic.MessageParam[], system?: string) {
    // No `thinking` param (always on for Fable 5) and no fallbacks: a refusal
    // is surfaced as a failed trial, not silently re-served by another model.
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 8000, // must leave room for always-on thinking
      output_config: { effort: "high" },
      ...(system ? { system } : {}),
      messages,
    });
    if (res.stop_reason === "refusal") throw new ModelRefusalError("stop_reason=refusal");
    return res;
  }

  return {
    key: "fable",
    modelId: MODEL,
    async preflight() {
      const res = await create([{ role: "user", content: "Reply with OK" }]);
      return res.model;
    },
    async step(system, messages) {
      const res = await create(toAnthropicMessages(messages), system);
      const text = res.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("");
      return { text, usage: usageOf(res.usage) };
    },
  };
}
