# DataFlowTree

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A CLI tool that analyzes websites for PII (Personally Identifiable Information) data collection and privacy compliance. Uses Hyperbrowser's AI agent to detect forms, tracking scripts, and personal data flows, then visualizes them as a colored tree structure.

## Features

- **PII Detection** - Identifies forms collecting email, phone, addresses, payment info, passwords, and more
- **Analytics Tracking** - Detects Google Analytics, Segment, Mixpanel, Facebook pixels, and other tracking scripts
- **Visual Flow Trees** - Colored ASCII tree output showing data flow hierarchy
- **CI/CD Integration** - Alert mode that exits with status 1 when new PII endpoints are detected
- **JSON Output** - Machine-readable export for automation and further processing
- **Historical Comparison** - Tracks changes in PII collection over time

## Installation

1. **Get an API key** at [https://hyperbrowser.ai](https://hyperbrowser.ai)

2. **Set up environment variables:**
   ```bash
   echo "HYPERBROWSER_API_KEY=your_api_key_here" > .env
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Quick Start

```bash
# Analyze a website
npx ts-node index.ts --url https://example.com

# Get JSON output
npx ts-node index.ts --url https://github.com --json

# CI mode (for continuous monitoring)
npx ts-node index.ts --url https://openai.com --ci
```

## Usage Examples

### Basic Analysis
```bash
npx ts-node index.ts --url https://example.com
```
Analyzes the website and displays a visual tree of data flows with color-coded categories.

### JSON Export
```bash
npx ts-node index.ts --url https://github.com --json > report.json
```
Outputs machine-readable JSON for integration with other tools.

### CI/CD Pipeline Integration
```bash
npx ts-node index.ts --url https://yoursite.com --ci
```
Exits with code 1 if new PII endpoints are detected, perfect for automated compliance monitoring in CI/CD pipelines.

### View Help
```bash
npx ts-node index.ts --help
```

## Output Format

### Visual Tree
```
🌳 Data Flow Tree:
https://github.com
├─ POST /api/form   [PII: email, password, name]
└─ POST /collect   [Analytics]

📊 Summary:
🔴 PII requests: 1
🔵 Analytics requests: 1
⚪ Business requests: 1

💾 Results saved to: out/flows.json
```

### Color Coding
- **🔴 Red** - PII data collection endpoints
- **🔵 Blue** - Analytics and tracking requests
- **⚪ White** - Standard business logic requests

### JSON Output
Results are automatically saved to `out/flows.json`:
```json
{
  "timestamp": "2025-07-30T17:14:06.520Z",
  "targetUrl": "https://example.com",
  "flows": [
    {
      "url": "https://example.com/api/form",
      "method": "POST",
      "category": "PII",
      "piiFields": ["email", "password", "name"]
    }
  ]
}
```

## How It Works

1. **Agent Analysis** - Uses Hyperbrowser's browser-use agent to navigate and analyze the target website
2. **Detection** - Scans for:
   - Forms collecting personal data (email, name, phone, address, payment)
   - Analytics/tracking scripts (Google Analytics, Segment, Facebook, etc.)
   - Token and authentication flows (JWT, sessions, cookies)
3. **Classification** - Categorizes each request as PII, Analytics, or Business
4. **Visualization** - Generates a colored tree showing the data flow hierarchy
5. **Export** - Saves results to `out/flows.json` for historical comparison

## PII Keywords Detected

The tool detects these common PII patterns:
- `email`, `phone`, `ssn`, `jwt`
- `card`, `password`, `token`
- `name`, `address`

## Analytics Platforms Detected

Common analytics and tracking platforms:
- Google Analytics
- Segment
- Mixpanel
- Snowplow
- Facebook Pixel

## CLI Options

```bash
Options:
  --url <url>     Target URL to analyze (required)
  --json          Output machine-readable JSON
  --ci            CI mode: exit 1 on new PII endpoints
  --help          Show help information
```

## CI/CD Integration

Perfect for compliance monitoring in continuous integration:

```yaml
# GitHub Actions example
- name: Check for new PII endpoints
  run: |
    npx ts-node index.ts --url https://yoursite.com --ci
  env:
    HYPERBROWSER_API_KEY: ${{ secrets.HYPERBROWSER_API_KEY }}
```

When new PII endpoints are detected:
- Exits with code 1
- Writes details to `out/alert.txt`
- Displays which endpoints were added

## Architecture

- **Entry Point**: `index.ts` - Main CLI application
- **Agent Integration**: Uses `@hyperbrowser/sdk` browser-use agent for analysis
- **Classification**: Keyword-based pattern matching for PII and analytics detection
- **Output**: JSON storage in `out/` directory with historical comparison

## Use Cases

- **Privacy Audits** - Regular compliance checks for GDPR/CCPA
- **Penetration Testing** - Identify data collection points
- **Development** - Monitor data flows during feature development
- **CI/CD** - Automated alerts when new PII collection is added
- **Security Reviews** - Audit third-party scripts and tracking

## Requirements

- Node.js 14 or higher
- Hyperbrowser API key (get at [https://hyperbrowser.ai](https://hyperbrowser.ai))
- TypeScript and ts-node

## Documentation

- Full API docs: [https://docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- SDK Reference: [@hyperbrowser/sdk](https://www.npmjs.com/package/@hyperbrowser/sdk)

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
