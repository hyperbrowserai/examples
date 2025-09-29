**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# Down Detector Bot

AI-powered infrastructure monitoring bot that tracks cloud service outages and sends intelligent Slack alerts only when status changes occur. Automatically checks major cloud providers every hour and notifies you of new outages or recoveries.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. This bot uses Hyperbrowser to reliably scrape DownDetector status pages and OpenAI to intelligently analyze outage patterns.

## Features

- **Smart AI Detection**: Uses GPT-4 to distinguish between minor user reports and real widespread outages
- **Change-Based Alerts**: Only notifies on status changes (new issues or recoveries), not repeated issues
- **Multi-Provider Monitoring**: Tracks AWS, Google Cloud, Cloudflare, and Microsoft Azure
- **Slack Integration**: Sends formatted alerts directly to your Slack channel
- **Automated Scheduling**: Runs hourly checks automatically via cron
- **Status Persistence**: Tracks previous states to avoid duplicate alerts

## Prerequisites

- Node.js (v18 or later)
- TypeScript and ts-node (installed via npm)
- API keys for:
  - **Hyperbrowser**: Get yours at [hyperbrowser.ai](https://hyperbrowser.ai)
  - **OpenAI**: Create at [platform.openai.com](https://platform.openai.com)
  - **Slack Webhook**: Create an incoming webhook for your workspace at [api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the project root:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   SLACK_WEBHOOK_URL=your_slack_webhook_url_here
   ```

3. **Run the bot:**
   ```bash
   npx ts-node down-detector.ts
   ```

## How It Works

1. **Scraping**: Hyperbrowser SDK scrapes DownDetector pages in markdown format for each provider
2. **AI Analysis**: OpenAI GPT-4 analyzes the content with strict criteria to identify real widespread outages
3. **Status Tracking**: Compares current status with previous check results to detect changes
4. **Smart Alerting**: Only sends Slack notifications for:
   - 🚨 **New outages detected** - Service just went down
   - 🎉 **Services recovered** - Previously down service is now operational
   - ⏳ **Ongoing issues** - Already reported, logged but not alerted again

## Monitored Services

- AWS (Amazon Web Services)
- Google Cloud Platform
- Cloudflare
- Microsoft Azure

## Example Output

```
🎯 Monitoring 4 services for outages

🤖 Running AI outage check: 2025-09-29T10:00:00.000Z
✅ AWS is OK
🆕 NEW OUTAGE: Google Cloud
✅ Cloudflare is OK
✅ Microsoft Azure is OK

🚨 NEW OUTAGES DETECTED:
🔴 Google Cloud: Major outage affecting Compute Engine in us-central1 region
```

**Recovery Alert:**
```
🎉 SERVICES RECOVERED:
✅ Google Cloud: Service restored
```

## Configuration

### Adding More Services

Edit the `TARGETS` array in `down-detector.ts` to monitor additional services:

```typescript
const TARGETS = [
  "https://downdetector.com/status/aws-amazon-web-services/",
  "https://downdetector.com/status/google-cloud/",
  "https://downdetector.com/status/your-service/", // Add here
];
```

### Customizing AI Analysis

Modify the `SYSTEM_PROMPT` in `down-detector.ts` to adjust outage detection criteria:

```typescript
const SYSTEM_PROMPT = `
You're analyzing DownDetector pages for ACTIVE WIDESPREAD OUTAGES only.
// Customize criteria here...
`;
```

### Adjusting Check Frequency

Change the cron schedule in `down-detector.ts`:

```typescript
// Current: Every hour at minute 0
cron.schedule("0 * * * *", () => {
  runSmartCheck().catch(console.error);
});

// Example: Every 30 minutes
cron.schedule("*/30 * * * *", () => {
  runSmartCheck().catch(console.error);
});
```

## Code Structure

**Main file**: `down-detector.ts`

Key components:
- `TARGETS` - Array of DownDetector URLs to monitor
- `SYSTEM_PROMPT` - AI instructions for outage detection
- `StatusSchema` - Zod schema for structured AI responses
- `previousStatus` - Map tracking service states across checks
- `checkProviderStatus()` - Scrapes and analyzes a single provider
- `alertSlack()` - Sends formatted alerts to Slack
- `runSmartCheck()` - Main orchestration function

**Dependencies**:
- `@hyperbrowser/sdk` - Web scraping with official SDK
- `openai` - AI-powered outage analysis
- `axios` - Slack webhook HTTP requests
- `node-cron` - Automated scheduling
- `zod` - Schema validation for AI responses
- `dotenv` - Environment variable management

## Important Notes

- The bot runs immediately on start, then every hour via cron
- Status tracking is in-memory, resets on restart
- OpenAI uses `gpt-4o-mini` model with structured output via Zod
- Strict AI criteria minimize false positives from minor user reports
- Slack webhook must be properly configured for alerts to send
- Consider rate limits when adding many services or increasing frequency

---

Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates 