**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# RAGZip

A powerful CLI tool that builds citation-tagged context packs for LLMs by scraping and intelligently processing web content. RAGZip extracts content from websites, ranks chunks by relevance using TF-IDF, deduplicates similar content, and fits everything within your specified token budget.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

📚 **Smart web scraping** with Hyperbrowser's official SDK
🎯 **TF-IDF ranking** to prioritize the most relevant content
🔄 **Automatic deduplication** using Jaccard similarity (70% threshold)
🤖 **Optional LLM compression** via OpenAI (25-60% size reduction)
📊 **Multiple output formats**: JSONL and Markdown
🏷️ **Citation tracking** with chunk-level source URLs
💾 **Token budgeting** to fit within your context window

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment**:
   ```bash
   cp env.example .env
   # Add your keys to .env:
   # HYPERBROWSER_API_KEY=hb_your_key_here
   # OPENAI_API_KEY=sk-your_key_here  # optional, only for --llm compression
   ```

## Usage Examples

### Basic Usage
```bash
# Process a single URL with default settings
npm start -- --url https://docs.example.com

# Specify a custom token budget
npm start -- --url https://example.com --budget 2000
```

### Multiple URLs
```bash
# Process multiple URLs in one command
npm start -- --url https://docs.example.com --url https://blog.example.com --budget 5000

# Or use a file with newline-separated URLs
echo "https://docs.example.com" > urls.txt
echo "https://blog.example.com" >> urls.txt
npm start -- --urls urls.txt --budget 5000
```

### With LLM Compression
```bash
# Enable OpenAI compression to reduce token usage further
npm start -- --url https://example.com --llm --budget 3000

# Combine with markdown output format
npm start -- --urls urls.txt --llm --format md --out my-context
```

## CLI Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--url <url>` | string[] | - | URLs to process (can be specified multiple times) |
| `--urls <file>` | string | - | File containing newline-separated URLs |
| `--budget <n>` | number | 8000 | Maximum token budget for the final pack |
| `--out <dir>` | string | "distill" | Output directory for generated files |
| `--format <type>` | "jsonl" \| "md" | "jsonl" | Output format |
| `--llm` | boolean | false | Enable OpenAI-powered compression |

## Output Files

RAGZip generates three files in the output directory:

### 1. `pack.jsonl` (or `pack.md`)
The main context pack containing processed chunks:
```jsonl
{"chunk":"Content here...","tokens":150,"source":"https://example.com#chunk0","rank":0.8523}
{"chunk":"More content...","tokens":200,"source":"https://example.com#chunk1","rank":0.7412}
```

### 2. `stats.json`
Processing statistics and metrics:
```json
{
  "pages": 2,
  "raw_chunks": 150,
  "kept_chunks": 40,
  "raw_tokens": 12000,
  "kept_tokens": 7800,
  "dedupe_rate": 15.5,
  "compression_ratio": 65.2
}
```

### 3. `citations.md`
Source URLs for attribution:
```markdown
# Citations

- https://docs.example.com
- https://blog.example.com
```

## How It Works

1. **Scrape**: Uses Hyperbrowser SDK to fetch content as clean markdown
2. **Chunk**: Splits content into semantic chunks (max 800 tokens each)
3. **Score**: Applies TF-IDF algorithm to rank chunks by relevance
4. **Deduplicate**: Removes similar chunks using Jaccard similarity
5. **Select**: Fits top-ranked chunks within token budget
6. **Compress** (optional): Uses OpenAI to compress selected chunks
7. **Export**: Generates JSONL/MD pack with citations and stats

## Prerequisites

- **Node.js**: v16 or higher
- **Hyperbrowser API Key**: Required for web scraping
- **OpenAI API Key**: Optional, only needed for `--llm` compression

## Environment Variables

Create a `.env` file with:

```bash
HYPERBROWSER_API_KEY=hb_your_api_key_here
OPENAI_API_KEY=sk-your_openai_key_here  # Optional
```

## Use Cases

- **RAG pipelines**: Create context-optimized knowledge bases for retrieval-augmented generation
- **Documentation processing**: Convert docs into LLM-ready format with citations
- **Research assistance**: Build focused context packs from multiple sources
- **Training data**: Generate curated datasets for fine-tuning

## Technical Details

- **Chunk size**: 20-800 tokens per chunk
- **Deduplication threshold**: 70% Jaccard similarity
- **TF-IDF scoring**: Per-chunk relevance ranking
- **Compression**: 25-60% size reduction with OpenAI (gpt-4o-mini)
- **Token estimation**: ~4 characters per token

---

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow [@hyperbrowser_ai](https://twitter.com/hyperbrowser_ai)