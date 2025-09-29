**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# Internet Zip (kzip)

Minimal CLI tool that scrapes any URL with Hyperbrowser and compresses it into a semantic knowledge shard (`.kzip.json`). Perfect for building growth-data archives from live pages - think auto-curated summaries, link graphs, and key points to power sign-ups and content workflows.

## Features

- Web scraping via Hyperbrowser SDK
- AI-powered semantic compression and extraction
- Automatic link discovery and cataloging
- Structured JSON output with metadata
- Configurable output paths
- Compression ratio reporting

## Use Cases

- Building knowledge bases from web content
- Creating searchable content archives
- Extracting key insights from documentation
- Monitoring and tracking page changes over time
- Generating structured data for LLM workflows
- Content summarization pipelines

## Prerequisites

- Node.js (v18 or later)
- **Hyperbrowser API Key**: Get yours at [hyperbrowser.ai](https://hyperbrowser.ai)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
   ```

3. **Run the tool:**
   ```bash
   npx ts-node kzip.ts <url> [--out file.kzip.json]
   ```

## Usage

### Basic Usage

Scrape a URL and save with default filename (based on hostname):
```bash
npx ts-node kzip.ts https://news.ycombinator.com
# Output: news.ycombinator.com.kzip.json
```

### Custom Output Path

Specify a custom output filename:
```bash
npx ts-node kzip.ts https://example.com/blog/post --out my-article.kzip.json
```

### More Examples

```bash
# Scrape documentation
npx ts-node kzip.ts https://docs.hyperbrowser.ai --out hyperbrowser-docs.kzip.json

# Archive a blog post
npx ts-node kzip.ts https://blog.example.com/article-title --out blog-archive.kzip.json

# Save news articles
npx ts-node kzip.ts https://news.ycombinator.com --out hn-frontpage.kzip.json
```

## How It Works

1. **Scrape**: Uses Hyperbrowser SDK `scrape.startAndWait()` to fetch HTML content and metadata
2. **Extract**: Calls `extract.startAndWait()` with AI to generate:
   - Page title
   - Comprehensive summary paragraph
   - 5 key bullet points
   - All outbound links (deduplicated and sorted)
3. **Compress**: Saves structured JSON output and calculates compression ratio
4. **Report**: Displays file location and compression statistics

## Output Format

Each `.kzip.json` file contains:

```json
{
  "url": "https://example.com/",
  "scrapedAt": "2025-01-01T00:00:00.000Z",
  "title": "Example Page Title",
  "summary": "A comprehensive summary of the page content...",
  "keyPoints": [
    "First key insight",
    "Second key insight",
    "Third key insight",
    "Fourth key insight",
    "Fifth key insight"
  ],
  "outboundLinks": [
    "https://example.com/link1",
    "https://example.com/link2"
  ],
  "rawSize": 12345,
  "compressedSize": 1111
}
```

### Field Descriptions

- `url`: Original URL that was scraped
- `scrapedAt`: ISO timestamp of when scraping occurred
- `title`: Extracted page title
- `summary`: AI-generated paragraph summarizing the content
- `keyPoints`: Array of 5 key insights from the page
- `outboundLinks`: Deduplicated array of all outbound URLs found on the page
- `rawSize`: Size of raw HTML in bytes
- `compressedSize`: Size of final JSON file in bytes

## Code Structure

**Main file**: `kzip.ts`

Key components:
- CLI parser using `commander` for argument handling
- Hyperbrowser SDK integration for scraping and extraction
- JSON schema definition for structured AI extraction
- File system operations for output management

**Dependencies**:
- `@hyperbrowser/sdk` - Official Hyperbrowser SDK for web scraping
- `commander` - CLI argument parsing
- `dotenv` - Environment variable management
- `typescript` - TypeScript support

## Command Line Options

```bash
kzip.ts <url> [options]

Arguments:
  url                  URL to scrape (required)

Options:
  --out <file>         Output filename (must end with .kzip.json)
                       Default: <hostname>.kzip.json
  -h, --help           Display help information
```

## Error Handling

The tool includes comprehensive error handling for:
- Missing API key validation
- Invalid URL format detection
- Failed scraping attempts
- Missing HTML content
- Invalid output filename extensions
- File system write errors

## Performance

- Typical compression ratios: 10-50x (depending on page content)
- Processing time: 5-15 seconds per URL (varies by page size and AI processing)
- Output file sizes: Usually 1-5 KB per page

## Important Notes

- Uses only official Hyperbrowser SDK methods - no mock data or workarounds
- Output filename must end with `.kzip.json` extension if using `--out` option
- Default filename is automatically generated from hostname if `--out` is omitted
- Links are automatically deduplicated and sorted alphabetically
- AI extraction uses structured schema for consistent output format

---

Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates


