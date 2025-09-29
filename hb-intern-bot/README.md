# 🤖 hb-intern

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

> AI-powered Research Intern Bots that never sleep. Watch, scrape, analyze, and summarize content from across the web automatically.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Hyperbrowser](https://img.shields.io/badge/Hyperbrowser-00FF88?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMjAiIGZpbGw9IiMwMEZGODgiLz4KPHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIyMCIgeT0iMjAiPgo8L3N2Zz4KPC9zdmc+Cg==&logoColor=white)](https://hyperbrowser.ai)
[![OpenAI](https://img.shields.io/badge/OpenAI-000000?style=flat&logo=openai&logoColor=white)](https://openai.com)

---

## ✨ What It Does

Transform your research workflow with intelligent bots that:

🔍 **Multi-Source Scraping** - Monitor Hacker News, Reddit, Product Hunt, and company blogs  
🧠 **AI-Powered Analysis** - Smart scoring based on velocity, authority, and impact  
📊 **Beautiful Reports** - Generate markdown digests and PDF presentation decks  
💬 **Team Integration** - Send summaries directly to Slack channels  
⏰ **Continuous Monitoring** - Watch mode runs every few hours automatically  
🎯 **Smart Filtering** - Custom include/exclude keywords per bot  

---

## 🚀 Quick Start

### 1. Get an API Key
**Get an API key** at https://hyperbrowser.ai

### 2. Installation
```bash
git clone https://github.com/hyperbrowserai/hyperbrowser-app-examples
cd hb-intern-bot
npm install
npm run build
```

### 3. Environment Setup
```bash
export HYPERBROWSER_API_KEY="hb_your_api_key_here"         # Required
export OPENAI_API_KEY="sk-your_openai_key"                 # Optional - for AI summaries
export SLACK_WEBHOOK_URL="https://hooks.slack.com/..."     # Optional - for Slack alerts
```

**Notes:**
- `HYPERBROWSER_API_KEY` is **required** for web scraping
- `OPENAI_API_KEY` is optional; without it, the bot uses fallback heuristics for summaries
- `SLACK_WEBHOOK_URL` is only needed if using `--slack` flag

### 4. Run Your First Bot
```bash
# Quick demo with top 3 AI stories
npx hb-intern --config demo.config.yaml --top 3 --deck --slack

# Full AI research pipeline
npx hb-intern --config bots.config.yaml --watch 180 --slack
```

---

## 🎬 Demo Output

```bash
🤖 Running bot: AI Daily
🔄 Extracting data from: https://news.ycombinator.com/
✅ Successfully extracted data from: https://news.ycombinator.com/
🔄 Extracting data from: https://www.reddit.com/r/MachineLearning/
✅ Successfully extracted data from: https://www.reddit.com/r/MachineLearning/

[AI Daily] HN(23) Reddit(15) PH(8) Blogs(5)
[AI Daily] → normalized(51)
[AI Daily] → scored(51) 
[AI Daily] → top(10)
[AI Daily] → summarized(10)
[AI Daily] wrote digest.md, events.jsonl, deck.pdf, slack: OK
```

**Generated Files:**
- 📄 `digest.md` - Clean markdown summary for humans
- 📊 `events.jsonl` - Structured data with scores for analysis  
- 🎯 `deck.pdf` - Beautiful presentation slides
- 💬 **Slack notification** sent to your team

---

## ⚙️ Configuration

Create powerful research bots with YAML configs:

```yaml
bots:
  - name: "AI Daily"
    mode: "ai"                           # Preset filters for AI/ML content
    sources:
      hn: true                           # Hacker News front + new pages
      reddit: ["MachineLearning", "LocalLLaMA", "Artificial"]
      producthunt: true                  # Today's launches + trending
      blogs:
        - "https://openai.com/blog"
        - "https://anthropic.com/news"
        - "https://deepmind.google/discover/blog"
    include: ["open source", "launch", "models", "inference"]
    exclude: ["hiring", "recruiting", "spam"]

  - name: "DevTools Watch"  
    mode: "devtools"                     # Developer tools & frameworks
    sources:
      hn: true
      reddit: ["programming", "devops"]
      blogs:
        - "https://github.blog/changelog"
        - "https://vercel.com/changelog"
    include: ["cli", "framework", "library"]
    exclude: ["job", "hiring"]
```

### 🎨 Bot Modes
- **`ai`** - AI/ML developments, models, inference, research
- **`devtools`** - Development frameworks, libraries, CLI tools, DevOps  
- **`startup`** - Startup funding, launches, SaaS products, business

---

## 🛠️ CLI Usage

```bash
npx hb-intern --config <config.yaml> [OPTIONS]
```

| Flag | Description | Example |
|------|-------------|---------|
| `--config` | **Required** YAML config file | `--config bots.config.yaml` |
| `--out` | Output directory | `--out ./reports` |
| `--since` | Time window for content | `--since 48h` |
| `--top` | Number of top events | `--top 15` |
| `--deck` | Generate PDF presentation | `--deck --theme dark` |
| `--slack` | Send to Slack webhook | `--slack` |
| `--watch` | Continuous mode (minutes) | `--watch 180` |
| `--reset` | Clear watch state | `--reset` |

### 💡 Pro Examples

```bash
# 🎯 Quick AI research digest
npx hb-intern --config bots.config.yaml --top 5 --deck

# 🔄 Continuous monitoring with Slack alerts  
npx hb-intern --config bots.config.yaml --watch 180 --slack

# 📊 Deep dive with extended time window
npx hb-intern --config bots.config.yaml --since 7d --top 20 --deck --theme neon

# 🚀 Production deployment
npx hb-intern --config production.yaml --watch 360 --slack --out /var/reports
```

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Data Sources  │ -> │  hb-intern CLI   │ -> │    Outputs      │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • Hacker News   │    │ 🔄 Scraping      │    │ 📄 digest.md    │
│ • Reddit        │    │ 🧠 AI Analysis   │    │ 📊 events.jsonl │
│ • Product Hunt  │    │ ⚡ Scoring       │    │ 🎯 deck.pdf     │
│ • Company Blogs │    │ 📝 Summarization │    │ 💬 Slack alerts │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 🧩 Modular Design

The project follows a clean pipeline architecture:

**Core Modules:**
- **`src/scraper/`** - Source-specific extractors
  - `hn.ts` - Hacker News (front page + new submissions)
  - `reddit.ts` - Multiple subreddit scraper
  - `producthunt.ts` - Product launches + trending
  - `blogs.ts` - Company blog RSS/feed parser

- **`src/pipeline/`** - Event processing pipeline
  - `normalize.ts` - Convert scraped data to unified Event schema
  - `score.ts` - Multi-factor scoring algorithm (velocity + authority + impact)
  - `summarize.ts` - OpenAI-powered summarization with fallback heuristics
  - `deck.ts` - PDF presentation generator with theme support

- **`src/`** - CLI and orchestration
  - `cli.ts` - Command-line argument parsing and validation
  - `main.ts` - Main pipeline orchestrator (scrape → normalize → score → summarize → output)
  - `watch.ts` - Continuous monitoring with state persistence
  - `config.ts` - YAML config loader with bot mode presets
  - `types.ts` - TypeScript interfaces and schemas

**Pipeline Flow:**
1. **Scrape** - Parallel extraction from all enabled sources
2. **Normalize** - Convert to unified Event format, apply time/keyword filters
3. **Score** - Calculate relevance scores with weighted factors
4. **Top N** - Select highest-scoring events
5. **Summarize** - Generate AI summaries (or fallback to title/description)
6. **Output** - Write digest.md, events.jsonl, deck.pdf, send Slack notification

---

## 🌟 Growth Use Cases

**For Startups:**
- 🎯 Monitor competitor launches on Product Hunt
- 📈 Track funding announcements and market trends
- 🚀 Discover viral marketing strategies

**For Developers:**  
- 🔧 Stay updated on new frameworks and tools
- 🐛 Monitor security vulnerabilities and patches
- ⚡ Track performance optimization techniques

**For AI Researchers:**
- 🧠 Follow latest model releases and papers
- 🏃‍♂️ Monitor inference optimization breakthroughs  
- 📊 Track AI company announcements and research

**For VCs/Analysts:**
- 💰 Automated deal flow monitoring
- 📊 Market sentiment analysis from multiple sources
- 🎯 Competitive intelligence automation

---

## 🔧 Advanced Features

### 🎨 PDF Themes
- **`modern`** - Clean, professional slides
- **`dark`** - Dark mode with accent colors  
- **`neon`** - High-contrast cyberpunk theme

### 🧠 Smart Scoring Algorithm

The scoring system uses a weighted multi-factor approach:

```typescript
// Weighted scoring (from src/pipeline/score.ts)
final_score = (velocity * 0.6) + (authority * 0.25) + (impact * 0.15)

// Velocity: Engagement speed with logarithmic scaling
velocity = log(1 + points_per_hour * 10) + 0.2 * log(1 + comments)
  - Points per hour with recency factoring
  - Comment engagement bonus
  - Logarithmic scaling prevents outliers

// Authority: Source and domain reputation
authority = domain_reputation + source_weight + author_score
  - Reputable domains (github.com, arxiv.org, etc.): +0.7
  - Source weights: HN(0.3), Blog(0.4), PH(0.25), Reddit(0.2)
  - Author reputation heuristics: +0.1

// Impact: Keyword relevance and engagement
impact = keyword_matches + engagement_indicators + recency_boost
  - Include keyword matches: +0.2 per match (max 0.8)
  - Impactful words (launch, release, open source): +0.3
  - High engagement (>50 points, >20 comments): +0.3
  - Recent posts (<6h): +0.1
```

### 📊 Watch Mode Intelligence

The watch system provides robust continuous monitoring:

- **Duplicate Detection** - Tracks seen event IDs in `state.json`, never processes duplicates
- **State Persistence** - Maintains `seenIds` set and `lastRun` timestamp across runs
- **Auto Cleanup** - Periodically trims state to last 5,000 IDs (every 10 runs)
- **Graceful Errors** - Individual source failures don't crash the entire pipeline
- **Parallel Scraping** - All sources scraped concurrently for speed
- **Signal Handling** - Clean shutdown on SIGINT/SIGTERM

---

## 🔍 Technical Details

### Event Schema

All scraped content is normalized to a unified Event interface:

```typescript
interface Event {
  id: string;              // Unique identifier (hashed from source+url+title)
  source: 'hn' | 'reddit' | 'ph' | 'blog';
  title: string;
  url: string;             // Link to actual content
  permalink: string;       // Link to discussion/comments
  points: number;
  comments: number;
  author?: string;
  subreddit?: string;      // For Reddit posts
  domain?: string;         // Extracted domain (e.g., "github.com")
  created_at: string;      // ISO timestamp
  summary?: string;        // AI-generated or fallback
  score?: number;          // Calculated relevance score (0-1)
  why_matters?: string;    // Why this event is significant
}
```

### Bot Configuration Modes

The `config.ts` module provides three preset bot modes with sensible defaults:

- **`ai`** - AI/ML content (default: MachineLearning, LocalLLaMA, Artificial subreddits)
- **`devtools`** - Developer tools (default: programming, webdev, devops subreddits)
- **`startup`** - Startup/business (default: startups, entrepreneur subreddits)

Each mode provides default sources, include/exclude keywords that can be overridden in your config YAML.

### Output Files

When you run a bot, it generates:

1. **`digest.md`** - Human-readable markdown summary with top events
2. **`events.jsonl`** - Machine-readable JSONL with full event data + scores
3. **`deck.pdf`** (if `--deck` flag) - PDF presentation slides with theme styling
4. **`state.json`** (watch mode) - Persistent state with seen event IDs and last run timestamp

All files are written to the output directory (default: `./out`, configurable via `--out`).

### Hyperbrowser Integration

The project uses `@hyperbrowser/sdk` for web scraping:

```typescript
import { Hyperbrowser } from '@hyperbrowser/sdk';

const hbClient = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY
});

// Each scraper uses the session API for reliable extraction
const session = await hbClient.session.start({
  url: targetUrl
});
```

### Error Handling

The pipeline is designed for resilience:
- Individual source scraping failures are logged but don't stop execution
- OpenAI API failures fall back to heuristic summaries
- Invalid events are filtered during normalization
- Watch mode continues even if a single run fails

---

## 🤝 Contributing

We welcome contributions! This project demonstrates:
- ✅ **Clean TypeScript architecture** with modular design
- ✅ **Real API integrations** with error handling
- ✅ **Production-ready CLI** with comprehensive options
- ✅ **Modern tooling** - TypeScript, Zod schemas, PDF generation

---

## 📄 License

MIT License - Build amazing things!

---

**Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates.**

> 💡 **Tip:** Set up a cron job with `--watch 180` to get fresh research insights every 3 hours automatically!