# Scam Scanner Bot

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

An interactive CLI tool that analyzes suspicious online stores for potential fraud indicators. Uses Hyperbrowser's browser automation to scrape websites and detect common scam patterns like fake urgency, insecure links, suspicious domains, and missing legal pages.

## What It Does

Detect potential scam websites by analyzing:

- **Suspicious Content Patterns** - Fake urgency, limited time offers, too-good-to-be-true claims
- **Insecure Links** - HTTP links that could compromise security
- **External Redirects** - Unusual number of external domain links
- **Domain Credibility** - Suspicious TLDs (.tk, .ml, .ga, .cf, .pw)
- **Missing Legal Pages** - No contact info, privacy policy, or terms of service
- **Payment Security** - Lack of secure payment mentions

## Quick Start

### 1. Get Your API Key

**Hyperbrowser API Key:** Sign up at [https://hyperbrowser.ai](https://hyperbrowser.ai)

### 2. Installation

```bash
cd scam-scanner-bot
npm install
```

### 3. Environment Setup

Create a `.env` file in the project root:

```env
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
```

Or export it directly:

```bash
export HYPERBROWSER_API_KEY="your_key_here"
```

### 4. Run the Scanner

```bash
npm run dev
```

## Usage

### Interactive Mode

The tool prompts you to enter a URL to scan:

```bash
npm run dev
```

**Example Session:**

```
Enter store URL: https://suspicious-store.com
🔍  Starting Hyperbrowser scrape…

Scam Scanner Results
────────────────────────────────────────
Suspicious Content Patterns: 3
Insecure Links (HTTP): 5
External Links: 12
Suspicious TLD: No
Has Contact Info: No
Has Privacy Policy: No
Mentions Secure Payment: No

⚠  Suspicious content patterns detected
✖  Sample insecure link → http://example.com/image.jpg

Risk Assessment:
🚨 HIGH RISK - Likely scam website!
```

## Features

### Pattern Detection

**Suspicious Content:**
- Urgent sale / limited time offers
- "Act now" pressure tactics
- Flash sales and fake scarcity
- "Too good to be true" claims
- Wholesale/liquidation language
- "Going out of business" urgency

### Security Analysis

**Insecure Elements:**
- HTTP links on HTTPS sites
- Missing SSL/encryption mentions
- No secure payment indicators

### Domain Analysis

**Trust Indicators:**
- Suspicious TLD detection (.tk, .ml, .ga, .cf, .pw)
- External domain redirect patterns
- Contact information presence
- Privacy policy and terms of service

### Risk Scoring

The tool calculates a risk score based on:
- Number of suspicious content patterns (weight: 2)
- Presence of insecure links (weight: 1)
- Excessive external links (weight: 1)
- Suspicious TLD (weight: 2)
- Missing contact information (weight: 1)
- Missing privacy policy (weight: 1)
- No secure payment mentions (weight: 1)

**Risk Levels:**
- **HIGH RISK** (5+ points): Likely scam website
- **MEDIUM RISK** (3-4 points): Exercise caution
- **LOW RISK** (0-2 points): Appears legitimate

## Sample Output

```
Scam Scanner Results
────────────────────────────────────────
Suspicious Content Patterns: 4
Insecure Links (HTTP): 8
External Links: 15
Suspicious TLD: Yes
Has Contact Info: No
Has Privacy Policy: No
Mentions Secure Payment: No

⚠  Suspicious content patterns detected
✖  Sample insecure link → http://cdn.example.com/asset.js
❓  Many external links → https://payment-processor.xyz
⚠  Suspicious TLD detected → example.tk

Risk Assessment:
🚨 HIGH RISK - Likely scam website!
```

## Alternative Commands

```bash
# Development mode (default)
npm run dev

# Build TypeScript
npm run build

# Run compiled version
npm start

# Direct execution with ts-node
npx ts-node scam-scanner-bot.ts
```

## Project Structure

```
scam-scanner-bot/
├── scam-scanner-bot.ts        # Main application logic
├── package.json               # Dependencies and scripts (phonycart)
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables (create this)
└── README.md                 # This file
```

## How It Works

1. **User Input** - Interactive prompt for store URL
2. **URL Validation** - Ensures proper http:// or https:// protocol
3. **Web Scraping** - Hyperbrowser scrapes HTML and extracts links
4. **Pattern Analysis** - Checks content against suspicious pattern list
5. **Security Check** - Analyzes links for HTTP insecurity and external domains
6. **Domain Analysis** - Evaluates TLD and checks for trust indicators
7. **Risk Calculation** - Computes weighted risk score
8. **Report Generation** - Color-coded console output with findings

## Technical Details

### Technologies Used

- **[@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)** - Browser automation and web scraping
- **[tldts](https://www.npmjs.com/package/tldts)** - Domain parsing and TLD analysis
- **[chalk](https://www.npmjs.com/package/chalk)** - Colored terminal output
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management
- **[readline](https://nodejs.org/api/readline.html)** - Built-in Node.js for CLI input
- **TypeScript** - Type-safe development

### Scrape Configuration

```typescript
scrapeOptions: {
  formats: ['html', 'links'],
  waitUntil: 'networkidle',
  timeout: 30000
}
```

- **formats**: Extracts both HTML content and all page links
- **waitUntil**: Waits for network to be idle before scraping
- **timeout**: 30-second maximum wait time

## Use Cases

**E-commerce Shoppers:**
- Quick credibility check before making online purchases
- Identify potential scam stores

**Fraud Researchers:**
- Analyze patterns across suspicious websites
- Build databases of scam indicators

**Consumer Protection:**
- Screen reported websites for fraud indicators
- Generate evidence for investigations

**Browser Extensions:**
- Integrate as backend service for real-time URL checking
- Build consumer safety tools

## Limitations

- Analysis is based on heuristics, not 100% accurate
- Legitimate sites may trigger false positives
- Does not perform deep financial or legal verification
- Requires publicly accessible websites
- No AI-powered analysis (uses pattern matching only)

## Troubleshooting

### Common Issues

**Missing API Key:**
```bash
# Verify your .env file exists and contains the key
cat .env
```

**URL Format Error:**
- Ensure URL starts with `http://` or `https://`
- Example: `https://example.com` not `example.com`

**Scrape Failed:**
- Some websites may block automated scraping
- Check if the site is publicly accessible
- Verify Hyperbrowser API quota limits

**TypeScript Errors:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Requirements

- **Node.js** 16+ or later
- **TypeScript** 5.0+ (installed via npm)
- **Hyperbrowser API Key** (get at [hyperbrowser.ai](https://hyperbrowser.ai))

## Learn More

- **Hyperbrowser Documentation:** [https://docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- **Hyperbrowser Discord:** [https://discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- **Support:** info@hyperbrowser.ai

## License

MIT
