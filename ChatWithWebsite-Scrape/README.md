# Chat With Any Website

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

An interactive CLI tool that scrapes any webpage using Hyperbrowser SDK and enables conversational AI-powered chat about the content using OpenAI. Perfect for quick website analysis, research, and content exploration.

## Features

- Web Scraping: Uses Hyperbrowser's official SDK with `client.scrape.startAndWait()`
- Interactive Chat: OpenAI-powered conversational interface about scraped content
- Markdown Support: Automatically extracts and uses markdown format when available
- Simple CLI: Easy-to-use readline-based terminal interface

## Installation

1. Install dependencies:
```bash
npm install
```

2. **Get an API key** at [https://hyperbrowser.ai](https://hyperbrowser.ai)

3. Set up environment variables:
```bash
# Create .env file with:
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
OPENAI_API_KEY=your_openai_api_key
```

## Quick Start

```bash
# Install dependencies
npm install

# Set environment variables
export HYPERBROWSER_API_KEY="your_key_here"
export OPENAI_API_KEY="your_key_here"

# Run the tool
npx ts-node scrapechat.ts
```

## Usage

```bash
npx ts-node scrapechat.ts
```

1. Enter the URL you want to scrape when prompted
2. Wait for the scraping to complete
3. Ask questions about the page content
4. Type `exit` to quit the chat

### Example Session

```
Enter the URL to scrape: https://example.com/article
Scrape result received. Starting chat...

💬 Chat mode: Ask anything about the page (type "exit" to quit

You: What is the main topic of this article?
AI: The article discusses...

You: Can you summarize the key points?
AI: Here are the main points...

You: exit
👋 Chat ended.
```

## How It Works

1. **Scrape**: Fetches webpage content using Hyperbrowser SDK
2. **Extract**: Prioritizes markdown format, falls back to HTML or raw data
3. **Chat**: Maintains conversation context with OpenAI GPT-5
4. **Interact**: Simple readline interface for asking questions

## Code Structure

- **`scrapechat.ts`**: Main entry point with scraping and chat logic
- Uses `@hyperbrowser/sdk` for reliable web scraping
- Uses `openai` for conversational AI
- Uses `readline-sync` for terminal input

## Environment Variables

```bash
HYPERBROWSER_API_KEY    # Get at https://hyperbrowser.ai
OPENAI_API_KEY          # Get at https://platform.openai.com
```

## Requirements

- Node.js v18 or higher
- npm or yarn
- Active Hyperbrowser API key
- Active OpenAI API key

## Use Cases

- **Research**: Quickly analyze and query academic papers or articles
- **Content Analysis**: Extract insights from blog posts and documentation
- **Competitive Intelligence**: Explore competitor websites interactively
- **Learning**: Ask questions about technical documentation
- **Data Extraction**: Conversational approach to finding specific information

## Notes

- The tool uses OpenAI's GPT-5 model by default
- Conversation history is maintained throughout the session
- Supports markdown, HTML, and JSON content formats
- Respects website terms of service when scraping

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
