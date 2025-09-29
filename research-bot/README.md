**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# Research Bot

Automated competitive intelligence for founders. Monitor competitor websites, detect meaningful changes, and get AI-powered insights delivered to Slack. Perfect for tracking pricing updates, product launches, and strategic moves.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Smart Change Detection**: SHA256 hashing to catch real content changes
- **AI-Powered Analysis**: OpenAI summarization with founder-focused insights
- **Priority Classification**: P0/P1/P2 tagging for actionable intelligence
- **Automated Scheduling**: Built-in cron scheduler respects `cadence_hours` config
- **Hyperbrowser Powered**: Reliable web scraping with official SDK
- **Slack Integration**: Real-time notifications via webhooks
- **Concurrent Processing**: Efficient batch processing with timeouts
- **Group Filtering**: Monitor specific competitor sets or pricing pages

## Quick Start

1. **Get your API keys**:
   - Hyperbrowser: https://hyperbrowser.ai
   - OpenAI: https://platform.openai.com
2. **Install**: `npm install`
3. **Configure**: Copy `.env.example` to `.env` and add your API keys
4. **Run**: `npm run start:once` or `npm run start:continuous`

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Run once
npm run start:once

# Run continuously (respects cadence_hours from config.yaml)
npm run start:continuous
```

## Environment Variables

Create a `.env` file with the following:

```bash
HYPERBROWSER_API_KEY=your_hyperbrowser_key_here  # Get at https://hyperbrowser.ai
OPENAI_API_KEY=your_openai_key_here              # Get at https://platform.openai.com
OPENAI_MODEL=gpt-4o-mini                         # Optional (default: gpt-4o-mini)
SLACK_WEBHOOK_URL=your_slack_webhook_url_here    # Optional
```

## Configuration

Edit `config.yaml` to set up monitoring:

```yaml
cadence_hours: 3  # How often to run in continuous mode
notify:
  slack_webhook: "${SLACK_WEBHOOK_URL}"
urls:
  - id: "competitor_pricing"
    group: "pricing"
    url: "https://competitor.com/pricing"
  - id: "startup_blog" 
    group: "competitors"
    url: "https://startup.com/blog"
  - id: "hacker_news"
    group: "tech"
    url: "https://news.ycombinator.com"
rules:
  taggers:
    - pattern: "(price|pricing|usd|₹|per month|annual)"
      tag: "pricing"
    - pattern: "(hiring|careers|role|job)"
      tag: "hiring"
    - pattern: "(release|launched|beta|v\\d|roadmap)"
      tag: "product"
```

## Usage Examples

```bash
# Monitor all URLs once
npm run start:once

# Continuous monitoring (runs every cadence_hours)
npm run start:continuous

# Filter by group
tsx agent.ts --group pricing --once
tsx agent.ts --group competitors --continuous

# Monitor specific group continuously
tsx agent.ts --group tech --continuous
```

## Use Cases

Perfect for founders who need to:

- **Track Competitor Pricing**: Get alerted when rivals change pricing strategy
- **Monitor Product Launches**: Stay ahead of new feature releases
- **Follow Industry News**: Auto-summarize relevant blog posts and announcements
- **Watch Hiring Patterns**: Detect when competitors scale specific teams
- **Monitor Legal Changes**: Track ToS, privacy policy, compliance updates

**Perfect for**: Competitive intelligence, market research, product strategy, growth engineering.

## Output

Reports saved to `.data/reports/` as Markdown with:

- **Executive Summary**: AI-generated monitoring plan and priorities
- **Change Analysis**: Bullet-point summaries of what changed
- **Impact Assessment**: Founder-focused business implications  
- **Priority Levels**: P0 (critical), P1 (important), P2 (monitor)
- **Smart Tagging**: Auto-categorization (pricing, product, hiring, etc.)

## API Reference

Uses **Hyperbrowser's official API methods**:

```typescript
// Fast web scraping with Hyperbrowser
const result = await hb.scrape.startAndWait({
  url: url
});

// Real data analysis with OpenAI
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent }
  ]
});
```

## How It Works

1. **Web Scraping**: Uses Hyperbrowser SDK's `scrape.startAndWait()` to fetch page content
2. **Change Detection**: Compares SHA256 hashes of content to detect changes
3. **AI Analysis**: Routes detected changes to OpenAI with founder-focused prompts
4. **Priority Classification**: Automatically tags changes as P0/P1/P2 based on business impact
5. **Smart Tagging**: Regex-based categorization (pricing, hiring, product, etc.)
6. **Report Generation**: Creates markdown reports with executive summaries
7. **Notifications**: Sends alerts to Slack when changes are detected

## Architecture

Single-file TypeScript implementation (`agent.ts`, ~270 LOC):

- **Hyperbrowser SDK**: Fast web scraping via `scrape.startAndWait()`
- **OpenAI Integration**: GPT-4o-mini for intelligent summarization
- **Concurrent Processing**: Batch processing with 4-URL concurrency
- **Timeout Protection**: 60-second per-URL timeout with graceful failures
- **State Management**: JSON snapshots in `.data/snapshots/` for change detection
- **Cron Scheduling**: Built-in node-cron for automated monitoring
- **YAML Configuration**: Flexible config file for URLs, groups, and rules

## Technical Stack

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)**: Web scraping and automation
- **OpenAI GPT-4o-mini**: AI-powered content analysis and summarization
- **node-cron**: Automated scheduling for continuous monitoring
- **YAML**: Human-friendly configuration format
- **TypeScript**: Type-safe development with ES modules

## Development

```bash
# Development mode with tsx
npm run start

# Run once
npm run start:once

# Continuous mode
npm run start:continuous

# Build TypeScript
npm run build
```

---

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow [@hyperbrowser](https://x.com/hyperbrowser)