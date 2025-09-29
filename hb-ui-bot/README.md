# HB UI Bot

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A powerful UI analysis tool that captures website screenshots using Hyperbrowser's official SDK and leverages OpenAI Vision (GPT-4o) for intelligent design analysis and improvement suggestions.

## Features

- **Screenshot Capture**: Uses Hyperbrowser's official scrape API with screenshot format
- **AI Vision Analysis**: OpenAI GPT-4o analyzes screenshots for comprehensive UI/UX insights
- **Color Detection**: Automatically extracts colors from HTML (hex, rgb, rgba)
- **Font Analysis**: Identifies typography choices and font families
- **Smart Suggestions**: AI-powered improvement recommendations
- **Accessibility Review**: Identifies potential accessibility issues
- **Flexible Output**: Human-readable or JSON format
- **Visual Analysis**: Analyzes actual appearance, not just code structure

## What It Does

Instead of just parsing CSS, HB UI Bot captures actual screenshots and uses OpenAI's vision capabilities to provide intelligent analysis of:

- **Visual Design**: Layout, composition, and visual hierarchy
- **Color Schemes**: Actual colors as they appear to users
- **Typography**: Font choices and text readability
- **UI/UX Issues**: Real usability problems visible in screenshots
- **Accessibility**: Visual accessibility concerns
- **Modern Design Trends**: Current best practices and recommendations

## Installation

```bash
npm install
```

## Prerequisites

- Node.js 16+
- TypeScript
- Hyperbrowser API key (get at [hyperbrowser.ai](https://hyperbrowser.ai))
- OpenAI API key (optional, for AI analysis features)

## Configuration

Set up your API keys as environment variables:

```bash
# Required: Hyperbrowser API Key
export HYPERBROWSER_API_KEY="your_hyperbrowser_api_key_here"

# Optional: OpenAI API Key (required for --analyze flag)
export OPENAI_API_KEY="your_openai_api_key_here"
```

Or create a `.env` file in the project root:
```env
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

### Basic Usage (Screenshot + Color/Font Extraction)
```bash
npx ts-node hb-ui-bot.ts --url https://example.com
```

### With AI Visual Analysis
```bash
npx ts-node hb-ui-bot.ts --url https://example.com --analyze
```

### JSON Output
```bash
npx ts-node hb-ui-bot.ts --url https://example.com --json
```

### With Custom API Keys
```bash
npx ts-node hb-ui-bot.ts --url https://example.com --key YOUR_HB_KEY --openai-key YOUR_OPENAI_KEY --analyze
```

## CLI Options

```
-u, --url <url>       Target URL to analyze (required)
-k, --key <key>       Hyperbrowser API key (or use HYPERBROWSER_API_KEY env var)
--openai-key <key>    OpenAI API key (or use OPENAI_API_KEY env var)
--json                Output results in JSON format
-a, --analyze         Use OpenAI Vision to analyze the screenshot
--help                Show help information
```

## Example Output

### Without AI Analysis
```
🔍 Starting scrape job with screenshot...

🎨  Colors (4)
   • #ffffff
   • #000000
   • #1a73e8
   • rgba(255, 0, 0, 0.8)

🖋  Fonts (3)
   • Roboto
   • Arial
   • sans-serif
```

### With AI Visual Analysis
```
🔍 Starting scrape job with screenshot...
🧠 Analyzing UI screenshot with OpenAI Vision...

🎨  Colors (4)
   • #ffffff
   • #000000
   • #1a73e8
   • rgba(255, 0, 0, 0.8)

🖋  Fonts (3)
   • Roboto
   • Arial
   • sans-serif

🧠 AI Visual Analysis & Suggestions:
──────────────────────────────────────────────────
**Visual Summary**: The website features a clean, modern design with a white background and blue accent colors. The layout is well-structured with clear visual hierarchy...

**Colors**: Primary colors include white (#ffffff), dark text (#000000), and blue accent (#1a73e8) creating good contrast...

**Typography**: Uses modern sans-serif fonts with appropriate sizing and spacing...

**UI/UX Issues**: 
1. Some buttons could be more prominent
2. Navigation could be simplified
3. Call-to-action elements need better visibility

**Improvements**: 
1. Increase button sizes and contrast
2. Add more whitespace between sections
3. Implement consistent color scheme throughout

**Accessibility**: Ensure proper alt text for images and improve color contrast ratios...

**Modern Trends**: Consider implementing dark mode toggle, micro-interactions, and mobile-first responsive design...
```

## JSON Output Format

```json
{
  "colors": ["#ffffff", "#000000", "#1a73e8", "rgba(255, 0, 0, 0.8)"],
  "fonts": ["Roboto", "Arial", "sans-serif"],
  "analysis": "Detailed AI analysis of the screenshot...",
  "screenshotAvailable": true
}
```

## How It Works

### 1. Screenshot Capture
Uses Hyperbrowser's official SDK `scrape.startAndWait()` method:
```typescript
const result = await hb.scrape.startAndWait({
  url: targetUrl,
  scrapeOptions: {
    formats: ['screenshot', 'html'],  // Captures both visual and structural data
    timeout: 30000,                    // 30 second timeout
    waitFor: 2000                      // Wait 2s for page to fully render
  }
});
```

### 2. Color & Font Extraction
- **Colors**: Extracted from HTML using regex patterns (hex, rgb, rgba)
- **Fonts**: Parsed from font-family CSS declarations
- Results are deduplicated and returned as arrays

### 3. AI Vision Analysis (Optional)
When `--analyze` flag is used:
- **Model**: OpenAI GPT-4o with vision capabilities
- **Input**: Base64-encoded screenshot + structured analysis prompt
- **Analysis includes**: Visual design, colors, typography, UI/UX issues, improvements, accessibility, and modern design trends
- Screenshot data is automatically converted from URL to base64 if needed

## Architecture

Single TypeScript file (`hb-ui-bot.ts`) with:
- **CLI Framework**: `yargs` for argument parsing
- **Web Scraping**: `@hyperbrowser/sdk` for screenshot capture
- **AI Integration**: `openai` package for GPT-4o vision analysis
- **Terminal UI**: `chalk` for colored output formatting

## Error Handling

The tool provides helpful error messages for common issues:
- Missing or invalid API keys
- Authentication failures
- Screenshot capture problems
- Network timeouts
- Invalid URLs
- OpenAI API errors

## Performance

- Screenshot capture: ~3-5 seconds
- AI analysis (optional): ~2-3 seconds
- Total processing time: 5-10 seconds per URL
- No caching between runs

## License

ISC 