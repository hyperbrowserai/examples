# Changelog Tracker

An automated monitoring tool that tracks updates from tech blogs and sends AI-generated summaries to Slack. Built with [Hyperbrowser](https://hyperbrowser.ai) for reliable web scraping and OpenAI's GPT-4 for intelligent summarization.

## Features

- **Multi-Source Monitoring**: Tracks updates from OpenAI, Anthropic, DeepMind, Y Combinator, HuggingFace, and more
- **Intelligent Scraping**: Uses Hyperbrowser's API to reliably extract content from dynamic websites
- **AI Summarization**: Generates concise, changelog-style summaries using GPT-4o-mini
- **Slack Integration**: Automatically sends formatted notifications when updates are detected
- **Customizable**: Easy to add or remove blog sources

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hyperbrowser API key
- OpenAI API key
- Slack Webhook URL

## Installation

1. Navigate to the project directory:
```bash
cd hb-changelog-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```env
HYPERBROWSER_API_KEY=your_hyperbrowser_key_here
OPENAI_API_KEY=your_openai_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## Getting API Keys

### Hyperbrowser API Key
Get your Hyperbrowser API key at **[hyperbrowser.ai](https://hyperbrowser.ai)**

For documentation and API reference, visit **[docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)**

### OpenAI API Key
1. Visit [OpenAI's platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key

### Slack Webhook URL
1. Go to your Slack workspace settings
2. Navigate to "Apps" > "Incoming Webhooks"
3. Create a new webhook for your desired channel
4. Copy the webhook URL

## Usage

Run the tracker:
```bash
npx tsx changelog.ts
```

Or compile TypeScript first:
```bash
npx tsc
node changelog.js
```

### What It Does

The script will:
1. Iterate through all configured blog URLs
2. Scrape each website using Hyperbrowser's intelligent extraction
3. Pass the scraped content to GPT-4o-mini for summarization
4. Send formatted notifications to your Slack channel for any detected updates

### Example Output

```bash
🔍 Scraping https://openai.com/blog
✅ Update found. Sending to Slack...
🔍 Scraping https://www.anthropic.com/news
⚠️ No updates or failed scrape.
🔍 Scraping https://deepmind.google/discover/blog
✅ Update found. Sending to Slack...
```

## Code Structure

The application consists of a single TypeScript file (`changelog.ts`) with three main functions:

### `scrapeAndSummarize(url: string)`
- Scrapes the target URL using Hyperbrowser SDK
- Configures scraping options to focus on article content
- Sends scraped markdown to OpenAI for summarization
- Returns the AI-generated summary or null if scraping fails

### `notifySlack(text: string, url: string)`
- Posts formatted messages to Slack using the webhook URL
- Includes the source URL and summarized content

### `main()`
- Orchestrates the entire workflow
- Iterates through all configured URLs
- Handles errors and logs progress

## Configuration

### Monitored Blogs

By default, the tool monitors these tech blogs:
- OpenAI Blog
- Anthropic News
- Google DeepMind Blog
- Y Combinator Blog
- HuggingFace Blog

### Adding or Removing Sources

Edit the `urls` array in `changelog.ts`:

```typescript
const urls = [
  "https://openai.com/blog",
  "https://www.anthropic.com/news",
  "https://deepmind.google/discover/blog",
  "https://www.ycombinator.com/blog",
  "https://huggingface.co/blog",
  // Add your own URLs here
];
```

### Customizing Scraping Behavior

Modify the `scrapeOptions` object to adjust what content is extracted:

```typescript
scrapeOptions: {
  formats: ["markdown"],  // Output format
  includeTags: ["article", "main", ".changelog", ".post", ".blog"],  // HTML elements to include
  excludeTags: ["img", "script", "style"],  // HTML elements to exclude
}
```

### Customizing AI Summaries

Modify the `SYSTEM_PROMPT` to change how summaries are generated:

```typescript
const SYSTEM_PROMPT = `You're an AI assistant that summarizes new updates from product or research blogs. Return a crisp, professional changelog-style summary of what's new.`
```

## Scheduling (Optional)

To run this script periodically, you can use:

**Cron (Linux/Mac)**:
```bash
# Run every hour
0 * * * * cd /path/to/hb-changelog-tracker && npx tsx changelog.ts
```

**Task Scheduler (Windows)** or deploy to a cloud function with scheduled triggers.

## Troubleshooting

**Environment variable errors**:
- Ensure all required variables are set in your `.env` file
- Check for typos in variable names

**Scraping failures**:
- Verify your Hyperbrowser API key is valid
- Some websites may require different scraping configurations
- Check the website is publicly accessible

**OpenAI errors**:
- Ensure you have sufficient API credits
- Verify your API key is valid and active

**Slack notification failures**:
- Confirm your webhook URL is correct
- Check the webhook hasn't been revoked
- Verify the target Slack channel exists

## License

ISC
