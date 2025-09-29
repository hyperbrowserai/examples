# DeepForm

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A CLI tool that automatically reverse-engineers website form structures using AI-powered analysis. Detects all form elements (inputs, textareas, selects, buttons) and provides security insights to identify potential phishing patterns and suspicious behaviors.

## Quick Start

1. **Get your API keys:**
   - Hyperbrowser: [hyperbrowser.ai](https://hyperbrowser.ai)
   - OpenAI: [openai.com](https://openai.com)

2. **Set up environment variables:**
```bash
export HYPERBROWSER_API_KEY="your_key_here"
export OPENAI_API_KEY="your_openai_key_here"
```

Or create a `.env` file:
```env
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Install and run:**
```bash
npm install
npx tsx index.ts
```

## Usage

When you run the tool, you'll be prompted to enter a URL:

```bash
npx tsx index.ts
```

Then enter the URL you want to scan:
```
🔗 Enter URL to scan: https://example.com
```

The tool will:
1. Scrape the webpage using Hyperbrowser
2. Extract all form elements (inputs, textareas, selects, buttons)
3. Analyze the form structure with OpenAI GPT-4
4. Provide security analysis and identify potential threats

## Example Output

```
🔗 Enter URL to scan: https://login.example.com

⚙️  Scraping with Hyperbrowser...

✅ Found 4 form elements:
1. [INPUT] <input type="text" name="username" placeholder="Username">...
2. [INPUT] <input type="password" name="password" placeholder="Password">...
3. [INPUT] <input type="hidden" name="csrf_token" value="abc123">...
4. [BUTTON] <button type="submit">Login</button>...

🧠 Analyzing form structure with OpenAI...

📋 Security Analysis:

This appears to be a standard login form with proper security measures:
- Username and password fields are correctly configured
- CSRF token present for protection against cross-site attacks
- No suspicious hidden fields or unusual patterns detected
- Standard field naming conventions used
```

## How It Works

1. **Web Scraping**: Uses Hyperbrowser's cloud browser automation to fetch the full rendered HTML
2. **Form Extraction**: Parses HTML to find all form elements (input, textarea, select, button)
3. **AI Analysis**: Leverages OpenAI GPT-4 to analyze form patterns and identify security issues
4. **Security Report**: Provides actionable insights about potential phishing or malicious patterns

## What It Detects

- **Phishing Patterns**: Suspicious form behaviors and deceptive practices
- **Hidden Fields**: Unusual hidden inputs and tracking elements
- **Security Issues**: Missing CSRF tokens, insecure field configurations
- **Validation Rules**: Input types, required fields, and constraints
- **Suspicious Behaviors**: Unusual form submission logic or redirects

## Use Cases

- **Security Auditing**: Identify phishing attempts and malicious forms
- **Competitive Research**: Understand form structures on competitor sites
- **Development**: Learn form best practices and patterns
- **QA Testing**: Verify form implementations across different sites
- **Accessibility**: Analyze form field labeling and structure

## Tech Stack

- **TypeScript** - Type-safe development
- **@hyperbrowser/sdk** - Cloud browser automation
- **OpenAI GPT-4** - AI-powered security analysis
- **Chalk** - Terminal styling
- **Dotenv** - Environment management

## Documentation

Full API documentation: [docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates. 