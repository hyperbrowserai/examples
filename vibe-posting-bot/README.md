# Vibe Posting Bot

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

> An intelligent social media bot that automatically scrapes tech news sources, detects new content, and creates authentic, human-like posts for Typefully.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Hyperbrowser](https://img.shields.io/badge/Hyperbrowser-00FF88?style=flat)](https://hyperbrowser.ai)
[![OpenAI](https://img.shields.io/badge/OpenAI-000000?style=flat&logo=openai&logoColor=white)](https://openai.com)

---

## What It Does

Transform your social media presence with an AI-powered bot that:

🕐 **Automated Scheduling** - Runs on a cron schedule (default: every 3 hours)
🔍 **Smart Change Detection** - Only posts when new content is detected using content hashing
🎭 **Multiple Personalities** - Choose from founder, dev, investor, or casual vibes
📝 **Typefully Integration** - Automatically creates drafts in your Typefully account
🎯 **Authentic Voice** - Uses GPT-4 with advanced prompts to sound human, not robotic
🧪 **Dry Run Mode** - Test the bot without actually posting
🔄 **Content Tracking** - Maintains state to avoid duplicate posts

---

## Quick Start

### 1. Get API Keys

You'll need three API keys to run this bot:
- **Hyperbrowser API key** - Get one at [hyperbrowser.ai](https://hyperbrowser.ai)
- **OpenAI API key** - Get one at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Typefully API key** - Get one at [typefully.com/settings/api](https://typefully.com/settings/api)

### 2. Installation

```bash
cd vibe-posting-bot
npm install
```

### 3. Environment Setup

Create a `.env` file in the project directory:

```bash
# Required API Keys
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
TYPEFULLY_API_KEY=your_typefully_api_key_here
```

**Note:** All three API keys are required for the bot to function properly.

---

## Usage

### Quick Start Examples

```bash
# Run with default settings (founder vibe, every 3 hours)
npm run start

# Test without posting (dry run mode)
npm run dry-run

# Different personality vibes
npm run founder     # Tech founder perspective
npm run dev-vibe    # Developer perspective
npm run investor    # VC/investor perspective
npm run casual      # Casual tech enthusiast
```

### Advanced Usage

```bash
# Custom cron schedule (every hour)
npm run dev -- --schedule "0 * * * *"

# Different tone formats
npm run dev -- --tone thread    # Thread format
npm run dev -- --tone one-liner # Single tweet (default)

# Combine multiple options
npm run dev -- --vibe dev --tone thread --schedule "0 */2 * * *"

# Dry run with custom settings
npm run dev -- --vibe investor --dryRun
```

---

## Monitored Sources

The bot monitors these tech news sources by default:

- **[Anthropic News](https://www.anthropic.com/news)** - Latest from Anthropic/Claude
- **[OpenAI Blog](https://openai.com/blog)** - OpenAI announcements and research
- **[Google DeepMind](https://deepmind.google/technology/)** - DeepMind technology updates
- **[Hugging Face Blog](https://huggingface.co/blog)** - Open source AI/ML developments
- **[Hacker News](https://news.ycombinator.com/)** - Tech community discussions

You can customize these URLs by editing the `urls` array in `vibe-posting-bot.ts`.

---

## How It Works

1. **Content Scraping**: Uses Hyperbrowser SDK to scrape configured URLs and extract markdown content
2. **Change Detection**: Generates SHA-256 content hashes and compares with previously seen content stored in `seen-content.json`
3. **AI Generation**: When new content is detected, uses GPT-4 with personality-specific prompts to generate authentic tweets
4. **Draft Creation**: Posts generated tweets as drafts to Typefully for your review
5. **State Management**: Updates the seen content file to prevent duplicate posts
6. **Continuous Monitoring**: Runs on a cron schedule (default: every 3 hours)

---

## Customization

### Adding New Sources

Edit the `urls` array in `vibe-posting-bot.ts` (line 29):

```typescript
const urls = [
  "https://your-new-source.com/blog",
  "https://www.anthropic.com/news",
  // ... other URLs
];
```

### Creating Custom Vibes

Add new personality types to the `SYSTEM_PROMPTS` object in `vibe-posting-bot.ts` (starting at line 52). Each vibe should include:
- Multiple prompt variations (for variety and to avoid repetition)
- Clear style guidelines
- Example tone and formatting instructions

```typescript
const SYSTEM_PROMPTS = {
  your_custom_vibe: [
    `Your first prompt variation with style guidelines...`,
    `Your second prompt variation...`,
    // Add 2-3 variations per vibe
  ],
  // ... other vibes
};
```

### Adjusting the Temperature

The bot uses GPT-4 with `temperature: 0.8` for variety (line 356). You can adjust this:
- Lower (0.3-0.5): More consistent, predictable output
- Higher (0.8-1.0): More creative, varied output

---

## Generated Files

- **`seen-content.json`** - Tracks content hashes and last-seen timestamps to prevent duplicate posts
- **Console logs** - Colored terminal output with timestamps, status updates, and generated tweets

---

## Pro Tips

- **Start with dry run** - Use `--dryRun` flag to test the bot without actually posting
- **Review before publishing** - The bot creates drafts in Typefully, you control what gets published
- **Multiple prompt variations** - Each vibe has 3 different prompts that rotate for variety
- **Change detection only** - Content is only processed when new updates are detected
- **Graceful shutdown** - Press `Ctrl+C` to stop the bot gracefully
- **Check logs** - Monitor console output for scraping status and generated tweets

---

## Cron Schedule Format

The `--schedule` parameter uses standard cron syntax for scheduling the bot runs:

```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
# │ │ │ │ │
# * * * * *
```

**Common Examples:**

```bash
"0 */3 * * *"    # Every 3 hours (default)
"0 9 * * *"      # Every day at 9 AM
"0 9,17 * * *"   # Every day at 9 AM and 5 PM
"0 9 * * 1-5"    # Every weekday at 9 AM
"*/30 * * * *"   # Every 30 minutes
"0 */6 * * *"    # Every 6 hours
```

---

## Technical Details

### Dependencies

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)** (v0.51.0) - Browser automation and web scraping
- **[openai](https://www.npmjs.com/package/openai)** (v5.7.0) - GPT-4 integration for tweet generation
- **[axios](https://www.npmjs.com/package/axios)** (v1.10.0) - HTTP client for Typefully API
- **[node-cron](https://www.npmjs.com/package/node-cron)** (v3.0.3) - Cron job scheduling
- **[yargs](https://www.npmjs.com/package/yargs)** (v18.0.0) - CLI argument parsing
- **[zod](https://www.npmjs.com/package/zod)** (v3.25.67) - Schema validation
- **[chalk](https://www.npmjs.com/package/chalk)** (v4.1.2) - Colored terminal output
- **[dotenv](https://www.npmjs.com/package/dotenv)** (v16.5.0) - Environment variable management

### Architecture

**Single-File Design**: The entire bot is contained in `vibe-posting-bot.ts` (442 lines) for simplicity and easy customization.

**Core Components:**

1. **Content Hashing** - Uses SHA-256 to detect content changes
2. **State Persistence** - JSON file stores seen content hashes and timestamps
3. **AI Generation** - Random prompt selection from 3 variations per vibe
4. **Typefully Integration** - REST API calls to create drafts
5. **Cron Scheduling** - Automatic periodic execution
6. **Error Handling** - Continues on individual source failures

**Data Flow:**

```
URLs → Hyperbrowser Scrape → Content Hash → Change Detection
                                                    ↓
Typefully Draft ← GPT-4 Generation ← New Content Detected
```

---

## Use Cases

Perfect for:

- **Tech Influencers** - Stay active on Twitter without manual content curation
- **Developer Advocates** - Share relevant tech news in your brand voice
- **VCs & Investors** - Post about emerging technologies and startups
- **Tech Companies** - Automated social media presence for company news
- **Content Creators** - Generate tweet ideas from multiple sources

---

## Troubleshooting

### API Key Issues
- Ensure all three API keys are set in `.env` file
- Test each API key independently before running the bot

### No New Content Detected
- Check if sources have actually updated since last run
- Delete `seen-content.json` to reset change detection

### Typefully Draft Creation Fails
- Verify your Typefully API key has draft creation permissions
- Check the API response in console logs for error details

### Bot Not Running on Schedule
- Ensure the bot process stays running (use `pm2` or similar for production)
- Verify cron syntax is correct using an online cron validator

---

**Built with [Hyperbrowser](https://hyperbrowser.ai)** | Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates 