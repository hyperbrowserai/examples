**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# hb-predict

Tech signal detection and prediction CLI. Scrapes Hacker News and Reddit to identify emerging tech trends, scores them using sophisticated algorithms, and generates AI-powered predictions.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install**: `npm install`
3. **Configure**: Add `HYPERBROWSER_API_KEY` to `.env` (optional: `OPENAI_API_KEY` for AI predictions)
4. **Run**: `npm run dev`

## Usage

```bash
# Basic AI mode analysis (default)
npm run dev

# Custom analysis with specific subreddits
npx ts-node hb-predict.ts --mode ai --subs r/MachineLearning,r/LocalLLaMA

# Different mode presets
npx ts-node hb-predict.ts --mode crypto --window 48h --top 15

# Custom output directory
npx ts-node hb-predict.ts --mode devtools --out ./results
```

## Features

✨ **Multi-source scraping** with Hyperbrowser SDK (Hacker News + Reddit)
🎯 **Intelligent scoring** using velocity, cross-source, and impact signals
🧠 **Smart clustering** with similarity detection and keyword extraction
🤖 **AI-powered predictions** via OpenAI (with heuristic fallback)
📊 **Multiple outputs**: Markdown reports, JSONL events, JSON clusters

## CLI Options

```bash
npx ts-node hb-predict.ts [OPTIONS]

Options:
  --mode ai|crypto|devtools|fintech      # Preset configurations (default: ai)
  --subs r/MachineLearning,r/LocalLLaMA  # Custom subreddits to scan
  --window 24h                           # Time window (format: 24h, 48h, etc.)
  --top 10                               # Number of predictions (default: 10)
  --out ./oracle                         # Output directory (default: ./oracle)
```

### Mode Presets
- **ai**: r/MachineLearning, r/LocalLLaMA, r/artificial
- **crypto**: r/CryptoCurrency, r/bitcoin, r/ethereum
- **devtools**: r/programming, r/webdev, r/javascript
- **fintech**: r/fintech, r/investing, r/startups

## Output Files

The tool generates three output files in the specified directory (default: `./oracle/`):

### `predictions.md` - Human-Ready Report
Markdown file with ranked predictions, confidence scores, and citations.

### `events.jsonl` - Raw Scored Events
JSONL file with all scraped events and their computed scores.

### `clusters.json` - Grouped Analysis
JSON file with clustered events, keywords, and predictions.

## How It Works

1. **Scrape**: Fetches latest posts from Hacker News and configured Reddit subreddits using Hyperbrowser SDK
2. **Score**: Calculates signal strength based on points, impact keywords, and cross-platform mentions
3. **Cluster**: Groups similar events using text similarity (70%+ word overlap)
4. **Predict**: Generates predictions using OpenAI (if available) or heuristic fallback
5. **Export**: Outputs markdown reports, JSONL events, and JSON clusters

### Scoring Algorithm
- **Base Score**: Normalized points (capped at 100)
- **Impact Bonus**: +0.3 for keywords like "launch", "funding", "released"
- **Cross-Source Bonus**: +0.2 when same domain appears on multiple platforms

## Examples

```bash
# Monitor AI trends with 48h lookback
npx ts-node hb-predict.ts --mode ai --window 48h --top 15

# Track crypto markets
npx ts-node hb-predict.ts --mode crypto --window 12h

# Custom subreddit analysis
npx ts-node hb-predict.ts --subs r/rust,r/golang --top 5
```

## Use Cases

**Perfect for**: Tech VCs spotting investment opportunities, product teams tracking trends, market researchers monitoring competitors, content creators finding data-driven topics, and developers staying ahead of the curve.

---

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow @hyperbrowser
