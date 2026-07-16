export type Category = "read" | "navigate" | "write" | "bot_protected";

export type PassCondition =
  | { type: "answerEquals"; value: string }
  | { type: "answerContains"; value: string }
  | { type: "urlReached"; value: string }
  | { type: "elementExists"; selector: string };

export interface Task {
  id: string;
  category: Category;
  startUrl: string;
  instruction: string;
  passCondition: PassCondition;
}

export type Action =
  | { action: "click"; selector: string }
  | { action: "type"; selector: string; text: string }
  | { action: "navigate"; url: string }
  | { action: "scroll"; direction: "up" | "down" }
  | { action: "extract"; answer: string }
  | { action: "done" };

export interface Usage {
  input: number;
  output: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  imageB64?: string; // png, only ever set on the latest observation
}

export type ModelKey = "sol" | "grok" | "fable";

export interface ModelAdapter {
  key: ModelKey;
  modelId: string;
  /** 1-token-ish call; returns the model id the API resolved. Throws on 404. */
  preflight(): Promise<string>;
  step(system: string, messages: ChatMessage[]): Promise<{ text: string; usage: Usage }>;
}

/** Thrown by adapters when the model refuses (e.g. Anthropic stop_reason "refusal"). */
export class ModelRefusalError extends Error {}

export interface StepLog {
  n: number;
  /** Parsed action, or the raw model text when parsing failed twice. */
  action: Action | { raw: string };
  parseError?: true;
  execError?: string;
  latencyMs: number;
  usage: Usage;
}

export type Outcome = "pass" | "model_failure" | "infra_web_failure" | "unclassified";

export interface TrialRecord {
  runId: string;
  model: ModelKey;
  modelId: string;
  taskId: string;
  category: Category;
  trial: number;
  steps: StepLog[];
  finalAnswer: string | null;
  finalUrl: string | null;
  wallTimeMs: number;
  usage: Usage;
  pass: boolean;
  outcome: Outcome;
  failureDetail?: string;
  timestamp: string;
}
