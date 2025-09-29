# Crypto News Bot

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

An intelligent cryptocurrency news aggregator that automatically scrapes, summarizes, and delivers breaking crypto news to your Slack workspace using AI-powered analysis.

## Features

- **Smart News Scraping**: Automatically scrapes content from top crypto news sources using Hyperbrowser
- **AI-Powered Summaries**: Uses OpenAI GPT-4o-mini to generate concise, impactful news summaries
- **Scheduled Updates**: Daily digest at 9 AM + periodic updates throughout the day (1 PM, 5 PM, 9 PM)
- **Change Detection**: Intelligent content comparison to avoid spam notifications
- **Slack Integration**: Seamless delivery to your Slack workspace via webhooks
- **Caching System**: Efficient content caching to minimize API calls and track changes

## News Sources

- **CoinDesk** - Leading cryptocurrency news and analysis
- **Decrypt** - Blockchain and crypto technology coverage
- **Cointelegraph** - Comprehensive crypto market news

## Get an API Key

**Get your Hyperbrowser API key** at https://hyperbrowser.ai

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hyperbrowser API key
- OpenAI API key
- Slack workspace with webhook access

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
export HYPERBROWSER_API_KEY="your_api_key_here"
export OPENAI_API_KEY="your_openai_api_key_here"
export SLACK_WEBHOOK_URL="your_slack_webhook_url_here"

# Run the bot
npx tsx crypto-news-bot.ts
```

## Environment Variables

Create a `.env` file in the project root:

```bash
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

### Getting API Keys

**Hyperbrowser API Key**
- Sign up at [hyperbrowser.ai](https://hyperbrowser.ai)
- Navigate to your dashboard
- Generate an API key

**OpenAI API Key**
- Visit [OpenAI Platform](https://platform.openai.com/)
- Create an account and navigate to API keys
- Generate a new API key

**Slack Webhook URL**
- Go to your Slack workspace settings
- Navigate to **Apps** → **Custom Integrations** → **Incoming Webhooks**
- Create a new webhook for your desired channel
- Copy the webhook URL

## Usage

### Run Once
```bash
npx tsx crypto-news-bot.ts
```

The bot will immediately fetch and post news, then continue running on the scheduled intervals.

## Schedule

The bot runs automatically on the following schedule:

- **Daily Digest**: Every day at 9:00 AM (always posts)
- **News Updates**: At 1:00 PM, 5:00 PM, and 9:00 PM (only when significant changes detected)

## How It Works

1. **Scraping**: Uses Hyperbrowser SDK to scrape content from crypto news websites in markdown format
2. **Processing**: Extracts relevant articles using `scrape.startAndWait()` with stealth mode and captcha solving
3. **Analysis**: OpenAI GPT-4o-mini analyzes content for significant changes and generates summaries
4. **Delivery**: Posts formatted summaries to your Slack channel via webhook
5. **Caching**: Stores content in `crypto_news_cache.json` to enable intelligent change detection

## Sample Output

The bot posts messages to Slack in this format:

```
🚨 Daily Crypto Digest

• Bitcoin Surges Past $45K: Major institutional adoption drives price momentum
• Ethereum 2.0 Staking Rewards: New mechanism increases validator participation
• SEC Crypto Regulations: Latest guidance impacts DeFi protocol compliance
• Altcoin Season Indicators: Market analysis shows potential rotation incoming
```

Updates throughout the day use the format:
```
🔄 Crypto News Update

• [Recent news items when significant changes are detected]
```

## Configuration

### Customizing News Sources

Edit the `sources` array in `crypto-news-bot.ts`:

```typescript
const sources = [
  "https://www.coindesk.com",
  "https://decrypt.co",
  "https://cointelegraph.com",
  // Add your preferred crypto news sources
];
```

### Adjusting Schedule

Modify the cron expressions at the bottom of `crypto-news-bot.ts`:

```typescript
// Daily digest at 9 AM
cron.schedule("0 9 * * *", () => main(true));

// Updates at 1 PM, 5 PM, 9 PM
cron.schedule("0 13,17,21 * * *", () => main());
```

### Customizing AI Prompts

Update the `SYSTEM_PROMPT` variable to change how news is summarized:

```typescript
const SYSTEM_PROMPT = `Your custom summarization instructions here...`;
```

## Project Structure

```
crypto-news-bot/
├── crypto-news-bot.ts       # Main application logic
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .env                    # Environment variables (create this)
├── crypto_news_cache.json  # Auto-generated cache file
└── README.md               # This file
```

### Architecture

Single-file TypeScript implementation (~117 LOC):

- **Hyperbrowser SDK**: Web scraping via `scrape.startAndWait()` with stealth mode and captcha solving
- **OpenAI GPT-4o-mini**: AI-powered summarization and change detection
- **node-cron**: Scheduled task execution
- **File-based caching**: Persistent content storage for change detection
- **Slack webhooks**: Team notifications

## API Reference

```typescript
import { Hyperbrowser } from "@hyperbrowser/sdk";
import OpenAI from "openai";

// Initialize clients
const client = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY!,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

// Scrape news content
const scrape = await client.scrape.startAndWait({
  url: "https://www.coindesk.com",
  sessionOptions: {
    solveCaptchas: true,
    useStealth: true
  },
  scrapeOptions: {
    formats: ["markdown"],
    includeTags: ["article", "main"],
    excludeTags: ["img"]
  },
});

// Generate summary with OpenAI
const chat = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: markdownContent },
  ],
});
```

## Dependencies

- **@hyperbrowser/sdk** (^0.51.0) - Browser automation and web scraping
- **openai** (^5.7.0) - OpenAI API client for AI summaries
- **axios** (^1.10.0) - HTTP client for Slack webhooks
- **node-cron** (^4.1.1) - Task scheduling
- **dotenv** (^16.5.0) - Environment variable management
- **typescript** (^5.8.3) - TypeScript support

## Troubleshooting

### Common Issues

**Import Errors**
Make sure all dependencies are installed:
```bash
npm install
```

**API Rate Limits**
The bot includes intelligent caching to minimize API calls. Cached content is stored in `crypto_news_cache.json`.

**Slack Delivery Issues**
- Verify your webhook URL is correct
- Ensure the channel permissions allow bot posts
- Test your webhook with a curl command

**Bot Not Running**
The bot runs continuously once started. Ensure your terminal/process stays active or deploy to a server.

### Getting Help

- Check the [Hyperbrowser documentation](https://docs.hyperbrowser.ai)
- Join the [Discord community](https://discord.gg/zsYzsgVRjh)
- Email support: info@hyperbrowser.ai

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
