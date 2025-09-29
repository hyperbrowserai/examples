**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# hb-headers

Instant CORS & Security-Header Checker - Analyze HTTP security headers with real browser requests that bypass Cloudflare, solve captchas, and follow redirects.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI** — purpose-built for developers creating AI agents and automating web tasks. With built-in stealth capabilities, you get accurate header analysis even on protected sites.

## What It Does

Launch a stealth browser session to:
- Launch stealth Hyperbrowser session (bypassing Cloudflare, redirects, captchas)
- Follow every redirect to the final URL
- Fetch real HTTP headers via Playwright
- Analyze security headers with color-coded output:
  - CORS settings (`Access-Control-Allow-Origin`)
  - Content Security Policy (`Content-Security-Policy`)
  - HSTS configuration (`Strict-Transport-Security`)
  - Cookie security (`Set-Cookie`)
  - Frame protection (`X-Frame-Options`)

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install dependencies**:
   ```bash
   cd hb-headers
   npm install
   ```
3. **Configure**: Set your API key
   ```bash
   export HYPERBROWSER_API_KEY=hb_your_api_key_here
   ```
4. **Run**:
   ```bash
   npx tsx headers.ts https://example.com
   ```

## Example Output

```
🌐 Starting stealth session for: https://example.com
✅ Reached: https://example.com

🔍 Security header report:

✅ access-control-allow-origin: *
   Tip: Consider specifying only trusted origins.

❌ content-security-policy: missing
   Tip: Add a CSP to prevent XSS attacks.

✅ strict-transport-security: max-age=63072000
   Tip: HSTS is active.

✅ set-cookie: sessionid=abc123; HttpOnly; Secure
   Tip: Ensure cookies have HttpOnly and Secure flags.

❌ x-frame-options: missing
   Tip: Protects against clickjacking.
```

## Features

- **Real Browser Requests**: Uses Playwright over CDP for authentic header analysis
- **Stealth Mode**: Bypasses anti-bot protections with `useStealth: true`
- **Auto Captcha Solving**: Solves captchas automatically with `solveCaptchas: true`
- **Color-Coded Output**: Easy-to-read security analysis with chalk formatting
- **Extended Timeout**: 60-second timeout for slow-loading sites

## Why Use hb-headers?

- **Accurate CORS Debugging**: See headers after JavaScript/CDN rewrites
- **Security Validation**: Instant pass/fail on HSTS, CSP, cookies
- **Headless Ready**: Perfect for CI/CD pipelines and automation
- **Enterprise-Grade**: Powered by Hyperbrowser's industrial-strength stealth stack

## Code Structure

```
hb-headers/
├── headers.ts         # Main script with header analysis logic
├── package.json       # Dependencies (@hyperbrowser/sdk, playwright-core, chalk)
└── tsconfig.json      # TypeScript configuration
```

### How It Works

1. Creates a stealth Hyperbrowser session with captcha solving enabled
2. Connects Playwright via WebSocket to the remote browser
3. Navigates to the target URL with extended timeout
4. Fetches HTTP headers from the final URL using Playwright's request API
5. Analyzes and displays security headers with recommendations

## Configuration

The script checks these security headers:
- `access-control-allow-origin` - CORS policy
- `content-security-policy` - XSS protection
- `strict-transport-security` - HTTPS enforcement
- `set-cookie` - Cookie security flags
- `x-frame-options` - Clickjacking protection

## Use Cases

- **Security Audits**: Quickly check if sites follow security best practices
- **CORS Debugging**: Verify CORS headers for API endpoints
- **CI/CD Integration**: Add security header checks to your deployment pipeline
- **Site Monitoring**: Track security header changes over time
- **Penetration Testing**: Analyze security posture of web applications

---

🚀 **Scale your web automation** with [Hyperbrowser](https://hyperbrowser.ai) | Follow @hyperbrowser