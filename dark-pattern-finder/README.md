# Dark Pattern Finder

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A powerful CLI tool that automatically scans websites for dark patterns using AI-powered analysis. Detects deceptive UX practices like fake scarcity, hidden fees, obstruction tactics, and more. Perfect for UX audits, ethical design reviews, and consumer protection research.

## Features

- **AI-Powered Detection**: Uses Groq's Llama 3.3 70B model for accurate dark pattern identification
- **Real Browser Automation**: Leverages Hyperbrowser SDK with Playwright for authentic page rendering
- **Multi-Site Scanning**: Analyze multiple websites in a single command
- **Detailed Evidence**: Provides specific examples and explanations for each detected pattern
- **Rich CLI Output**: Color-coded results with emojis for easy interpretation
- **Comprehensive Reports**: Summary statistics and pattern frequency analysis

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hyperbrowser API key
- Groq API key (free tier available)

## Installation

1. Clone or navigate to this directory:
```bash
cd dark-pattern-finder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
GROQ_API_KEY=your_groq_api_key
```

Or export them directly:
```bash
export HYPERBROWSER_API_KEY="your_key_here"
export GROQ_API_KEY="your_groq_key_here"
```

## Getting API Keys

### Hyperbrowser API Key
Get your Hyperbrowser API key at **[hyperbrowser.ai](https://hyperbrowser.ai)**

### Groq API Key
1. Visit [Groq's platform](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key

## Usage

### Basic Scanning

Scan a single website:
```bash
npx tsx dark-pattern-finder.ts scan https://example.com
```

Scan multiple websites:
```bash
npx tsx dark-pattern-finder.ts scan https://site1.com https://site2.com https://site3.com
```

### Example Output

```
🔍 Dark Pattern Scan Results

🌐 Site: https://example.com
⚠️  Found 3 dark patterns:

⏰ Scarcity - fake countdown timer
   The site displays a countdown timer claiming "Only 2 hours left for this deal!" but the timer resets on page refresh, indicating false urgency to pressure users into quick purchases.

🥷 Sneaking - pre-checked marketing consent
   The signup form has a pre-checked checkbox for marketing emails buried in the terms section, automatically opting users into promotional communications without explicit consent.

💰 Hidden Fees - surprise checkout charges
   A "service fee" of $4.99 only appears at the final checkout step after users have entered payment information, with no prior disclosure of this additional cost.

📊 Summary
Sites scanned: 1
Sites with dark patterns: 1
Total patterns found: 3

Most common patterns:
  🥷 Sneaking: 1
  ⏰ Scarcity: 1
  💰 Hidden: 1
```

## Dark Pattern Categories

The tool detects six major categories of dark patterns:

1. **Scarcity (⏰)**: False urgency and limited time offers
   - Fake countdown timers that reset
   - Misleading stock availability claims
   - Artificial scarcity tactics

2. **Obstruction (🚧)**: Making cancellation or opt-out difficult
   - Hidden unsubscribe buttons
   - Multi-step cancellation processes
   - Roach motel patterns

3. **Sneaking (🥷)**: Hidden costs and deceptive practices
   - Pre-checked consent boxes
   - Hidden subscription renewals
   - Last-minute additional items in cart

4. **Misdirection (🎯)**: Misleading visual design
   - Confusing button placements
   - Buried important information
   - Visual tricks to guide unwanted actions

5. **Forced Action (🔒)**: Requiring unnecessary actions
   - Forced account creation
   - Mandatory social media sharing
   - Required personal information for basic access

6. **Hidden Fees (💰)**: Surprise charges at checkout
   - Undisclosed service fees
   - Hidden shipping costs
   - Unexpected taxes or surcharges

## Technical Details

### How It Works

1. **Browser Automation**: Creates a Hyperbrowser session and connects via Chrome DevTools Protocol
2. **Page Analysis**: Navigates to the target URL and extracts DOM content
3. **Element Detection**: Identifies UI elements like buttons, checkboxes, modals, and timers
4. **AI Classification**: Sends page data to Groq's Llama model for dark pattern analysis
5. **Result Formatting**: Normalizes findings and presents them in a color-coded CLI format

### Code Structure

- **Main Entry Point**: Command-line interface with Commander.js
- **analyzeUrl()**: Core scanning logic with browser automation
- **classifyWithGroq()**: AI-powered pattern detection using function calling
- **printColoredResults()**: Rich terminal output with Chalk
- **Element Extractors**: Specialized functions for buttons, checkboxes, modals, and timers

### Technologies Used

- **Hyperbrowser SDK**: Browser automation infrastructure
- **Playwright Core**: Browser control and CDP connection
- **Groq API**: Fast LLM inference with Llama 3.3 70B
- **Commander.js**: CLI framework
- **Chalk**: Terminal styling
- **TypeScript**: Type-safe development

## Limitations

- Requires active API keys for both Hyperbrowser and Groq
- Analysis limited to publicly accessible websites
- Results depend on AI model interpretation
- May not detect all subtle dark patterns
- JavaScript-heavy sites may require longer load times

## Troubleshooting

**Missing API keys error**:
- Ensure both `HYPERBROWSER_API_KEY` and `GROQ_API_KEY` are set
- Check `.env` file is in the correct directory

**Session creation failed**:
- Verify your Hyperbrowser API key is valid
- Check your Hyperbrowser account has available credits

**Groq API errors**:
- Confirm your Groq API key is active
- Check for rate limiting on free tier

**Timeout errors**:
- Some websites take longer to load
- The tool has built-in retry logic with 45-second timeouts

## Use Cases

- **UX Audits**: Evaluate your own or competitor websites for ethical design
- **Consumer Protection**: Identify deceptive practices on e-commerce sites
- **Regulatory Compliance**: Check for patterns that violate consumer protection laws
- **Academic Research**: Study prevalence of dark patterns across industries
- **Ethical Design Reviews**: Ensure your products follow user-centric principles

## Documentation

- Full Hyperbrowser API documentation: [docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- Groq API documentation: [console.groq.com/docs](https://console.groq.com/docs)

## Community

- Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates
- Join the discussion: [Discord](https://discord.gg/zsYzsgVRjh)
- Support: info@hyperbrowser.ai

## License

ISC
