# Site Graph Crawler

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A TypeScript-based web crawler that generates visual site maps, identifies orphan pages, and analyzes page sizes using the Hyperbrowser Crawl API.

## Features

- 🗺️ **Visual Site Map**: Generate ASCII tree-style site maps showing page hierarchy
- 🔍 **Orphan Page Detection**: Identify pages with no inbound links
- 📊 **Page Size Analysis**: Display the heaviest pages by content size
- 🌐 **Domain-focused Crawling**: Only follows links within the same domain
- 🎨 **Colorized Output**: Beautiful terminal output with syntax highlighting

## Prerequisites

- Node.js 18+ (for ES modules and top-level await support)
- TypeScript
- A Hyperbrowser API key

## Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

## Get an API Key

Get your Hyperbrowser API key at **[https://hyperbrowser.ai](https://hyperbrowser.ai)**

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
export HYPERBROWSER_API_KEY="your_api_key_here"

# Run the application
npx ts-node site-graph.ts
```

## Configuration

Create a `.env` file in the project root:

```bash
HYPERBROWSER_API_KEY=your_api_key_here
```

## Usage

### Running the Crawler

```bash
npx ts-node site-graph.ts
```

### Interactive Prompts

The script will prompt you for:

1. **Site URL**: Enter the website you want to crawl (must include `http://` or `https://`)
2. **Max Pages**: Maximum number of pages to crawl (default: 30, which is 3 * 10)

### Example Session

```
$ npx ts-node site-graph.ts
Enter site URL to crawl: https://example.com
Max depth (default 3): 5

🔍 Crawling https://example.com (depth 5) …

Site map
/
  /about
  /contact
  /blog
    /blog/post-1
    /blog/post-2
  /services

Orphan pages
• /old-page
• /forgotten-section

Heaviest paths
┌────────────────────────────────────────┬──────────┐
│ Path                                   │ KB       │
├────────────────────────────────────────┼──────────┤
│ /                                      │ 245.7    │
│ /about                                 │ 123.4    │
│ /services                              │ 98.2     │
│ /contact                               │ 67.8     │
│ /blog                                  │ 45.3     │
└────────────────────────────────────────┴──────────┘
```

## Output Explanation

### Site Map
Shows the hierarchical structure of your website as discovered through link crawling. Pages are displayed in a tree format showing the relationship between parent and child pages.

### Orphan Pages
Lists pages that were found during crawling but have no inbound links from other pages on your site. These might be:
- Old pages that should be removed
- Pages that need better internal linking
- Landing pages accessed through external links only

### Heaviest Pages
A table showing the top 10 largest pages by content size, which can help identify:
- Pages that might be slow to load
- Content that could be optimized
- Resource-heavy pages that need attention

## API Reference

Uses **Hyperbrowser's official API methods**:

```typescript
import { Hyperbrowser } from '@hyperbrowser/sdk';

const client = new Hyperbrowser({ apiKey: HB_KEY });

// Start crawling and wait for completion
const crawlResult = await client.crawl.startAndWait({
  url: target,
  maxPages: depth * 10,
  followLinks: true,
  scrapeOptions: {
    formats: ['links', 'html', 'markdown']
  }
});
```

## Technical Details

- **Language**: TypeScript with ES modules
- **Crawling**: Uses Hyperbrowser's cloud-based Crawl API via `crawl.startAndWait()`
- **Domain Parsing**: Uses `tldts` for reliable domain extraction
- **Output**: Styled with `chalk` and `cli-table3` for beautiful terminal display

## Development

### Project Structure

```
site-graph/
├── site-graph.ts          # Main application file
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .env                   # Environment variables (create this)
└── README.md              # This file
```

### Architecture

Single-file TypeScript implementation (~72 LOC):

- **Hyperbrowser SDK**: Cloud-based web crawling via `crawl.startAndWait()`
- **Interactive CLI**: readline-based user input with colored output
- **Domain Filtering**: Uses `tldts` to ensure same-domain link following
- **Graph Analysis**: Builds site map, detects orphan pages, and analyzes page sizes
- **Formatted Output**: Beautiful terminal output with `chalk` and `cli-table3`

## Troubleshooting

### Common Issues

1. **"Set HYPERBROWSER_API_KEY in env" Error**
   - Make sure you've created a `.env` file with your API key
   - Verify the API key is correct and active

2. **Module Resolution Errors**
   - Ensure you're using Node.js 18+ for proper ES module support
   - Run `npm install` to ensure all dependencies are installed

3. **TypeScript Compilation Errors**
   - Run `npx tsc --noEmit` to check for type errors
   - Ensure your `tsconfig.json` matches the project requirements

4. **Empty Results**
   - Check that the target URL is accessible
   - Verify the site allows crawling (check robots.txt)
   - Try a smaller depth/maxPages value

### Getting Help

- Check the [Hyperbrowser documentation](https://docs.hyperbrowser.ai) for API-related issues
- Ensure your API key has sufficient credits
- Verify that the target URL is accessible and allows crawling
- Join the [Discord community](https://discord.gg/zsYzsgVRjh) for support

## Dependencies

- **@hyperbrowser/sdk**: Hyperbrowser SDK for cloud-based web crawling
- **chalk**: Terminal styling and colors
- **cli-table3**: ASCII table formatting
- **dotenv**: Environment variable management
- **tldts**: Domain parsing and validation
- **commander**: CLI framework (dependency)
- **TypeScript**: Type-safe development

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
