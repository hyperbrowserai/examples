# Hyperbrowser Examples

A comprehensive collection of example projects demonstrating various use cases for the [Hyperbrowser SDK](https://docs.hyperbrowser.ai). Each example is a standalone TypeScript project showcasing different patterns for web automation, scraping, and AI-powered workflows.

## 🚀 Quick Start

All examples require a Hyperbrowser API key. Get yours at [Hyperbrowser](https://app.hyperbrowser.ai).

```bash
# Set your API key
export HYPERBROWSER_API_KEY="your-key-here"

# Many examples also require OpenAI
export OPENAI_API_KEY="your-openai-key"

# Navigate to any example and run
cd <example-directory>
npm install
npx tsx <main-file>.ts
```

## 📚 Examples by Category

### 🤖 AI-Powered Agents
- **[agents](./agents)** - Base agent implementations and patterns
- **[agi-newsletter](./agi-newsletter)** - AI newsletter generator
- **[hb-intern-bot](./hb-intern-bot)** - Multi-source tech news aggregator with scoring
- **[research-bot](./research-bot)** - Automated research and data gathering
- **[vibe-posting-bot](./vibe-posting-bot)** - Social media content generation

### 🔍 Web Scraping & Data Extraction
- **[llm-crawl](./llm-crawl)** - CLI tool combining crawling with LLM processing
- **[site2prompt](./site2prompt)** - Convert websites to prompt-ready formats
- **[site2rag](./site2rag)** - Website content for RAG applications
- **[meta-scraper](./meta-scraper)** - Extract metadata from web pages
- **[dataset-assmbler](./dataset-assmbler)** - Build datasets from web sources
- **[oss-web-extractor](./oss-web-extractor)** - Extract open-source project information
- **[Extract-github-analyzer](./Extract-github-analyzer)** - Analyze GitHub repositories

### 🛒 E-commerce & Business
- **[product-search](./product-search)** - Product discovery and comparison
- **[real-estate-finder](./real-estate-finder)** - Real estate listing aggregation
- **[Maps-lead-finder](./Maps-lead-finder)** - Lead generation from Maps data
- **[company-researcher](./company-researcher)** - Company information gathering
- **[competitor-analyzer-bot](./competitor-analyzer-bot)** - Competitive intelligence

### 📰 Content & Media
- **[article-tts](./article-tts)** - Article to text-to-speech conversion
- **[tweet-fetcher](./tweet-fetcher)** - Twitter/X content retrieval
- **[crypto-news-bot](./crypto-news-bot)** - Cryptocurrency news aggregation
- **[Trend-summary](./Trend-summary)** - Trending topics summarization
- **[resource-summary](./resource-summary)** - Web resource summarization

### 🧪 Testing & Analysis
- **[CUA-CTA-Validator](./CUA-CTA-Validator)** - Call-to-action validation
- **[dark-pattern-finder](./dark-pattern-finder)** - Detect deceptive UI patterns
- **[scam-scanner-bot](./scam-scanner-bot)** - Identify potential scams
- **[SEO-Analyzer](./SEO-Analyzer)** - SEO analysis and recommendations
- **[hb-ui-bot](./hb-ui-bot)** - UI testing and validation

### 🗂️ Data Management
- **[ragzip](./ragzip)** - RAG-optimized content packaging
- **[Internet-zip](./Internet-zip)** - Web content archival
- **[dataflow-tree](./dataflow-tree)** - Data flow visualization
- **[site-graph](./site-graph)** - Website structure mapping

### 💬 Chat & Interaction
- **[chat-with](./chat-with)** - Interactive chat with web content
- **[ChatWithWebsite-Scrape](./ChatWithWebsite-Scrape)** - Conversational web scraping
- **[github-chatbot](./github-chatbot)** - GitHub repository chatbot

### 🔧 Utilities & Tools
- **[deep-form](./deep-form)** - Complex form filling automation
- **[changelog-builder](./changelog-builder)** - Automated changelog generation
- **[hb-changelog-tracker](./hb-changelog-tracker)** - Track product changes
- **[hb-headers](./hb-headers)** - HTTP header analysis
- **[hb-predict](./hb-predict)** - Predictive analytics
- **[hyper-train](./hyper-train)** - Model training data collection
- **[link-sniper-bot](./link-sniper-bot)** - Link monitoring and capture
- **[down-detector-bot](./down-detector-bot)** - Service availability monitoring
- **[o3-pro-extractor](./o3-pro-extractor)** - Specialized data extraction

### 📖 Cookbook
- **[cookbook](./cookbook)** - Collection of code recipes and patterns

## 🏗️ Architecture Patterns

### Basic Pattern
Most examples follow this structure:
```typescript
import { Hyperbrowser } from '@hyperbrowser/sdk';

const hbClient = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY
});

// Your automation logic here
```

### Complex Examples
Some examples demonstrate advanced patterns:
- **Pipeline architectures** (hb-intern-bot): scrape → normalize → score → summarize
- **CLI tools** (llm-crawl): argument parsing, multiple output formats
- **Watch modes** (hb-intern-bot): continuous monitoring
- **Multi-source aggregation**: combining data from various APIs

## 📦 Common Dependencies

- `@hyperbrowser/sdk` - Core browser automation
- `@hyperbrowser/agent` - Agent-based automation
- `openai` - OpenAI API integration
- `@langchain/openai` - LangChain integration
- `dotenv` - Environment management
- `typescript` + `tsx`/`ts-node` - TypeScript execution
- `zod` - Schema validation
- `cheerio` - HTML parsing

## 🔑 Environment Variables

Required for all examples:
```bash
HYPERBROWSER_API_KEY=your-hyperbrowser-key
```

Many examples also need:
```bash
OPENAI_API_KEY=your-openai-key
```

Store these in a `.env` file (never commit this file).

## 📝 Development

Each example is independent with its own:
- `package.json` - Dependencies and scripts
- `README.md` - Specific usage instructions
- Entry point (usually `*.ts` file)

Run examples with:
```bash
npm run dev
# or
npx tsx <filename>.ts
```

Build (if applicable):
```bash
npm run build
```

## 🤝 Support

- **Documentation**: [docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- **Discord**: [Join our community](https://discord.gg/zsYzsgVRjh)
- **Email**: [info@hyperbrowser.ai](mailto:info@hyperbrowser.ai)
- **Issues**: Open an issue in this repository

## 📄 License

See [LICENSE](./LICENSE) file for details.

---

**Note**: These examples demonstrate patterns and concepts. For production use, add proper error handling, logging, rate limiting, and security measures.