# HyperTrain CLI

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A powerful single-file TypeScript CLI tool that uses Hyperbrowser's official SDK to scrape URLs and create LLM-ready training datasets. Perfect for building custom datasets for fine-tuning language models.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Official Hyperbrowser SDK** - Uses the official `@hyperbrowser/sdk` for reliable web scraping
- **Multiple Output Formats** - Generate JSONL and Markdown datasets
- **Smart Chunking** - Paragraph-aware text splitting with configurable chunk sizes
- **Embeddings Generation** - Optional OpenAI embeddings for semantic search
- **QA Pair Generation** - Automated question-answer pair creation for training
- **Concurrent Processing** - Configurable concurrency for fast dataset creation
- **Streaming Writes** - Memory-efficient handling of large datasets
- **Progress Logging** - Clear feedback during dataset creation

## Installation

1. **Get an API key** from [https://hyperbrowser.ai](https://hyperbrowser.ai)

2. Clone and install dependencies:
```bash
npm install
```

3. Set your environment variables:
```bash
export HYPERBROWSER_API_KEY="your_hyperbrowser_api_key"
export OPENAI_API_KEY="your_openai_api_key"  # Only needed for --embed or --qa
```

## Quick Start

1. Create a file with URLs (one per line):
```bash
echo -e "https://example.com\nhttps://docs.hyperbrowser.ai" > urls.txt
```

2. Run the basic dataset creation:
```bash
ts-node hypertrain.ts --input urls.txt
```

3. Advanced usage with embeddings and QA pairs:
```bash
ts-node hypertrain.ts --input urls.txt --out ./dataset --format jsonl,md --embed --qa 2 --tag "training-data"
```

## Usage

```
ts-node hypertrain.ts [options]

Options:
  --input <file>        Input file with URLs (one per line) [required]
  --out <dir>           Output directory (default: ./dataset)
  --format <formats>    Output formats: jsonl,md (default: jsonl)
  --chunk <chars>       Max characters per chunk (default: 900)
  --concurrency <num>   Concurrent requests (default: CPU count)
  --embed               Generate embeddings (requires OPENAI_API_KEY)
  --qa <N>              Generate N QA pairs per chunk (requires OPENAI_API_KEY)
  --finetune <type>     Format for fine-tuning (openai)
  --tag <string>        Add custom tag to metadata
  --help, -h            Show help message
```

## Output Formats

### JSONL Dataset (`dataset.jsonl`)
```json
{
  "id": "example_com_1234567890_0",
  "url": "https://example.com",
  "title": "Example Page",
  "chunk_id": "chunk_0_0", 
  "text": "This is the first chunk of content...",
  "metadata": {
    "collected_at": "2024-01-01T00:00:00.000Z",
    "tag": "training-data"
  }
}
```

### Embeddings (`embeddings.jsonl`)
```json
{
  "id": "chunk_0_0",
  "vector": [0.1, 0.2, -0.3, ...],
  "dims": 1536
}
```

### QA Pairs (`qa.jsonl`)
```json
{
  "messages": [
    {"role": "user", "content": "What is the main topic?"},
    {"role": "assistant", "content": "The main topic is..."}
  ],
  "source_id": "chunk_0_0"
}
```

### Markdown Output
Individual `.md` files per scraped page with structured content and metadata.

## Use Cases

- **Fine-tuning Models** - Create custom training datasets for domain-specific models
- **Knowledge Base Creation** - Build searchable knowledge bases with embeddings
- **Content Analysis** - Generate structured datasets for content research
- **QA System Training** - Create question-answer pairs for chatbot training

## Environment Variables

- `HYPERBROWSER_API_KEY` - Your Hyperbrowser API key (required)
- `OPENAI_API_KEY` - Your OpenAI API key (required for --embed or --qa)

## Examples

### Basic Dataset Creation
```bash
ts-node hypertrain.ts --input urls.txt --out ./my-dataset
```

### With Embeddings
```bash
ts-node hypertrain.ts --input urls.txt --embed --format jsonl
```

### Full Feature Set
```bash
ts-node hypertrain.ts \
  --input urls.txt \
  --out ./complete-dataset \
  --format jsonl,md \
  --chunk 1200 \
  --concurrency 5 \
  --embed \
  --qa 3 \
  --tag "v1.0"
```

### Generate QA Training Data
```bash
ts-node hypertrain.ts --input urls.txt --qa 2 --finetune openai
```

## Development

Run with TypeScript directly:
```bash
npm run start -- --input urls.txt
```

Build JavaScript version:
```bash
npm run build
node hypertrain.js --input urls.txt
```

## Architecture

This is a single-file TypeScript CLI tool with the following structure:

- **`hypertrain.ts`** - Main CLI tool with HyperTrain class
  - URL scraping using Hyperbrowser SDK
  - Smart paragraph-aware text chunking
  - OpenAI embeddings generation
  - QA pair generation with GPT-3.5
  - Multiple output format support (JSONL, Markdown)
  - Concurrent processing for performance

- **`test-urls.txt`** - Sample URL list for testing
- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration

## License

ISC

---

Built with [Hyperbrowser](https://hyperbrowser.ai) | Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates
