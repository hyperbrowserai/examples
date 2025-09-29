# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a collection of example projects demonstrating Hyperbrowser SDK usage. Each example is a standalone TypeScript project showing different use cases for web automation, scraping, and AI-powered workflows.

## Key Architecture Patterns

### SDK Integration
All examples use the `@hyperbrowser/sdk` package as the core browser automation client. Common pattern:

```typescript
import { Hyperbrowser } from '@hyperbrowser/sdk';
const hbClient = new Hyperbrowser({ apiKey: process.env.HYPERBROWSER_API_KEY });
```

### Example Structure
Most examples follow this structure:
- Single entry point TypeScript file (e.g., `example-name.ts`)
- `package.json` with dependencies
- README.md explaining the use case
- Requires `HYPERBROWSER_API_KEY` environment variable
- Many also require `OPENAI_API_KEY` for LLM features

### Complex Multi-Module Examples
Some examples have more sophisticated architectures:

**hb-intern-bot** (`hb-intern-bot/src/`):
- Pipeline architecture: scrape → normalize → score → summarize → output
- Multiple scrapers (`scraper/`) for different sources (HN, Reddit, ProductHunt, blogs)
- Event aggregation and scoring system
- Watch mode for continuous monitoring

**llm-crawl**:
- CLI tool using `commander` for argument parsing
- Combines Hyperbrowser Crawl API + OpenAI LLM processing
- Supports multiple output formats (JSON, JSONL, FAISS database)
- Example: `llmcrawl "instruction" --json -o output.jsonl`

**site2prompt**:
- Web content → prompt-ready format converter
- Token budgeting and deduplication
- Multiple output formats (JSONL, CSV, citations)
- Heuristic and LLM-based compression modes

## Common Development Commands

### Running Examples
Most examples are run with:
```bash
cd <example-directory>
npm install
npx tsx <main-file>.ts
```

Or (if configured in package.json):
```bash
npm run dev
```

### Building TypeScript Projects
Examples with build scripts:
```bash
npm run build
```

### Environment Setup
Required for all examples:
```bash
export HYPERBROWSER_API_KEY="your-key"
```

Many examples also need:
```bash
export OPENAI_API_KEY="your-key"
```

## Dependencies

Common dependencies across examples:
- `@hyperbrowser/sdk` - Core browser automation SDK
- `@hyperbrowser/agent` - Agent-based automation (some examples)
- `dotenv` - Environment variable management
- `typescript` + `ts-node` or `tsx` - TypeScript execution
- `openai` - OpenAI API client
- `@langchain/openai` - LangChain integration (some examples)
- `zod` - Schema validation (some examples)
- `commander` / `yargs` - CLI frameworks (CLI-based examples)
- `cheerio` - HTML parsing (scraping examples)

## Important Notes

- Each example is independent with its own `package.json`
- No shared code between examples (intentionally isolated for clarity)
- Examples demonstrate patterns, not production-ready code
- The SDK version may vary between examples (check individual `package.json` files)
- Some examples output to files, others to stdout
- API keys should be in `.env` file or environment variables, never committed

## Resources

- Documentation: https://docs.hyperbrowser.ai
- Discord: https://discord.gg/zsYzsgVRjh
- Support: info@hyperbrowser.ai