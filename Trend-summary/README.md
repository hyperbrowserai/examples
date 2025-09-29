**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# Trend Summary Tool

Automated trend analysis tool that discovers the top post from Hacker News and finds related discussions on Reddit, providing comprehensive cross-platform summaries of trending topics.

## Features

- Multi-page browser automation using HyperAgent
- Parallel page execution for efficient data gathering
- AI-powered content extraction from Hacker News
- Automated Reddit search for related discussions
- Intelligent summarization of community conversations

## What It Does

This tool demonstrates advanced multi-page browser automation:

1. **Discovers Trending Content** - Opens Hacker News and extracts the top post published today (title, URL, and key information)
2. **Cross-Platform Search** - Simultaneously opens a second browser page to search Reddit for related discussions
3. **Community Analysis** - Finds top posts and comments about the HN topic on Reddit
4. **Intelligent Summarization** - Provides an overall summary of recent conversations and community sentiment

## Prerequisites

- Node.js (v16 or higher recommended)
- API keys for:
  - **Hyperbrowser**: Get yours at [hyperbrowser.ai](https://hyperbrowser.ai)
  - **OpenAI**: Required by HyperAgent for AI-powered browser automation

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Run the tool:**
   ```bash
   npx ts-node TrendSummary.ts
   ```

## Example Output

```
===Starting HyperAgent===

Opening first page...
Executing first task...
First destination found: [Title of top HN post] - [URL] - [Key details]

Opening second page...
Searching for information about [HN post title]... on Reddit
=== Summary of Reddit discussions ===
[AI-generated summary of Reddit conversations, top comments, and community sentiment]

Closing agent...
Agent closed successfully.
```

## How It Works

### Multi-Page Architecture

The tool uses HyperAgent's multi-page capabilities to run parallel browser sessions:

```typescript
// Create agent with multiple page support
const agent = new HyperAgent();

// First page: Hacker News extraction
const page1 = await agent.newPage();
const page1Response = await page1.ai(
  "Open Hacker News front page, find the top post..."
);

// Second page: Reddit search (runs independently)
const page2 = await agent.newPage();
const page2Response = await page2.ai(
  `Search Reddit for: ${page1Response.output}...`
);
```

### AI-Powered Navigation

HyperAgent handles complex browser interactions automatically:
- Navigating to websites
- Identifying relevant content
- Extracting structured information
- Following search workflows
- Summarizing findings

## Code Structure

**Main file**: `TrendSummary.ts`

**Key components:**
- HyperAgent initialization with multi-page support
- Page 1: HN scraping task with AI-driven content extraction
- Page 2: Reddit search and discussion analysis
- Error handling with graceful cleanup

**Dependencies:**
- `@hyperbrowser/agent` (v0.3.1) - Multi-page AI browser automation
- `@hyperbrowser/sdk` (v0.48.1) - Hyperbrowser SDK for session management
- `@langchain/openai` (v0.5.10) - LangChain integration for AI capabilities
- `dotenv` (v16.5.0) - Environment variable management
- `zod` - Schema validation

## Use Cases

- **Trend Research**: Quickly understand what's trending and why
- **Community Sentiment**: Gauge Reddit's reaction to HN topics
- **Content Discovery**: Find discussions across multiple platforms
- **Market Research**: Track emerging technologies and product launches
- **Competitive Intelligence**: Monitor competitor mentions and community feedback

## Important Notes

- Sessions are automatically cleaned up using `try-finally` blocks
- Multiple pages can run independently without blocking each other
- HyperAgent requires OpenAI API key for AI-powered browser automation
- The tool focuses on posts published "today" for freshness
- Error handling ensures proper agent cleanup even if tasks fail

## Extending the Tool

You can easily modify this tool to:
- Search additional platforms (Twitter, LinkedIn, etc.)
- Track specific keywords or topics
- Run on a schedule for continuous monitoring
- Export results to different formats (JSON, CSV, etc.)
- Integrate with notification services (Slack, email, etc.)

---

Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates
