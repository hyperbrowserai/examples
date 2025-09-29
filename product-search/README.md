# Product Finder

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A powerful command-line tool built with TypeScript and Hyperbrowser SDK to search for products, extract their information, find similar products, and track them over time.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Product Search**: Extract detailed information from any product URL using Hyperbrowser's Extract API
- **Similar Products**: Find similar products from Bing Shopping automatically
- **Data Tracking**: Save product details to easily track price changes over time
- **Automatic Refresh**: Schedule updates with cron jobs to keep your product data current
- **User-Friendly Interface**: Progress indicators with `ora` and clear formatted output
- **OpenAI Integration**: Optional AI-powered product similarity sorting

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install**: `npm install`
3. **Configure**: Add `HYPERBROWSER_API_KEY` to `.env` (and optionally `OPENAI_API_KEY`)
4. **Build**: `npm run build`
5. **Run**: `npm run search -- --url "https://example.com/product"`

## Requirements

- Node.js 18 or higher
- Hyperbrowser API key (get one at [hyperbrowser.ai](https://hyperbrowser.ai))
- OpenAI API key (optional, for AI-powered similarity sorting)
- Linux/macOS for the scheduling feature (uses crontab)

## Installation

```bash
# Install dependencies
npm install

# Create .env file with your API keys
echo "HYPERBROWSER_API_KEY=your_hyperbrowser_api_key" > .env
echo "OPENAI_API_KEY=your_openai_api_key" >> .env  # Optional

# Build the project
npm run build
```

## Usage

### 1. Search for a Product

Extract information about a product and find similar items:

```bash
npm run search -- --url "https://www.amazon.com/dp/B08N5WRWNW"
```

This will:
- Extract product details (name, brand, description, price) using Hyperbrowser
- Search for similar products on Bing Shopping
- Sort results by similarity (if OpenAI API key is provided)
- Save results to `saved_products.json`

**Options:**
- `--url, -u`: Product URL (required)
- `--output, -o`: Custom output file path (optional, defaults to `saved_products.json`)

### 2. Refresh Product Data

Update the similar products for all items in your saved data:

```bash
npm run refresh -- --file "./saved_products.json"
```

**Options:**
- `--file, -f`: Path to the saved product data file (optional, defaults to `saved_products.json`)

## Advanced Usage

### 3. Schedule Automatic Updates

Set up a cron job to automatically refresh product data:

```bash
# Custom schedule (every 6 hours)
npm run schedule -- --interval "0 */6 * * *" --file "./saved_products.json"

# Daily at midnight (default)
npm run schedule -- --file "./saved_products.json"
```

This creates a shell script and adds it to your crontab. Logs are saved to `scheduled-run.log`.

**Options:**
- `--interval, -i`: Cron schedule expression (default: `0 0 * * *` - daily at midnight)
- `--file, -f`: Path to the saved product file (default: `saved_products.json`)

**Common cron patterns:**
- `0 */6 * * *` - Every 6 hours
- `0 0 * * *` - Daily at midnight
- `0 */1 * * *` - Every hour
- `0 0 * * 0` - Weekly on Sunday

### 4. Remove Scheduled Updates

```bash
# Remove from crontab, keep script file
npm run unschedule

# Remove from crontab and delete script file
npm run unschedule -- --delete-script
```


## How It Works

1. **Product Extraction**: Uses Hyperbrowser's Extract API to scrape product details from any product page
2. **Similar Product Search**: Automatically searches Bing Shopping for similar products based on product name
3. **AI Sorting** (optional): Uses OpenAI GPT-4o-mini to rank products by similarity to the original
4. **Data Persistence**: Saves results to JSON file with timestamps for tracking
5. **Scheduled Updates**: Creates shell scripts and cron jobs for automatic refreshing

## Code Structure

```
src/
├── index.ts        # CLI entrypoint with Commander.js
├── product.ts      # Product search and refresh logic
├── scheduler.ts    # Cron job management
├── display.ts      # Console output formatting
└── types.ts        # Zod schemas and TypeScript types
```

## Data Format

The tool stores data in JSON format with the following structure:

```json
{
  "https://example.com/product/123": {
    "originalProduct": {
      "name": "Example Product",
      "brand": "Example Brand",
      "description": "This is a great product...",
      "price": 99.99
    },
    "similarProducts": [
      {
        "name": "Similar Product 1",
        "brand": "Other Brand",
        "description": "Another great product...",
        "price": 89.99,
        "linkToProduct": "https://example.com/similar1",
        "onSale": true,
        "salePrice": 79.99
      }
    ],
    "lastUpdated": "2023-11-15T12:34:56.789Z"
  }
}
```

## Technologies Used

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)** - Web scraping and data extraction
- **OpenAI GPT-4o-mini** - AI-powered similarity ranking
- **Commander.js** - CLI argument parsing
- **Zod** - Schema validation
- **Ora** - Terminal spinners and progress indicators
- **TypeScript** - Type-safe development

## Use Cases

- **Price Monitoring**: Track price changes for products you're interested in
- **Comparison Shopping**: Find and compare similar products across retailers
- **Market Research**: Analyze product offerings and pricing in a category
- **Deal Finding**: Monitor for sales and price drops on similar items
- **Product Discovery**: Discover alternatives to products you're researching

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.