# O3-Pro Extractor

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A powerful web data extraction tool that combines Hyperbrowser's enterprise-grade web scraping with OpenAI's cutting-edge O3-Pro model to extract structured data from any website with unparalleled accuracy and reasoning capabilities.

## Why O3-Pro?

- High-quality structured data extraction with advanced reasoning
- Handles complex table structures and nested data
- Intelligent data normalization and type inference
- Proven accuracy on data extraction tasks
- Perfect for extracting structured information from dynamic web pages

## Features

- Web scraping with selective content filtering (include/exclude tags)
- Markdown-based content extraction for cleaner data
- Schema validation using Zod
- Structured JSON output with type safety
- Error handling and validation

## Prerequisites

- Node.js (v16 or higher)
- TypeScript
- Hyperbrowser API key
- OpenAI API key with O3-Pro model access

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Get your API keys**
   - Get your Hyperbrowser API key from [hyperbrowser.ai](https://hyperbrowser.ai)
   - Get your OpenAI API key with O3-Pro access from [OpenAI Platform](https://platform.openai.com)

3. **Create environment file**
   Create a `.env` file in the project root:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

Run the extractor:
```bash
npx tsx o3-pro-extractor.ts
```

The tool will:
1. Scrape Wikipedia's list of largest cities
2. Extract only table data (`.wikitable` class) as markdown
3. Process the markdown with O3-Pro to extract structured city data
4. Validate the output with Zod schema
5. Save results to `cities.json`

## How It Works

### 1. Web Scraping
Uses Hyperbrowser's advanced scraping capabilities with selective filtering:
- **Format**: Extracts content as markdown for cleaner processing
- **Include tags**: Only scrapes `.wikitable` elements
- **Exclude tags**: Removes `img` tags to reduce noise

### 2. Data Extraction
Leverages OpenAI's O3-Pro model for intelligent data extraction:
- Structured prompt with clear field definitions
- Schema-guided extraction for type safety
- Advanced reasoning for handling complex table structures

### 3. Schema Validation
Uses Zod for runtime type checking:
```typescript
const CitySchema = z.object({
  city: z.string(),
  country: z.string(),
  population: z.number(),
  rank: z.number(),
});
```

## Example Output

```json
{
  "cities": [
    {
      "city": "Tokyo",
      "country": "Japan",
      "population": 37393128,
      "rank": 1
    },
    {
      "city": "Delhi",
      "country": "India",
      "population": 32941308,
      "rank": 2
    },
    {
      "city": "Shanghai",
      "country": "China",
      "population": 28516904,
      "rank": 3
    }
  ]
}
```

## Use Cases

This pattern is ideal for:

- **Market Research**: Extract competitor data, pricing tables, product specifications
- **Lead Generation**: Scrape business directories, contact information, company profiles
- **Financial Analysis**: Extract stock tables, financial statements, economic indicators
- **E-commerce**: Scrape product catalogs, reviews, specifications from multiple sources
- **Real Estate**: Extract property listings, pricing data, market statistics
- **Academic Research**: Gather structured data from research databases, publication tables

## Customization

### Change the Target Website
Modify the URL in the scrape configuration:
```typescript
const scrapeResult = await client.scrape.startAndWait({
  url: "your-target-url",
  scrapeOptions: {
    formats: ["markdown"],
    includeTags: [".your-selector"],
    excludeTags: ["unwanted-elements"],
  },
});
```

### Customize the Extraction Schema
Update the Zod schema to match your data structure:
```typescript
const YourSchema = z.object({
  field1: z.string(),
  field2: z.number(),
  field3: z.array(z.string()),
});
```

### Adjust the System Prompt
Modify `SYSTEM_PROMPT` to guide the AI for different extraction tasks:
```typescript
const SYSTEM_PROMPT = `Your custom instructions for data extraction...`;
```

## Troubleshooting

- **"Scrape failed"**: Check your Hyperbrowser API key and ensure the target URL is accessible
- **"No markdown data found"**: Verify your `includeTags` selector matches elements on the page
- **Invalid schema**: Ensure your Zod schema matches the expected output structure
- **O3-Pro access denied**: Confirm your OpenAI API key has access to the O3-Pro model

## Why Hyperbrowser?

- Handles JavaScript-heavy sites automatically
- Built-in proxy rotation and CAPTCHA solving
- Reliable scraping at scale
- Selective content extraction (includeTags/excludeTags)
- Multiple output formats (HTML, markdown, text)

## Resources

- [Hyperbrowser Documentation](https://docs.hyperbrowser.ai)
- [OpenAI O3-Pro Documentation](https://platform.openai.com/docs/models/o3-pro)
- [Zod Documentation](https://zod.dev)

## License

MIT License