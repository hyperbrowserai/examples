import OpenAI from "openai";
import type { ChatMessage, ModelAdapter, Usage } from "../types.js";

const MODEL = "gpt-5.6-sol";

function toOpenAIMessages(system: string, messages: ChatMessage[]) {
  const out: OpenAI.Chat.ChatCompletionMessageParam[] = [{ role: "system", content: system }];
  for (const m of messages) {
    if (m.role === "assistant") {
      out.push({ role: "assistant", content: m.text });
    } else if (m.imageB64) {
      out.push({
        role: "user",
        content: [
          { type: "text", text: m.text },
          { type: "image_url", image_url: { url: `data:image/png;base64,${m.imageB64}` } },
        ],
      });
    } else {
      out.push({ role: "user", content: m.text });
    }
  }
  return out;
}

function usageOf(u: OpenAI.CompletionUsage | undefined | null): Usage {
  return { input: u?.prompt_tokens ?? 0, output: u?.completion_tokens ?? 0 };
}

export function makeSolAdapter(): ModelAdapter {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return {
    key: "sol",
    modelId: MODEL,
    async preflight() {
      const res = await client.chat.completions.create({
        model: MODEL,
        reasoning_effort: "high",
        messages: [{ role: "user", content: "Reply with OK" }],
      });
      return res.model;
    },
    async step(system, messages) {
      const res = await client.chat.completions.create({
        model: MODEL,
        reasoning_effort: "high",
        messages: toOpenAIMessages(system, messages),
      });
      return { text: res.choices[0]?.message?.content ?? "", usage: usageOf(res.usage) };
    },
  };
}
