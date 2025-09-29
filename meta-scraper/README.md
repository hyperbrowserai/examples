# Meta Scraper

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

AI-powered meta tag extraction and analysis tool. Scrape any website with Hyperbrowser SDK and analyze meta tags (Open Graph, Twitter Cards, SEO metadata) using GPT-4. Perfect for SEO audits, social media preview generation, and competitive analysis.

## Features

- 🌐 **Interactive CLI**: Simple terminal-based URL input
- 🔍 **Smart Scraping**: Uses Hyperbrowser SDK `scrape.startAndWait()` for reliable extraction
- 🤖 **AI Analysis**: GPT-4 powered insights on meta tags and site purpose
- 📊 **Structured Output**: Clean JSON with Open Graph, Twitter Cards, and AI-generated summaries
- ⚡ **Fast**: 30-second timeout with automatic error handling

## Get an API key

- Get your key at [https://hyperbrowser.ai](https://hyperbrowser.ai)
- Get OpenAI key at [https://platform.openai.com](https://platform.openai.com)

## Setup

```bash
npm install
```

Create a `.env` file in this folder:
```bash
HYPERBROWSER_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

## Quick Start

```bash
# Run the interactive tool
npx tsx meta-scrapper.ts

# When prompted, enter a URL:
# URL: https://example.com
```

## What it does

1. **Scrape**: Uses Hyperbrowser SDK to fetch HTML content
2. **Extract**: GPT-4 parses meta tags including:
   - Standard title and description
   - Open Graph tags (og:title, og:description, og:image)
   - Twitter Card metadata
3. **Analyze**: AI generates summary and identifies use cases
4. **Output**: Returns structured JSON to terminal

## Example Output

```json
{
  "url": "https://anthropic.com",
  "title": "Home \\ Anthropic",
  "description": "Anthropic is an AI safety and research company...",
  "ogTitle": "Home \\ Anthropic",
  "ogDescription": "Anthropic is an AI safety and research company...",
  "ogImage": "https://cdn.prod.website-files.com/...",
  "twitterCard": "summary_large_image",
  "summary": "Anthropic is focused on building AI to serve humanity's long-term well-being...",
  "useCases": [
    "AI safety research",
    "Interpretable AI systems",
    "Steerable AI systems"
  ]
}
```

## Use Cases

- **SEO Audits**: Validate meta tags across multiple pages
- **Social Media Previews**: Check how links will appear when shared
- **Competitive Analysis**: Analyze competitor meta strategies
- **Growth Marketing**: Batch analyze landing page metadata
- **Content Management**: Verify meta consistency across site
- **Web Scraping**: Extract structured metadata for datasets

## Architecture

- **`meta-scrapper.ts`**: Main CLI tool with readline interface
- Uses `@hyperbrowser/sdk` for web scraping
- Uses `openai` SDK for GPT-4 analysis
- Automatic JSON extraction with markdown stripping

## Troubleshooting

**"No content received from OpenAI"**
- Check your OpenAI API key is valid
- Ensure you have API credits available

**"Failed to scrape [URL]"**
- Verify your Hyperbrowser API key
- Check if URL is accessible and valid
- Some sites may block automated access

**JSON parsing errors**
- Tool automatically handles markdown code blocks
- Falls back to regex extraction if needed
- Check full error output for debugging

## Notes

- Uses only official Hyperbrowser SDK methods (`@hyperbrowser/sdk`)
- 30-second scrape timeout for performance
- GPT-4o model for accurate meta tag extraction
- Automatically strips markdown formatting from AI responses

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
