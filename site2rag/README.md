**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# site2rag

Transform any webpage into RAG-ready chunks. Scrape, clean, and intelligently chunk web content for embedding pipelines and vector databases.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install**: `npm install`
3. **Configure**: Add `HYPERBROWSER_API_KEY` to `.env`
4. **Run**: `npx ts-node index.ts --url https://example.com`

## Features

✨ **Powered by Hyperbrowser SDK** for reliable web scraping
🧹 **Auto-cleanup** removes navigation, headers, and boilerplate
✂️ **Smart chunking** with configurable token budgets
📊 **Multiple output formats**: JSON, Markdown, or summary
🎯 **RAG-optimized** chunks ready for embeddings

## Usage

```bash
# Basic scraping with summary
npx ts-node index.ts --url https://example.com

# JSON output for RAG pipelines
npx ts-node index.ts --url https://docs.example.com --json --maxTokens 500

# Markdown format with citations
npx ts-node index.ts --url https://blog.example.com --md --maxTokens 1500
```

### CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--url` | `-u` | URL to scrape (required) | - |
| `--json` | - | Output as JSON for API integration | false |
| `--md` | - | Output as Markdown with citations | false |
| `--maxTokens` | - | Maximum tokens per chunk | 1000 |

**Perfect for**: Building RAG applications, creating vector database content, embedding pipelines, AI knowledge bases.

## Output Formats

### JSON Format
```json
{
  "source": "https://example.com",
  "created": "2024-01-15T10:30:00.000Z",
  "chunks": [
    {
      "id": 1,
      "tokens": 245,
      "source": "https://example.com",
      "text": "Main content chunk..."
    }
  ]
}
```

### Markdown Format
```markdown
# Context Pack for https://example.com

## Chunk 1 • 245 tokens

Main content chunk...

> _Source: https://example.com_
```

### Summary Format (Default)
```
Context Chunks
───────────────────────────
Chunk 1 — 245 tokens
Chunk 2 — 387 tokens
Chunk 3 — 492 tokens

Run with --md or --json for full output
```

## How It Works

1. **Scrape**: Hyperbrowser fetches fully-rendered HTML (handles JavaScript, anti-bot protection)
2. **Clean**: Removes navigation, headers, footers, scripts, and boilerplate
3. **Parse**: Extracts paragraphs and filters noise (minimum 50 characters)
4. **Chunk**: Intelligently splits content by token budget while preserving context
5. **Output**: Formats chunks for your pipeline (JSON/Markdown/Summary)

## Environment Setup

```bash
# Create .env file
echo "HYPERBROWSER_API_KEY=your_api_key_here" > .env

# Or export directly
export HYPERBROWSER_API_KEY=your_api_key_here
```

## Development

```bash
npm run build    # Compile TypeScript
npm start        # Run with default options
```

---

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow @hyperbrowser 