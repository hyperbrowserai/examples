import OpenAI from "openai";
import type { ChatMessage, ModelAdapter, Usage } from "../types.js";

const MODEL = "grok-4.5";

function toMessages(system: string, messages: ChatMessage[]) {
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

export function makeGrokAdapter(): ModelAdapter {
  const client = new OpenAI({
    apiKey: process.env.XAI_API_KEY,
    baseURL: "https://api.x.ai/v1",
  });

  // xAI's OpenAI-compatible API takes `reasoning_effort` on some models and
  // rejects it on others (some grok versions always reason). Probe once at
  // runtime instead of guessing; the fallback is logged so it's not silent.
  let effortSupported: boolean | null = null;

  async function complete(messages: OpenAI.Chat.ChatCompletionMessageParam[]) {
    if (effortSupported !== false) {
      try {
        const res = await client.chat.completions.create({
          model: MODEL,
          reasoning_effort: "high",
          messages,
        });
        effortSupported = true;
        return res;
      } catch (err) {
        if (effortSupported === null && err instanceof OpenAI.APIError && /reasoning_effort/i.test(String(err.message))) {
          effortSupported = false;
          console.error(`[grok] ${MODEL} rejected reasoning_effort; continuing without it (model reasons by default)`);
        } else {
          throw err;
        }
      }
    }
    return client.chat.completions.create({ model: MODEL, messages });
  }

  return {
    key: "grok",
    modelId: MODEL,
    async preflight() {
      const res = await complete([{ role: "user", content: "Reply with OK" }]);
      return `${res.model}${effortSupported ? " (reasoning_effort=high)" : " (no reasoning_effort param)"}`;
    },
    async step(system, messages) {
      const res = await complete(toMessages(system, messages));
      return { text: res.choices[0]?.message?.content ?? "", usage: usageOf(res.usage) };
    },
  };
}
