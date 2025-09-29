**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# site2prompt

Convert websites into AI-ready training datasets. Scrape, clean, deduplicate, and optimize web content for LLM fine-tuning with intelligent token budgeting.

## Overview

`site2prompt` is a command-line tool that transforms web content into prompt-ready formats optimized for training and fine-tuning large language models. It handles the entire pipeline from scraping to deduplication, compression, and export in multiple formats.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Powerful web scraping** using Hyperbrowser SDK with automatic rendering and content extraction
- **Smart content chunking** - Breaks content into optimized blocks (≤120 tokens each)
- **Token budget management** - Control total output size with configurable token limits
- **Intelligent deduplication** - Uses Jaccard similarity (80% threshold) to eliminate redundant content
- **Dual compression modes**:
  - **Heuristic**: Fast keyword-based extraction of important content
  - **LLM-powered**: OpenAI GPT-4 compression for maximum quality (with `--llm` flag)
- **Multiple export formats**:
  - **JSONL**: One prompt per line with metadata (perfect for fine-tuning)
  - **CSV**: Tabular format with URL, title, content, and token counts
  - **Markdown**: Citation list with source URLs
  - **JSON**: Detailed statistics about the scraping process
- **Batch processing** - Process multiple URLs from a file or command line

## Prerequisites

### Required
- Node.js (v14 or higher)
- **HYPERBROWSER_API_KEY**: Get your API key at [hyperbrowser.ai](https://hyperbrowser.ai)

### Optional
- **OPENAI_API_KEY**: Required only if using `--llm` flag for OpenAI-powered compression

## Installation

```bash
# Clone or navigate to the site2prompt directory
cd site2prompt

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the site2prompt directory:

```env
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here

# Optional: Only needed if using --llm flag
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

### Basic Usage

```bash
# Process URLs from a file
ts-node site2prompt.ts --urls urls.txt --budget 4000

# Process a single URL
ts-node site2prompt.ts --url https://docs.hyperbrowser.ai

# Process multiple URLs
ts-node site2prompt.ts --url https://example.com --url https://another.com --budget 5000
```

### Advanced Usage

```bash
# Use OpenAI compression for higher quality
ts-node site2prompt.ts --urls urls.txt --budget 4000 --llm

# Specify custom output directory
ts-node site2prompt.ts --urls urls.txt --out my-dataset --budget 8000

# Process with default 8000 token budget
ts-node site2prompt.ts --urls urls.txt
```

### Command-Line Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--url` | string[] | - | Single or multiple URLs to scrape (repeatable) |
| `--urls` | string | - | Path to file containing newline-separated URLs |
| `--budget` | number | 8000 | Maximum total tokens to include in output |
| `--out` | string | `distill` | Output directory for generated files |
| `--llm` | boolean | false | Enable OpenAI GPT-4 compression (requires OPENAI_API_KEY) |

### URL File Format

Create a text file (e.g., `urls.txt`) with one URL per line:

```
https://docs.hyperbrowser.ai
https://github.com/hyperbrowser
https://stackoverflow.com/questions/tagged/web-scraping
https://www.npmjs.com/package/@hyperbrowser/sdk
```

## Output Files

All output files are generated in the specified output directory (default: `distill/`):

### 1. prompts.jsonl
JSONL format with one prompt per line, ideal for LLM training:
```json
{"prompt":"Content block here...","metadata":{"url":"https://example.com","title":"Page Title","tokens":95}}
```

### 2. prompts.csv
CSV format with headers:
```csv
url,title,content,tokens
"https://example.com","Page Title","Content here...",95
```

### 3. citations.md
Markdown file with numbered citations:
```markdown
# Citations

1. [Page Title](https://example.com)
2. [Another Page](https://another.com)
```

### 4. stats.json
Statistics about the scraping process:
```json
{
  "totalUrls": 4,
  "successfulScrapes": 4,
  "failedScrapes": 0,
  "totalTokens": 3938,
  "deduplicatedBlocks": 74,
  "finalBlocks": 34,
  "llmCompressed": true
}
```

## How It Works

1. **Scraping**: Uses Hyperbrowser SDK to fetch and render web pages, extracting both markdown and HTML content
2. **Cleaning**: Removes navigation, footers, scripts, and other non-content elements using Cheerio
3. **Extraction**: Pulls meaningful content including headings, paragraphs, lists, and code blocks
4. **Compression**:
   - Heuristic mode: Filters for important keywords and structural elements
   - LLM mode: Uses GPT-4 to compress content while preserving key technical details
5. **Chunking**: Breaks content into blocks of ≤120 tokens each for optimal LLM consumption
6. **Deduplication**: Calculates Jaccard similarity between blocks and removes near-duplicates (≥80% similar)
7. **Budget Control**: Selects blocks until reaching the specified token budget
8. **Export**: Generates multiple output formats for different use cases

## Use Cases

- **Building domain-specific AI models**: Create training datasets from specialized documentation
- **Documentation fine-tuning**: Convert technical docs into training data for coding assistants
- **Knowledge base creation**: Extract and structure information from multiple sources
- **Dataset generation**: Prepare web content for supervised fine-tuning or RAG systems
- **Content analysis**: Deduplicate and compress large amounts of web content

## Code Structure

```
site2prompt/
├── site2prompt.ts       # Main CLI application
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── urls.txt            # Example URL list
├── distill/            # Default output directory
│   ├── prompts.jsonl   # Training data in JSONL format
│   ├── prompts.csv     # Training data in CSV format
│   ├── citations.md    # Source citations
│   └── stats.json      # Processing statistics
└── README.md           # This file
```

### Key Functions

- `cleanHtml()`: Removes unwanted HTML elements and extracts meaningful content
- `createBlocks()`: Splits content into token-limited blocks
- `deduplicateBlocks()`: Removes similar content using Jaccard similarity
- `compressWithLLM()`: Uses OpenAI to compress content intelligently
- `compressHeuristic()`: Fast keyword-based compression fallback
- `countTokens()`: Rough token estimation (1 token ≈ 4 characters)
- `jaccardSimilarity()`: Calculates content similarity for deduplication

## Troubleshooting

### "HYPERBROWSER_API_KEY environment variable is required"
- Ensure you have created a `.env` file with your API key
- Or export it in your shell: `export HYPERBROWSER_API_KEY=your_key`

### "No URLs provided"
- Provide at least one URL using `--url` flag or `--urls` flag pointing to a file
- Check that your URLs file has valid HTTP/HTTPS URLs

### OpenAI compression not working
- Verify `OPENAI_API_KEY` is set in `.env` or environment
- Ensure you're using the `--llm` flag
- Check your OpenAI API quota and billing status

### Low success rate
- Some websites may block automated scraping
- Try reducing concurrent requests or adding delays
- Check network connectivity and URL validity

## Examples

### Example 1: Build a documentation dataset
```bash
# Create a file with documentation URLs
cat > docs.txt << EOF
https://docs.hyperbrowser.ai
https://developer.mozilla.org/en-US/docs/Web
https://nodejs.org/docs/latest/api/
EOF

# Process with LLM compression
ts-node site2prompt.ts --urls docs.txt --budget 10000 --llm --out docs-dataset
```

### Example 2: Quick single-page extraction
```bash
ts-node site2prompt.ts --url https://github.com/hyperbrowser --budget 2000
```

### Example 3: Multiple URLs with custom output
```bash
ts-node site2prompt.ts \
  --url https://example.com/page1 \
  --url https://example.com/page2 \
  --url https://example.com/page3 \
  --budget 5000 \
  --out my-training-data
```

---

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow @hyperbrowser