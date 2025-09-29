# OSS Web Extractor

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A blazingly fast web data extractor powered by Hyperbrowser's scraping infrastructure and OpenAI's open-source `gpt-oss-20b` model hosted on Fireworks AI. Extract structured data from any website with enterprise-grade reliability and cost-effective AI inference.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Enterprise-grade scraping** - Hyperbrowser handles CAPTCHAs, proxies, and rate limits automatically
- **Cost-effective AI** - Uses OpenAI's open-source gpt-oss-20b model via Fireworks AI
- **Lightning fast** - High-performance inference with minimal latency
- **Fully customizable** - Easily modify extraction schemas with Zod validation
- **Production-ready** - Built-in retry logic and error handling
- **Structured output** - Clean JSON output with type validation

## Prerequisites

1. **Hyperbrowser API key**: Get yours at https://hyperbrowser.ai
2. **Fireworks API key**: Sign up at https://fireworks.ai for access to gpt-oss-20b

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create a .env file with your API keys
echo "HYPERBROWSER_API_KEY=your_hyperbrowser_key" > .env
echo "FIREWORKS_API_KEY=your_fireworks_key" >> .env
```

## Usage

Run the extractor:
```bash
npm run start
```

The tool will:
1. Scrape Wikipedia's list of largest cities using Hyperbrowser
2. Extract structured data using gpt-oss-20b on Fireworks AI
3. Save validated results to `extracted-data.json`

## How It Works

The extractor follows a simple two-step pipeline:

1. **Scraping Phase**: Hyperbrowser fetches and converts the target webpage to markdown
   - Filters content using CSS selectors (e.g., `.wikitable` class)
   - Removes unwanted elements (images, ads, etc.)
   - Converts HTML to clean markdown format

2. **Extraction Phase**: AI model processes markdown and extracts structured data
   - Uses gpt-oss-20b via Fireworks AI for cost-effective inference
   - Validates output with Zod schemas for type safety
   - Implements retry logic with exponential backoff
   - Saves validated JSON output to file

## Code Structure

```
oss-web-extractor/
├── oss-web-extractor.ts    # Main application logic
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── extracted-data.json      # Output file (generated)
└── README.md               # This file
```

### Key Components

- **CONFIG**: Centralized configuration for API keys, model selection, and file paths
- **Zod Schemas**: `CitySchema` and `ResponseSchema` ensure type-safe data validation
- **extractDataWithRetry()**: Robust extraction with retry logic and error handling
- **main()**: Orchestrates scraping → extraction → validation → file output workflow

## Customization

### Change the Target URL

```typescript
const scrapeResult = await client.scrape.startAndWait({
  url: "https://your-target-website.com",
  scrapeOptions: {
    formats: ["markdown"],
    includeTags: [".your-css-selector"],
    excludeTags: ["img", "script"],
  },
});
```

### Modify the Data Schema

```typescript
// Define your custom schema
const ProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  rating: z.number(),
  availability: z.string(),
});

const ResponseSchema = z.object({
  products: z.array(ProductSchema)
});
```

### Update the System Prompt

```typescript
const SYSTEM_PROMPT = `Extract product information from the markdown content.
Return data in the following format:
- name: Product name
- price: Price as a number
- rating: Rating out of 5
- availability: Stock status`;
```

## Example Output

The tool extracts structured data from Wikipedia's list of largest cities:

```json
{
  "cities": [
    {
      "city": "Tokyo",
      "country": "Japan",
      "population": 37468000,
      "rank": 1
    },
    {
      "city": "Delhi",
      "country": "India",
      "population": 28514000,
      "rank": 2
    },
    {
      "city": "Shanghai",
      "country": "China",
      "population": 25582000,
      "rank": 3
    }
  ]
}
```

See `extracted-data.json` for the complete output with 81 cities.

## Use Cases

Perfect for teams who need to extract structured data at scale:

- **E-commerce**: Monitor competitor pricing, product catalogs, and inventory
- **Real Estate**: Scrape property listings, prices, and market trends
- **Job Boards**: Extract job postings, salaries, and requirements
- **Research**: Gather datasets from public websites for analysis
- **Market Intelligence**: Track competitor features, reviews, and updates
- **Lead Generation**: Extract business directories and contact information

## Technical Stack

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)**: Enterprise-grade web scraping
- **Fireworks AI**: Cost-effective hosting for gpt-oss-20b model
- **Zod**: Runtime type validation and schema definition
- **TypeScript**: Type-safe development
- **dotenv**: Environment variable management

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `HYPERBROWSER_API_KEY` | Yes | Your Hyperbrowser API key from https://hyperbrowser.ai |
| `FIREWORKS_API_KEY` | Yes | Your Fireworks AI API key for gpt-oss-20b access |

## Error Handling

The tool includes robust error handling:

- **Retry Logic**: Automatically retries failed extractions (up to 3 attempts)
- **Exponential Backoff**: Increases wait time between retries
- **Debug Output**: Saves raw responses to `debug-raw-response.txt` on parse errors
- **Validation**: Zod schemas catch data format issues before file output

## Troubleshooting

**"Cannot connect to gpt-oss-20b API" error**:
- Verify `FIREWORKS_API_KEY` is set correctly in `.env`
- Check your Fireworks AI account has API access enabled

**"Scrape failed" error**:
- Ensure `HYPERBROWSER_API_KEY` is valid
- Check the target URL is accessible
- Verify your Hyperbrowser account has sufficient credits

**JSON parse errors**:
- Check `debug-raw-response.txt` for the raw model output
- Adjust the `SYSTEM_PROMPT` to provide clearer instructions
- Modify temperature setting for more deterministic output

**Installation issues**:
- Use Node.js v18 or higher
- Run `npm install` to ensure all dependencies are installed
- Check that TypeScript is properly installed

---

**Perfect for**: Web scraping at scale, data extraction pipelines, competitive intelligence, market research automation.

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow @hyperbrowser