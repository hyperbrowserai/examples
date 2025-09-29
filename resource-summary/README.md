**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# Resource Summary

A lightweight CLI tool that analyzes webpage resources and structure using Hyperbrowser's scraping API. Get instant insights into images, links, scripts, stylesheets, and page architecture - with optional AI-powered analysis for deeper understanding.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Quick Resource Analysis**: Counts images, links, scripts, and stylesheets from page content
- **AI-Powered Mode**: Uses Hyperbrowser Browser Use agent for detailed page structure analysis
- **Performance Insights**: Identifies potential performance issues in advanced mode
- **Beautiful CLI Output**: Color-coded results with icons for easy reading
- **Dual Analysis Modes**: Choose between fast basic analysis or comprehensive AI-powered inspection

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install**: `npm install`
3. **Configure**: Add `HYPERBROWSER_API_KEY` to `.env`
4. **Run**: `npx tsx index.ts --url https://example.com`

## Installation

```bash
# Install dependencies
npm install

# Set environment variable
export HYPERBROWSER_API_KEY="your_hyperbrowser_api_key"

# Run basic analysis
npx tsx index.ts --url https://example.com
```

## Usage Examples

### Basic Resource Analysis (Fast)
```bash
npx tsx index.ts --url https://example.com
```
Output:
```
🔍 Analyzing https://example.com…
⚡ Running basic content analysis...

📊 Resource Summary:
────────────────────────────────────────
🖼️  Images        12
🔗 Links         45
📜 Scripts       8
🎨 Stylesheets   3
────────────────────────────────────────
📄 Content length: 15,432 characters
```

### Advanced AI-Powered Analysis
```bash
npx tsx index.ts --url https://github.com --mode advanced
```
Uses Hyperbrowser's Browser Use agent to:
- Count all visible images on the page
- Count all links
- Identify external scripts and stylesheets
- Analyze page structure (headers, sections)
- Provide performance observations

## CLI Options

```bash
npx tsx index.ts --url <url> [--mode <basic|advanced>]

Options:
  --url <url>           Page URL to analyze (required)
  --mode <mode>         Analysis mode: basic or advanced (default: basic)
  --help                Show help
```

## Analysis Modes

### Basic Mode (Default)
- **Speed**: Fast - completes in seconds
- **Method**: Uses Hyperbrowser's `scrape.startAndWait()` to fetch markdown content
- **Analysis**: Counts resources using regex pattern matching
- **Best For**: Quick audits, automated monitoring, batch URL processing

### Advanced Mode
- **Speed**: Slower - requires browser automation
- **Method**: Uses Hyperbrowser's Browser Use agent for interactive page inspection
- **Analysis**: AI-powered examination of live page DOM and resources
- **Best For**: In-depth analysis, performance auditing, detailed page structure review

## Environment Variables

Create a `.env` file or export this variable:

```bash
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key  # Get at https://hyperbrowser.ai
```

## How It Works

1. **URL Input**: Accepts target webpage URL via CLI flag
2. **Mode Selection**: Routes to basic (scrape-based) or advanced (agent-based) analysis
3. **Data Collection**:
   - Basic: Uses Hyperbrowser SDK's `scrape.startAndWait()` to fetch markdown
   - Advanced: Uses `agents.browserUse.startAndWait()` with AI task instructions
4. **Resource Counting**: Analyzes content for images, links, scripts, and stylesheets
5. **Output Formatting**: Displays results with color-coded icons and formatting

## Code Structure

The project consists of a single TypeScript file with modular functions:

- **`main()`** - Entry point, initializes Hyperbrowser client and routes to analysis mode
- **`runBasicAnalysis()`** - Performs fast content-based resource counting
- **`runAdvancedAnalysis()`** - Uses Browser Use agent for AI-powered analysis with fallback
- **`analyzeContent()`** - Regex-based resource counting from markdown content
- **`getResourceIcon()`** - Returns emoji icons for resource types
- **`getResourceColor()`** - Returns chalk color functions for resource types

## Use Cases

**Perfect for**: SEO auditing, page weight analysis, resource optimization, performance monitoring, competitive analysis, web scraping validation.

## Technical Stack

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)**: Web scraping and browser automation
- **yargs**: CLI argument parsing
- **chalk**: Terminal output formatting
- **dotenv**: Environment variable management
- **TypeScript**: Type-safe development

## Development

```bash
# Run with TypeScript directly
npx tsx index.ts --url <url>

# Add to package.json scripts
npm start -- --url <url> --mode advanced
```

---

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow [@hyperbrowser](https://x.com/hyperbrowser) 