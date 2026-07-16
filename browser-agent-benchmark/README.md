# Browser-Task Benchmark: gpt-5.6-sol vs grok-4.5 vs Claude Fable 5

A small CLI harness that runs three models on identical real-browser tasks via
[Hyperbrowser](https://hyperbrowser.ai) sessions and scores the results. It is a
benchmark, not a demo: determinism, logging, and honesty of measurement come first.

## Quickstart

```sh
npm install
cp .env.example .env   # fill in the four API keys
npm run preflight      # verifies all three model strings against the live APIs
npm run bench -- --dry-run          # 2 tasks x 1 trial x 3 models + cost projection
npm run bench -- --trials 3         # full run
npm run analyze -- results/<runid>.jsonl
```

Interrupted runs are resumable: re-run with `--run-id <runid>` and completed
trials (keyed by model:task:trial in the existing JSONL) are skipped.

## Methodology

- **One agent loop for all models** (`src/loop.ts`). Fresh Hyperbrowser session
  per trial, driven over CDP with Playwright. Per step the model receives one
  observation format: page URL + title + a viewport PNG screenshot. Only the
  latest observation carries the screenshot; earlier turns remain as text so
  context stays bounded — the same policy for every model.
- **One system prompt**, committed in `src/loop.ts` (`SYSTEM_PROMPT`). No
  per-model prompt tweaks, ever.
- **Action space** (strict JSON): `click{selector}`, `type{selector,text}`,
  `navigate{url}`, `scroll{direction}`, `extract{answer}`, `done{}`. A reply
  must be a single JSON object (a bare ```json fence around it is tolerated,
  uniformly). A malformed reply gets one retry with a format reminder; a second
  failure counts as a no-op error step.
- **Limits**: max 20 steps and 3 minutes wall clock per trial. The session is
  closed after every trial. No retries that mask failures — a failed trial is a
  failed trial.
- **Interleaving**: trials run task1×sol, task1×grok, task1×fable, task2×sol, …
  so no model sees a different web than the others. Sequential by default
  (`--concurrency 1`), rate-limit safe.
- **Scoring** (`src/scorer.ts`): ground truth is human-written in `tasks.json`
  (`answerEquals`, `answerContains`, `urlReached`, `elementExists`). The scorer
  never asks a model to judge correctness. Failure taxonomy: `model_failure`
  (wrong answer, refusal, gave up, max steps), `infra_web_failure` (CAPTCHA /
  bot-wall markers detected on the final page, navigation timeouts, session
  failures), `unclassified` when ambiguous — never silently guessed.
- **Logging**: every trial is appended to `results/<runid>.jsonl` with every
  step (action, latency), token usage in/out from each API's own usage fields,
  wall time, final answer, and outcome.

## Exact model strings and settings

Run `npm run preflight` to confirm these resolve on your keys — it makes a
minimal call to each API and prints the model id the API resolved. If any
string 404s the harness stops; it never guesses.

| Adapter | Model string | Reasoning setting |
|---|---|---|
| `sol` (OpenAI) | `gpt-5.6-sol` | `reasoning_effort: "high"` |
| `grok` (xAI) | `grok-4.5` | tries `reasoning_effort: "high"`; if the API rejects the param (some grok versions always reason) it drops it once and logs that clearly |
| `fable` (Anthropic) | `claude-fable-5` | `output_config: {effort: "high"}` — Fable 5 has no thinking toggle (thinking is always on, the `thinking` param must be omitted); effort is the documented depth control and `high` is closest in spirit to the other models' settings |

Two Fable-specific honesty notes: refusals (`stop_reason: "refusal"`) count as
`model_failure` — no server-side fallback model is configured, since re-serving
a refused request with a different model would misattribute the result. Token
usage counts cached input tokens (`cache_read` + `cache_creation`) in the input
total, but cost is computed at the flat published rate — see Limits.

## Pricing (constants in `src/pricing.ts`, USD per 1M tokens, verified 2026-07)

| Model | Input | Output |
|---|---|---|
| gpt-5.6-sol | $5 | $30 |
| grok-4.5 | $2 | $6 |
| claude-fable-5 | $10 | $50 |

## Limits

- **Task-set scope**: results reflect only the tasks in `tasks.json` (the
  shipped file has 3 starter tasks; the intended set is ~24 human-written ones).
- **Single time window**: the live web changes; a run is a snapshot, not a
  stable property of the models. Interleaving reduces but cannot eliminate this.
- **One harness**: one observation format, one action space, one prompt. Models
  tuned for other affordances (e.g. accessibility trees, coordinate clicking)
  may underperform their ceiling here — that is a property of the harness and
  is applied equally to all three.
- **Bot-wall detection is heuristic**: marker-based; misses are tagged
  `unclassified` or `model_failure`, so `infra_web_failure` counts are a floor.
- **Cost figures are approximate**: computed from usage fields at flat list
  prices; provider-side prompt-cache discounts (which reduce real Anthropic
  input cost below the computed figure) are not modeled.

## Output

`npm run analyze -- results/<runid>.jsonl` prints, per model: success rate
overall and per category, median steps, median wall time, total tokens and $
per completed task, and failure-taxonomy counts. It also writes
`results/summary.json` shaped for charting.
