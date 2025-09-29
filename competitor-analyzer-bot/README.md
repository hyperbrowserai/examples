# Competitor Analyzer Bot

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

> An intelligent competitive analysis tool that scrapes competitor websites and generates AI-powered insights comparing features, pricing, and unique value propositions.

## What It Does

Automate your competitive intelligence workflow with:

- **Automated Web Scraping** - Extract clean content from any competitor website
- **AI-Powered Analysis** - GPT-4 identifies headlines, features, pricing, and USPs
- **Structured Insights** - Get consistent, comparable data across all competitors
- **Interactive CLI** - Simple prompts guide you through the analysis process
- **Report Generation** - Timestamped markdown reports for easy sharing and archival

## Quick Start

### 1. Get API Keys

**Hyperbrowser API Key:** Sign up at [https://hyperbrowser.ai](https://hyperbrowser.ai)

**OpenAI API Key:** Get one at [https://platform.openai.com](https://platform.openai.com)

### 2. Installation

```bash
cd competitor-analyzer-bot
npm install
```

### 3. Environment Setup

Create a `.env` file in the project root:

```env
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the Analyzer

```bash
npm start
```

## Usage

### Interactive Mode

The bot prompts you to enter competitor URLs one by one:

```bash
npm start
```

**Example Session:**

```
🚀 Welcome to Competitor Analyzer Bot!
📝 Please enter 2 competitor website URLs to compare
💡 You can enter URLs with or without https:// (we'll add it automatically)
💡 Type 'quit' to exit

Enter URL 1 of 2 (or 'quit'): stripe.com
✅ Added: https://stripe.com

Enter URL 2 of 2 (or 'quit'): square.com
✅ Added: https://square.com

✅ Got 2 URLs. Starting analysis...

🔎 Scraping: https://stripe.com
✅ Successfully scraped: https://stripe.com

🔎 Scraping: https://square.com
✅ Successfully scraped: https://square.com

🤖 Analyzing 2 scraped websites with AI...

📊 COMPETITOR ANALYSIS REPORT
================================

🧩 https://stripe.com
Headline: Online payment processing for internet businesses
Features: Accept payments, Send payouts, Automate financial processes, Built-in fraud prevention
Pricing: Pay as you go pricing - 2.9% + 30¢ per successful card charge
USP: Complete payment platform with developer-friendly APIs and global reach

🧩 https://square.com
Headline: Tools to run and grow your business
Features: Point of Sale, Online Store, Invoices, Marketing tools, Team management
Pricing: Free plan available, 2.6% + 10¢ per transaction
USP: All-in-one commerce solution designed for small businesses and sellers

✅ Report saved to competitor-report-2025-09-29T14-30-00-000Z.md
```

### Alternative Commands

```bash
# Development mode
npm run dev

# Direct execution with tsx
npx tsx competitor-analysis.ts

# Build TypeScript
npm run build
```

## Features

### Smart URL Handling
- Automatically adds `https://` protocol if missing
- Validates URL format before processing
- Graceful error handling for invalid URLs
- Type 'quit' anytime to exit

### Robust Web Scraping
- Uses Hyperbrowser SDK for reliable content extraction
- Converts websites to clean markdown format
- Handles JavaScript-heavy sites and SPAs
- Continues analysis even if some sites fail

### AI-Powered Insights
- **GPT-4o** extracts structured competitive intelligence
- **Zod schemas** ensure consistent, validated output format
- Identifies key differentiators automatically
- Structured data includes:
  - Main headline/value proposition
  - Core features list
  - Pricing model summary
  - Unique Selling Proposition (USP)

### Report Generation
- **Console output** for immediate review
- **Markdown files** with ISO timestamps for archival
- Easy to share via Slack, email, or documentation
- Structured format enables further processing

## Output Format

### Console Report

```
📊 COMPETITOR ANALYSIS REPORT
================================

🧩 https://competitor1.com
Headline: Their main value proposition
Features: Feature A, Feature B, Feature C
Pricing: Pricing model summary
USP: What makes them unique

🧩 https://competitor2.com
Headline: Their main value proposition
Features: Feature X, Feature Y, Feature Z
Pricing: Pricing model summary
USP: What makes them unique
```

### Generated File

`competitor-report-2025-09-29T14-30-00-000Z.md`

```markdown
# Competitor Analysis Report

Generated on: 9/29/2025, 2:30:00 PM

🧩 https://competitor1.com
Headline: Their main value proposition
Features: Feature A, Feature B, Feature C
Pricing: Pricing model summary
USP: What makes them unique

🧩 https://competitor2.com
Headline: Their main value proposition
Features: Feature X, Feature Y, Feature Z
Pricing: Pricing model summary
USP: What makes them unique
```

## Project Structure

```
competitor-analyzer-bot/
├── competitor-analysis.ts          # Main application logic
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── .env                            # Environment variables (create this)
├── competitor-report-*.md          # Generated reports (timestamped)
└── README.md                       # This file
```

## How It Works

1. **User Input** - Interactive CLI prompts for 2 competitor URLs
2. **URL Validation** - Normalizes and validates each URL
3. **Web Scraping** - Hyperbrowser extracts content as markdown
4. **AI Analysis** - OpenAI GPT-4o processes content with structured output
5. **Report Generation** - Formats insights and saves to markdown file

## Use Cases

**Product Managers:**
- Compare feature sets across competitors
- Track pricing changes over time
- Identify market positioning gaps

**Marketing Teams:**
- Analyze competitor messaging and USPs
- Research value proposition differentiation
- Gather insights for positioning strategy

**Sales Teams:**
- Prepare competitive battle cards
- Understand competitor pricing models
- Identify competitive advantages

**Startups:**
- Market research and competitive landscape analysis
- Feature benchmarking for roadmap planning
- Pricing strategy research

## Troubleshooting

### Common Issues

**Missing API Keys:**
```bash
# Verify your .env file exists and contains both keys
cat .env
```

**Import Errors:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Scraping Failures:**
- Some websites block automated scraping
- Try different competitor URLs
- Check Hyperbrowser API quota limits

**TypeScript Errors:**
```bash
# Ensure TypeScript dependencies are installed
npm install --save-dev @types/node typescript
```

## Dependencies

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)** - Web scraping and browser automation
- **[openai](https://www.npmjs.com/package/openai)** - OpenAI API client with GPT-4 support
- **[zod](https://www.npmjs.com/package/zod)** - TypeScript-first schema validation
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management
- **[readline](https://nodejs.org/api/readline.html)** - Built-in Node.js for CLI input

## Requirements

- **Node.js** 18+ or later
- **TypeScript** 5.0+ (installed via npm)
- **Hyperbrowser API Key** (get at [hyperbrowser.ai](https://hyperbrowser.ai))
- **OpenAI API Key** (get at [platform.openai.com](https://platform.openai.com))

## Learn More

- **Hyperbrowser Documentation:** [https://docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- **Hyperbrowser Discord:** [https://discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- **Support:** info@hyperbrowser.ai

---

**Ready to analyze your competition? Get started in minutes!**
