# SEO Analyzer

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

An intelligent SEO analysis tool that uses AI-powered web extraction to analyze websites and provide actionable recommendations for improving search engine optimization.

## Features

- 🔍 **Comprehensive SEO Analysis**: Analyzes title tags, meta descriptions, headings, content, images, links, and technical SEO factors
- 🤖 **AI-Powered Insights**: Uses Hyperbrowser's advanced extraction with structured schema validation
- 📊 **Severity Classification**: Issues categorized as Critical, High, Medium, or Low priority
- ⚡ **Quick Wins**: Identifies easy improvements for immediate impact
- 🎨 **Interactive CLI**: Beautiful command-line interface with colored output
- 🔐 **Type-Safe**: Built with TypeScript and Zod schema validation

## What It Does

This tool allows you to perform comprehensive SEO audits on any website by:

1. Taking a website URL as input via interactive prompt
2. Extracting and analyzing page content, structure, and metadata
3. Using AI to identify SEO issues and opportunities
4. Presenting findings in a clear, organized format with severity levels

Perfect for:

- SEO audits and optimization
- Website performance monitoring
- Content optimization
- Technical SEO analysis
- Competitive SEO research

## Get an API Key

Get your Hyperbrowser API key at **[https://hyperbrowser.ai](https://hyperbrowser.ai)**

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
export HYPERBROWSER_API_KEY="your_api_key_here"

# Run the analyzer
npx tsx SEO-Analyzer.ts
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

### Interactive Mode

The tool uses an interactive CLI to prompt for the website URL:

```bash
npx tsx SEO-Analyzer.ts
```

**Example Session:**

```
Enter the website URL to analyze: example.com
Analyzing SEO for: https://example.com...

============================================================
SEO ANALYSIS RESULTS FOR: https://example.com
============================================================

OVERALL SEO SCORE: 75/100

SUMMARY:
The website has a solid foundation but needs improvements in
meta descriptions and image optimization...

ISSUES FOUND (5):

1. CRITICAL - TITLE
   Issue: Missing or duplicate title tags detected
   Recommendation: Add unique, descriptive title tags (50-60 characters)

2. HIGH - META_DESCRIPTION
   Issue: Meta description is too short
   Recommendation: Expand meta description to 150-160 characters

3. MEDIUM - IMAGES
   Issue: 5 images missing alt text
   Recommendation: Add descriptive alt text to all images

STRENGTHS:
1. Strong heading structure with proper H1-H6 hierarchy
2. Fast loading times and good technical performance

QUICK WINS:
1. Add alt text to 5 images missing descriptions
2. Optimize meta description length for better click-through rates
============================================================
```

### Alternative Commands

```bash
# Development mode
npm run dev

# Using ts-node
npm start

# Direct execution
npx tsx SEO-Analyzer.ts
```

## SEO Analysis Categories

The tool analyzes these key SEO factors:

| Category | What it Checks |
|----------|----------------|
| **Title Tags** | Length (50-60 chars), uniqueness, keyword inclusion |
| **Meta Descriptions** | Length (150-160 chars), compelling copy, keywords |
| **Headings** | H1-H6 hierarchy, keyword usage, structure |
| **Content** | Quality, length, keyword density, readability |
| **Images** | Alt text, file names, optimization |
| **Links** | Internal/external linking, anchor text |
| **Technical SEO** | Page structure, schema markup, accessibility |

## Issue Severity Levels

- **Critical**: Severely impacts SEO (missing titles, broken structure)
- **High**: Important issues to fix soon (poor meta descriptions, missing H1)
- **Medium**: Optimization opportunities (image alt text, internal linking)
- **Low**: Minor improvements (keyword density, content length)

## Output Structure

The tool provides structured output including:

- **Overall SEO Score**: Numerical score from 0-100
- **Summary**: High-level assessment of the website's SEO status
- **Issues**: Categorized list of problems with severity, description, and recommendations
- **Strengths**: What the website is doing well
- **Quick Wins**: Easy improvements for immediate impact

## API Reference

Uses **Hyperbrowser's official API methods**:

```typescript
import { Hyperbrowser } from "@hyperbrowser/sdk";
import { z } from "zod";

// Initialize Hyperbrowser client
const client = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY,
});

// Define schema for structured SEO extraction
const schema = z.object({
  url: z.string(),
  overallScore: z.number().min(0).max(100),
  summary: z.string(),
  issues: z.array(z.object({
    type: z.string(),
    severity: z.enum(["critical", "high", "medium", "low"]),
    issue: z.string(),
    recommendation: z.string(),
  })),
  strengths: z.array(z.string()),
  quickWins: z.array(z.string()),
});

// Extract structured SEO data
const result = await client.extract.startAndWait({
  urls: [url],
  prompt: `Perform a comprehensive SEO analysis...`,
  schema: schema,
});
```

## Dependencies

- **@hyperbrowser/sdk**: Hyperbrowser SDK for AI-powered web extraction and SEO analysis
- **dotenv**: Environment variable management
- **zod**: Schema validation for structured data extraction
- **readline**: Interactive command-line interface
- **TypeScript**: Type-safe development

## Development

### Project Structure

```
SEO-Analyzer/
├── SEO-Analyzer.ts      # Main application file
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── .env                 # Environment variables (create this)
└── README.md            # This file
```

### Architecture

Single-file TypeScript implementation (~135 LOC):

- **Hyperbrowser SDK**: AI-powered web extraction via `extract.startAndWait()`
- **Zod Schema Validation**: Type-safe structured SEO data extraction
- **Interactive CLI**: readline-based user input with colored output
- **Smart URL Handling**: Automatically adds `https://` protocol if missing
- **Error Handling**: Graceful error handling with informative messages

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your Hyperbrowser API key is correctly set in the `.env` file or environment variables
2. **Network Issues**: Ensure you have a stable internet connection
3. **TypeScript Errors**: Run `npm install` to ensure all dependencies are installed
4. **Scraping Failed**: Website might be blocking automated access or require authentication
5. **No Content Found**: Site might be heavily JavaScript-based or have dynamic content loading

### Getting Help

- Check the [Hyperbrowser documentation](https://docs.hyperbrowser.ai) for API-related issues
- Ensure your API key has sufficient credits
- Verify that the URL is accessible and valid
- Join the [Discord community](https://discord.gg/zsYzsgVRjh) for support

## Use Cases

**SEO Professionals:**
- Perform comprehensive website audits
- Track SEO improvements over time
- Identify technical SEO issues

**Web Developers:**
- Validate SEO implementation
- Catch SEO issues during development
- Optimize page structure and metadata

**Content Creators:**
- Optimize blog posts and articles
- Improve meta descriptions and titles
- Enhance content discoverability

**Marketing Teams:**
- Monitor website SEO health
- Competitive SEO analysis
- Content optimization strategy

## Learn More

- **Hyperbrowser Documentation:** [https://docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- **Hyperbrowser Discord:** [https://discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- **Support:** info@hyperbrowser.ai

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
