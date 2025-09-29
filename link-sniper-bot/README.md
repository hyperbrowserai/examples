# Link Sniper Bot

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A command-line tool that scans any webpage to find and check all external links for broken ones. It extracts all hyperlinks from a page using Hyperbrowser's scraping capabilities, then systematically checks each link's HTTP status to identify broken links, bot-protected sites, and potential issues.

## Features

- Extracts all external links from any webpage using Hyperbrowser SDK
- Intelligent status checking with HEAD and GET fallback requests
- Color-coded terminal output for easy identification of issues
- Smart categorization:
  - **Working** (200-299): Links that respond successfully
  - **Broken** (404, 410, 500+): Actually broken links that need fixing
  - **Bot-blocked** (403): Links protected by anti-bot systems (likely work in browsers)
  - **Suspicious**: Other status codes that warrant manual checking
  - **Unknown**: No response (timeouts or connection issues)
- Detailed summary with status code breakdown
- Browser-like headers to maximize compatibility
- Rate-limited requests to be respectful to servers

## Prerequisites

- Node.js (v18 or later)
- **Hyperbrowser API Key**: Get yours at [hyperbrowser.ai](https://hyperbrowser.ai)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
   ```

3. **Run the bot:**
   ```bash
   npm start
   ```

4. **Enter a URL when prompted:**
   ```
   Enter the URL to scan: https://example.com
   ```

The bot will scrape the page, extract all external links, check their status, and provide a detailed summary.

## Usage Example

```bash
$ npm start

Enter the URL to scan: https://example.com

🔍 Scraping page and extracting links...

Found 47 unique external links. Checking status...

Checking: https://www.example-site.com
200 → https://www.example-site.com
Checking: https://broken-link.com/page
404 → https://broken-link.com/page (actually broken)
Checking: https://bot-protected.com
403 → https://bot-protected.com (bot protection - likely works in browser)
...

📊 Summary for 47 links:
✅ Working: 40
❌ Actually broken: 3
🚫 Bot-blocked: 2
❓ Unknown (no response): 2
⚠️  Suspicious: 0

💡 Note: Links marked as "unknown" or "bot-blocked" might work fine in a real browser

Status code breakdown:
  200: 38 links
  301: 2 links
  403: 2 links
  404: 3 links
  ? (no response): 2 links
```

## How It Works

1. **Scrape**: Uses Hyperbrowser SDK to fetch the HTML content of the target page
2. **Extract**: Parses HTML to find all `<a>` tags with absolute URLs (http:// or https://)
3. **Deduplicate**: Removes duplicate links to avoid redundant checks
4. **Check**: For each unique link:
   - Tries HEAD request first (faster, less bandwidth)
   - Falls back to GET request if HEAD fails or returns 405
   - Uses browser-like headers to maximize compatibility
   - Applies 10-second timeout per request
5. **Categorize**: Intelligently categorizes each link based on HTTP status code
6. **Report**: Displays color-coded results and generates summary statistics

## Code Structure

**Main file**: `index.ts`

Key components:
- `askURL()` - Interactive CLI prompt for URL input
- `extractLinksFromHTML()` - Regex-based link extraction with HTML entity decoding
- `checkLinkStatus()` - HTTP status checker with HEAD/GET fallback
- `getStatusMessage()` - Status code interpretation and categorization
- `isBroken()` - Determines if a link is actually broken (404, 410, 500+)
- `main()` - Orchestrates the entire link checking workflow

**Dependencies**:
- `@hyperbrowser/sdk` - Web scraping via official Hyperbrowser SDK
- `chalk` - Terminal colors for better readability
- `commander` - CLI framework (imported but not actively used in current version)
- `dotenv` - Environment variable management
- `tsx` - TypeScript execution without compilation

## Understanding Status Codes

The bot uses smart heuristics to categorize link status:

| Status Code | Category | Meaning |
|-------------|----------|---------|
| 200-299 | Working | Link is accessible and responding normally |
| 403 | Bot-blocked | Anti-bot protection (likely works in real browsers) |
| 404 | Broken | Page not found - needs fixing |
| 410 | Broken | Page permanently gone - needs fixing |
| 500+ | Broken | Server error - may be temporary or permanent |
| No response | Unknown | Timeout or connection failure - check manually |
| Others | Suspicious | Unusual status - warrants manual verification |

## Configuration

The bot is designed to work out-of-the-box, but you can modify the code to customize:

- **Timeout duration**: Change the 10000ms timeout in `checkLinkStatus()`
- **Rate limiting**: Adjust the 500ms delay between requests in the main loop
- **Status categorization**: Modify `getStatusMessage()` to change how status codes are interpreted
- **User-Agent**: Update headers in `checkLinkStatus()` to simulate different browsers

## Important Notes

- Only checks external links (http:// or https://)
- Internal relative links are ignored
- Links marked as "bot-blocked" (403) may work fine in a real browser
- "Unknown" status doesn't always mean broken - could be firewall, timeout, or anti-bot
- Uses a 500ms delay between requests to be respectful to servers
- HEAD requests are preferred over GET to save bandwidth

## Troubleshooting

**"HYPERBROWSER_API_KEY environment variable not set"**
- Ensure `.env` file exists in the project root
- Verify the API key is correct and not expired

**"No HTML content received"**
- The target site may be blocking scraping attempts
- Try a different URL or check if the site is accessible

**Many links showing as "unknown"**
- Some sites have strict firewall rules or rate limiting
- These links may work fine in a browser
- Consider increasing the timeout or reducing request frequency

## Resources

- Hyperbrowser Documentation: [https://docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- Hyperbrowser Discord: [https://discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- Support: info@hyperbrowser.ai

---

Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates
