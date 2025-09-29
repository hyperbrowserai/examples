**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# GitHub Profile Analyzer

An interactive command-line tool that analyzes GitHub user profiles to extract comprehensive information about a developer's tech stack, programming languages, frameworks, tools, and top repositories using AI-powered extraction.

## Features

- 🔍 **Smart Profile Analysis**: Automatically extracts tech stack information from any public GitHub profile
- 💻 **Language Detection**: Identifies primary programming languages used across repositories
- 🛠️ **Framework & Tool Discovery**: Detects frameworks, libraries, and development tools
- 📊 **Repository Insights**: Lists and summarizes top repositories with descriptions
- 🤖 **AI-Powered Extraction**: Uses Hyperbrowser's Extract API with structured schema validation
- 🔐 **Captcha Handling**: Built-in proxy support and captcha solving for reliable access
- ⌨️ **Interactive CLI**: User-friendly command-line interface with prompts

## Prerequisites

- Node.js (v18 or later)
- Hyperbrowser API key - Get yours at [hyperbrowser.ai](https://hyperbrowser.ai)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the project root:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
   ```

3. **Run the analyzer:**
   ```bash
   npx tsx github-summarizer.ts
   ```

4. **Enter a GitHub username** when prompted, and the tool will analyze their profile

## Usage Example

```bash
$ npx tsx github-summarizer.ts
Enter a GitHub username: torvalds
Analyzing GitHub profile: https://github.com/torvalds

Tech Stack Analysis: {
  "username": "torvalds",
  "primaryLanguages": ["C", "Shell", "Makefile"],
  "frameworks": [],
  "tools": ["Git", "Linux Kernel"],
  "repositories": [
    {
      "name": "linux",
      "summary": "Linux kernel source tree"
    },
    {
      "name": "subsurface",
      "summary": "Dive log program"
    }
  ]
}
```

## How It Works

1. **User Input**: Prompts for a GitHub username via interactive CLI
2. **URL Construction**: Builds the GitHub profile URL from the username
3. **AI Extraction**: Uses Hyperbrowser's Extract API with a structured Zod schema to:
   - Navigate to the user's GitHub profile page
   - Extract structured information about repositories and tech stack
   - Parse languages, frameworks, tools, and repository details
4. **Output**: Returns formatted JSON with comprehensive profile analysis

## Code Structure

**Main file**: `github-summarizer.ts`

Key components:
- **Schema Definition**: Zod schema for structured data extraction
  ```typescript
  {
    username: string,
    primaryLanguages: string[],
    frameworks: string[],
    tools: string[],
    repositories: Array<{ name: string, summary?: string }>
  }
  ```
- **Interactive CLI**: Uses Node.js `readline` for user input
- **Hyperbrowser Integration**: Extract API with proxy and captcha solving enabled
- **Error Handling**: Graceful error handling for network issues or invalid usernames

## Configuration Options

The extraction can be customized by modifying the Hyperbrowser session options:

```typescript
sessionOptions: {
  useProxy: true,        // Use proxy for reliable access
  solveCaptchas: true,   // Automatically solve captchas if encountered
}
```

You can also customize the extraction prompt to gather different information:

```typescript
prompt: "Summarize their tech stack, their main languages, frameworks, tools, contributions, and top repositories."
```

## Dependencies

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)** - Official Hyperbrowser SDK for web scraping and extraction
- **[zod](https://www.npmjs.com/package/zod)** - TypeScript-first schema validation for structured data
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management

## Error Handling

The tool handles common errors gracefully:
- Empty username validation
- Network connectivity issues
- Invalid GitHub usernames
- Rate limiting (via proxy support)
- Captcha challenges (automatic solving)

## Important Notes

- Only analyzes **public** GitHub profiles
- Requires an active Hyperbrowser API key with available credits
- Respects GitHub's rate limits through proxy rotation
- Extraction quality depends on the profile's public information visibility

## Resources

- Hyperbrowser Documentation: [https://docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- Hyperbrowser Discord: [https://discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- Support: info@hyperbrowser.ai

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
