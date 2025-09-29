# Company Researcher

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

An intelligent company research tool that uses AI-powered web extraction to gather comprehensive information about any company based on your specific research topics.

## Features

- 🔍 **Smart Company Research**: Enter any company name and research topic to get detailed insights
- 🤖 **AI-Powered Extraction**: Uses Hyperbrowser's advanced extraction capabilities with structured schema validation
- 📊 **Structured Output**: Returns organized information including company overview, research findings, and key points
- 🎨 **Interactive CLI**: Beautiful command-line interface with colored output
- ⚡ **Fast & Reliable**: Leverages Google search and Hyperbrowser's `extract.startAndWait()` for accurate results
- 🔐 **Type-Safe**: Built with TypeScript and Zod schema validation

## What It Does

This tool allows you to research any company on any topic by:

1. Taking a company name and research topic as input
2. Performing intelligent web searches
3. Extracting and structuring relevant information using AI
4. Presenting the findings in a clear, organized format

Perfect for:

- Market research
- Competitive analysis
- Due diligence
- Investment research
- Business intelligence

## Get an API Key

Get your Hyperbrowser API key at **[https://hyperbrowser.ai](https://hyperbrowser.ai)**

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
export HYPERBROWSER_API_KEY="your_api_key_here"

# Run the application
npx tsx company-researcher.ts
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hyperbrowser API key

## Environment Variables

Create a `.env` file in the project root:

```bash
HYPERBROWSER_API_KEY=your_api_key_here
```

## Usage

### Interactive Process

1. **Enter Company Name**: Type the name of the company you want to research
2. **Enter Research Topic**: Specify what aspect you want to research (e.g., "financial performance", "recent news", "market position", "sustainability initiatives")
3. **View Results**: The tool will display structured research findings

### Example Session

```
Enter the company name: Tesla
Enter what you wanna research about the company: recent innovations

Researching Tesla for: recent innovations...

============================================================
RESEARCH RESULTS FOR: TESLA
TOPIC: RECENT INNOVATIONS
============================================================

COMPANY: Tesla, Inc.

OVERVIEW:
Tesla, Inc. is an American multinational automotive and clean energy company...

RESEARCH FINDINGS:
Recent innovations from Tesla include advancements in battery technology...

KEY POINTS:
1. Introduction of 4680 battery cells with improved energy density
2. Full Self-Driving (FSD) Beta expansion
3. Supercharger network expansion globally
...

============================================================
```

## Output Structure

The tool provides structured output including:

- **Company Name**: Verified company name
- **Company Overview**: General information about the company
- **Research Findings**: Specific information related to your research topic
- **Key Points**: Bullet-pointed insights and highlights
- **Additional Information**: Supplementary relevant details

## API Reference

Uses **Hyperbrowser's official API methods**:

```typescript
import { Hyperbrowser } from "@hyperbrowser/sdk";
import { z } from "zod";

// Initialize Hyperbrowser client
const client = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY,
});

// Define schema for structured extraction
const schema = z.object({
  companyName: z.string(),
  companyOverview: z.string(),
  researchFindings: z.string(),
  keyPoints: z.array(z.string()),
  additionalInfo: z.string().optional(),
});

// Extract structured data from search results
const result = await client.extract.startAndWait({
  urls: [searchUrl],
  prompt: `Research and extract information about ${companyName}...`,
  schema: schema,
});
```

## Dependencies

- **@hyperbrowser/sdk**: Hyperbrowser SDK for AI-powered web extraction
- **dotenv**: Environment variable management
- **zod**: Schema validation for structured data extraction
- **readline**: Interactive command-line interface
- **TypeScript**: Type-safe development

## Development

### Project Structure

```
company-researcher/
├── company-researcher.ts    # Main application file
├── package.json            # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

### Architecture

Single-file TypeScript implementation (~112 LOC):

- **Hyperbrowser SDK**: AI-powered web extraction via `extract.startAndWait()`
- **Zod Schema Validation**: Type-safe structured data extraction
- **Interactive CLI**: readline-based user input with colored output
- **Google Search Integration**: Leverages search results for comprehensive research
- **Error Handling**: Graceful error handling with informative messages

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your Hyperbrowser API key is correctly set in the `.env` file or environment variables
2. **Network Issues**: Ensure you have a stable internet connection for web searches
3. **TypeScript Errors**: Run `npm install` to ensure all dependencies are installed
4. **No Data Found**: Try rephrasing your research topic to be more specific

### Getting Help

- Check the [Hyperbrowser documentation](https://docs.hyperbrowser.ai) for API-related issues
- Ensure your API key has sufficient credits
- Verify that the company name is spelled correctly
- Join the [Discord community](https://discord.gg/zsYzsgVRjh) for support

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
