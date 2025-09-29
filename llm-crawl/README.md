**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# LLMCrawl

A powerful CLI tool that combines Hyperbrowser's official Crawl API with Large Language Models to fetch structured web data and process it intelligently. Perfect for growth engineering, research, and data extraction tasks.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Web Crawling**: Uses Hyperbrowser's official SDK with `client.crawl.startAndWait()`
- **LLM Processing**: Integrates OpenAI GPT models for intelligent data processing
- **Multiple Output Formats**: Markdown, JSON, JSONL, and FAISS embeddings
- **Smart Extraction**: Automatically adapts processing based on your instruction
- **Context-Aware**: Intelligently extracts domains from natural language instructions
- **Growth-Ready**: Built for scaling content analysis and data extraction workflows

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install**: `npm install`
3. **Configure**: Add `HYPERBROWSER_API_KEY` and `OPENAI_API_KEY` to `.env`
4. **Run**: `npx tsx cli.ts "your instruction here"`

## Installation

```bash
# Install dependencies
npm install

# Set environment variables
export HYPERBROWSER_API_KEY="your_hyperbrowser_api_key"
export OPENAI_API_KEY="your_openai_api_key"

# Run an example
npx tsx cli.ts "Find all AI startup launches in 2025 from techcrunch.com and summarize in 3 bullets"
```

## Usage Examples

### Startup News Summary
```bash
npx tsx cli.ts "Find all AI startup launches in 2025 from techcrunch.com and summarize in 3 bullets"
```
Crawls TechCrunch, extracts startup news, returns markdown summary

### Product Reviews Analysis
```bash
npx tsx cli.ts "Collect 50 reviews of iPhone 16 Pro from bestbuy.com, return JSONL with {rating, pros, cons, sentiment}" --json -o reviews.jsonl
```
Crawls BestBuy reviews, extracts structured data, saves as JSONL

### Research Paper Database
```bash
npx tsx cli.ts "Crawl arxiv.org for latest multimodal LLM papers and export FAISS db" -o papers.bin
```
Crawls ArXiv, creates searchable embeddings database

## CLI Options

```bash
npx tsx cli.ts <instruction> [options]

Options:
  --json              Output results in JSON format
  -o, --out <file>    Save output to file
  -m, --model <model> OpenAI model (default: gpt-4o)
  -v, --verbose       Enable verbose logging
  -h, --help          Show help
```

## Environment Variables

Create a `.env` file or export these variables:

```bash
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key  # Get at https://hyperbrowser.ai
OPENAI_API_KEY=your_openai_api_key              # Get at https://platform.openai.com
```

## How It Works

1. **Domain Extraction**: Intelligently extracts website URLs from natural language instructions
2. **Web Crawling**: Uses Hyperbrowser SDK's `client.crawl.startAndWait()` to scrape content with configurable options:
   - Follows internal links to discover relevant pages
   - Filters content based on instruction keywords
   - Removes navigation, ads, and other non-content elements
3. **Content Processing**: Routes crawled data to OpenAI with context-aware system prompts optimized for different tasks (summarization, reviews, research, etc.)
4. **Output Formatting**: Automatically detects desired output format from instruction and saves or displays results

## Architecture

The project is organized into three main modules:

- **`cli.ts`** - Commander-based CLI entrypoint with argument parsing and output handling
- **`crawl.ts`** - CrawlService class wrapping Hyperbrowser SDK for intelligent web scraping
- **`llm.ts`** - LLMService class managing OpenAI API calls for content processing and embeddings

## Output Formats

- **Markdown** (default): Human-readable terminal output with formatting
- **JSON/JSONL**: Structured data with `--json` flag or when specified in instruction
- **FAISS Database**: Vector embeddings for semantic search (requires `faiss-node` dependency)

## Use Cases

**Perfect for**: Growth engineering, content research, competitor analysis, lead generation, market research, data extraction, automated scraping workflows.

## Development

```bash
# Development mode
npm run dev "your instruction here"

# Build TypeScript
npm run build

# Run built version
node dist/cli.js "your instruction here"
```

## Technical Stack

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)**: Web scraping and crawling
- **OpenAI GPT-4o**: Natural language processing and embeddings
- **Commander**: CLI argument parsing
- **Chalk**: Terminal output formatting
- **TypeScript**: Type-safe development with ES modules

---

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow [@hyperbrowser](https://x.com/hyperbrowser)
