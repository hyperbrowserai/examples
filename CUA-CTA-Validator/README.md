# CUA-CTA-Validator

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

An intelligent CLI tool that uses Hyperbrowser's Conversational User Agent (CUA) with OpenAI to automatically validate and analyze Call-to-Action (CTA) buttons on websites. Perfect for UX audits, accessibility checks, and conversion optimization workflows.

## ✨ Features

- 🔍 **Smart CTA Detection**: Automatically identifies the primary CTA button in hero sections
- ♿ **Accessibility Analysis**: Evaluates color contrast, text clarity, and ARIA attributes
- 📊 **SEO Best Practices**: Checks positioning, semantic markup, and user experience
- 💡 **Actionable Insights**: Generates 3-5 specific improvement suggestions
- 🤖 **AI-Powered**: Uses Hyperbrowser's CUA agent for intelligent page analysis

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. **Get an API key** at [https://hyperbrowser.ai](https://hyperbrowser.ai)

3. Set up environment variables:
```bash
# Create a .env file
echo "HYPERBROWSER_API_KEY=your_key_here" > .env
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set environment variable
export HYPERBROWSER_API_KEY="your_key_here"

# Run with URL argument
npx tsx cua-cta-validator.ts https://example.com

# Or run interactively (will prompt for URL)
npx tsx cua-cta-validator.ts
```

## 💡 Usage Examples

### Validate a Landing Page
```bash
npx tsx cua-cta-validator.ts https://productland.com
```

### Analyze a SaaS Homepage
```bash
npx tsx cua-cta-validator.ts https://yourapp.com/pricing
```

### Check E-commerce CTA
```bash
npx tsx cua-cta-validator.ts https://shop.example.com
```

## 🎯 What Gets Analyzed

The tool performs a three-step analysis:

### Step 1: CTA Identification
- Locates the primary CTA button in the hero section
- Ignores secondary CTAs and other page sections
- Captures button text, styling, and position

### Step 2: Accessibility & SEO Analysis
- **Color Contrast**: WCAG compliance check
- **Text Clarity**: Readability and action-oriented copy
- **Positioning**: Visual hierarchy and fold placement
- **Semantic HTML**: Proper button/link usage
- **Mobile Responsiveness**: Touch target size

### Step 3: Improvement Suggestions
- 3-5 actionable recommendations
- Prioritized by impact on conversion
- Based on industry best practices

## 🔑 Environment Variables

```bash
HYPERBROWSER_API_KEY    # Required - Get at https://hyperbrowser.ai
```

## 🏗️ How It Works

1. **Session Creation**: Initializes a Hyperbrowser session with CUA agent
2. **Navigation**: Opens the target URL in a real browser environment
3. **CTA Detection**: AI agent identifies the primary hero CTA button
4. **Analysis**: Evaluates accessibility, SEO, and UX best practices
5. **Suggestions**: Generates specific, actionable improvements
6. **Cleanup**: Closes the browser session

## 📊 Output Format

```
Starting CTA Validator Agent...
Validating CTA buttons on: https://example.com

Step 1: Identifying CTA button in hero section...
Output:
Main CTA button found: "Get Started Free" - Blue button with white text...

Step 2: Analyzing CTA for accessibility and SEO...
Analysis:
• Color contrast: 4.8:1 (passes WCAG AA)
• Text clarity: Action-oriented and clear
• Positioning: Above the fold, centered...

Step 3: Generating improvement suggestions...
Suggestions:
1. Increase color contrast to 7:1 for WCAG AAA compliance
2. Add aria-label for better screen reader support
3. Consider A/B testing "Start Free Trial" for higher conversion
4. Increase button size for better mobile touch targets
5. Add subtle animation to draw attention
```

## 🎛️ Technical Details

- **Agent**: Uses `@hyperbrowser/sdk` with CUA (Conversational User Agent)
- **Runtime**: TypeScript with `tsx` for execution
- **Schema Validation**: Zod for type-safe output parsing
- **Session Management**: Keeps browser open between steps for efficiency
- **Max Steps**: Configurable limits per analysis phase (15-20 steps)

## 🎯 Use Cases

- **UX Audits**: Validate CTA effectiveness across multiple pages
- **A/B Testing Prep**: Identify improvement opportunities before testing
- **Accessibility Compliance**: Ensure CTAs meet WCAG standards
- **Competitor Analysis**: Benchmark your CTAs against competitors
- **Conversion Optimization**: Data-driven suggestions for higher conversions

## 📦 Dependencies

- `@hyperbrowser/sdk` - Official Hyperbrowser SDK for browser automation
- `@hyperbrowser/agent` - CUA agent capabilities
- `dotenv` - Environment variable management
- `zod` - Runtime type validation
- `typescript` + `ts-node` - TypeScript execution

## 🔄 Development

```bash
# Run in development mode
npx tsx cua-cta-validator.ts https://example.com

# With verbose output
DEBUG=* npx tsx cua-cta-validator.ts https://example.com
```

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
