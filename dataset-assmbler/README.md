**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# Dataset Assembler

Rapidly assemble high-quality training datasets from web content. Search, scrape, clean, and split data into ready-to-use train/eval sets for LLM fine-tuning.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## What It Does

This CLI tool automates the entire dataset creation pipeline:

1. **Search** - Queries the web using Serper.dev API to find relevant pages
2. **Scrape** - Extracts clean, structured content using Hyperbrowser's SDK (supports both batch and individual scraping)
3. **Process** - Deduplicates content and removes empty entries
4. **Split** - Divides data into train/eval sets with configurable ratios
5. **Export** - Outputs to JSONL or CSV format

Perfect for building domain-specific datasets for fine-tuning, RAG systems, or knowledge bases.

## Quick Start

1. **Get API keys**:
   - [Hyperbrowser](https://hyperbrowser.ai) - For web scraping
   - [Serper.dev](https://serper.dev) - For web search

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment** - Create a `.env` file:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
   SERPER_API_KEY=your_serper_api_key
   ```

4. **Run the tool**:
   ```bash
   npx ts-node dataset-assembler.ts --topic "machine learning security" --max 100
   ```

## Usage

### Basic Example

```bash
npx ts-node dataset-assembler.ts \
  --topic "retrieval augmented generation security" \
  --sources "arxiv.org,ai.googleblog.com" \
  --max 200
```

### Advanced Example

```bash
npx ts-node dataset-assembler.ts \
  --topic "AI safety research" \
  --sources "openai.com,anthropic.com" \
  --max 100 \
  --format csv \
  --train-split 0.8 \
  --out safety-dataset
```

This will:
- Search for "AI safety research" on specified domains
- Scrape up to 100 pages with markdown content
- Deduplicate based on content hash
- Create 80/20 train/eval split
- Output to `safety-dataset.train.csv` and `safety-dataset.eval.csv`

## CLI Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--topic` | string | *required* | Search query (e.g., "LLM fine-tuning") |
| `--sources` | string | - | Comma-separated domains (e.g., "arxiv.org,github.com") |
| `--max` | number | 200 | Maximum records to collect |
| `--format` | string | jsonl | Output format: `jsonl` or `csv` |
| `--out` | string | dataset | Output file prefix |
| `--train-split` | number | 0.9 | Training set proportion (0.0-1.0) |

## Features

- **Batch Scraping** - Uses Hyperbrowser's batch API (Ultra plan) with automatic fallback to individual scraping
- **Smart Deduplication** - SHA-256 content hashing to eliminate duplicates
- **Markdown Extraction** - Clean, LLM-ready content with main content extraction
- **Flexible Output** - JSONL or CSV formats with customizable fields
- **Domain Targeting** - Focus searches on specific authoritative sources
- **Train/Eval Split** - Automatic dataset splitting with shuffling

## Output Format

### JSONL (default)
```jsonl
{"url":"https://example.com/page1","title":"Article Title","content":"Clean markdown content..."}
{"url":"https://example.com/page2","title":"Another Article","content":"More content..."}
```

### CSV
```csv
url,title,content
"https://example.com/page1","Article Title","Clean markdown content..."
"https://example.com/page2","Another Article","More content..."
```

## Use Cases

- **LLM Fine-tuning** - Build domain-specific training datasets
- **RAG Systems** - Create knowledge bases from authoritative sources
- **Search Indexes** - Assemble content collections for semantic search
- **Research** - Gather domain-specific corpora for analysis

## Requirements

- Node.js >= 18.0.0
- Hyperbrowser API key (Free tier available)
- Serper.dev API key

## Architecture

Single-file TypeScript CLI built with:
- `@hyperbrowser/sdk` - Browser automation and scraping
- `yargs` - CLI argument parsing
- `axios` - HTTP requests to Serper API
- `chalk` - Terminal output formatting
- `dotenv` - Environment variable management

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates | [Documentation](https://docs.hyperbrowser.ai) | [Discord Community](https://discord.gg/zsYzsgVRjh)