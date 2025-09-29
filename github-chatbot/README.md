**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# GitHub Repository Chatbot

Chat with any GitHub repository using AI. Ask questions about code, documentation, structure, and more - the bot scrapes the repository and provides intelligent answers in real-time.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install**: `npm install`
3. **Configure**: Add `HYPERBROWSER_API_KEY` and `OPENAI_API_KEY` to `.env`
4. **Run**: `npx tsx github-chatbot.ts`

## Features

- **Smart GitHub Scraping**: Automatically extracts README files, code structure, language stats, issues, and PRs
- **Interactive Q&A**: Real-time conversational interface powered by GPT-4o-mini
- **Comprehensive Analysis**: Understands repository metadata, file organization, commits, and documentation
- **Clean Formatting**: Simple, readable responses without markdown clutter

## Usage

```bash
# Run the chatbot
npx tsx github-chatbot.ts

# Enter any GitHub repository URL
🔗 Enter GitHub repository URL: https://github.com/microsoft/vscode

# Ask questions about the repository
💬 Ask a question (or type 'exit' to quit): What is this repository about?
🤖 This is the Visual Studio Code repository, a free and open-source code editor...

💬 Ask a question (or type 'exit' to quit): What programming languages are used?
🤖 The repository primarily uses TypeScript (78.2%), JavaScript (12.1%)...
```

## What Can You Ask?

The chatbot can answer questions about:
- Repository purpose and main features
- Programming languages and technology stack
- File structure and code organization
- Recent commits and development activity
- Open issues and pull requests
- Installation and setup instructions
- Documentation and usage guidelines
- Contributors and project history

## Environment Variables

Create a `.env` file:

```env
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
OPENAI_API_KEY=your_openai_api_key
```

## How It Works

1. **Scraping**: Uses Hyperbrowser SDK to scrape GitHub pages with targeted selectors for README, file tree, language stats, commits, issues, and PRs
2. **Processing**: Converts scraped HTML to clean markdown format
3. **AI Analysis**: Sends markdown content + your question to OpenAI GPT-4o-mini
4. **Response**: Returns formatted, contextual answers based on repository content

## Technical Stack

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)**: Web scraping and automation
- **OpenAI GPT-4o-mini**: Natural language processing
- **readline-sync**: Interactive CLI interface
- **TypeScript**: Type-safe development

## Limitations

- Works with public GitHub repositories only
- Large repositories may take longer to scrape
- Response quality depends on scraped content completeness
- Rate limits apply based on your API plans

## Troubleshooting

**Scraping failed error**:
- Verify the GitHub URL is valid and publicly accessible
- Check your `HYPERBROWSER_API_KEY` is correct

**OpenAI errors**:
- Ensure `OPENAI_API_KEY` is valid and has credits
- Check your API quota limits

**Installation issues**:
- Use Node.js v16 or higher
- Run `npm install` to install all dependencies

---

**Perfect for**: Understanding new codebases, researching open-source projects, analyzing repository activity, automated code exploration.

🚀 **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow @hyperbrowser
