---
name: design
description: Extract any website's design system as a DESIGN.md. Takes a URL and returns colors, fonts, spacing, and components using Hyperbrowser's Fetch API.
command: /design
---

Extract the design system from the provided URL using Hyperbrowser's Fetch API with branding extraction.

## Input

The user will provide a URL. Examples:
- `/design stripe.com`
- `/design https://linear.app`
- `/design anthropic.com`

If the URL doesn't start with `https://`, prepend it.

## Steps

1. Call Hyperbrowser's Fetch API to extract the branding data from the URL.

Use the Hyperbrowser MCP tool `scrape_webpage` if available. If not, run the following command in the terminal:

```bash
hx web fetch <url> --format branding
```

If the CLI flag is not available, create and run a temporary script:

```javascript
import { Hyperbrowser } from "@hyperbrowser/sdk";

const client = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY,
});

const result = await client.web.fetch({
  url: "<URL>",
  outputs: {
    formats: ["branding"],
  },
});

console.log(JSON.stringify(result.data, null, 2));
```

2. Take the extracted branding data and format it as a clean DESIGN.md file.

3. Save the file as `DESIGN.md` in the project root.

## Output Format

The DESIGN.md must follow this structure:

```markdown
# DESIGN.md

> Design system extracted from [url] via Hyperbrowser

## Colors

### Primary
- Background: #hex
- Foreground: #hex

### Accent
- Primary: #hex
- Secondary: #hex

### Neutral
- Gray 50: #hex
- Gray 100: #hex
...

## Typography

### Font Families
- Headings: [font name]
- Body: [font name]
- Mono: [font name]

### Font Sizes
- xs: Xpx
- sm: Xpx
- base: Xpx
- lg: Xpx
- xl: Xpx
- 2xl: Xpx

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Spacing

- xs: Xpx
- sm: Xpx
- md: Xpx
- lg: Xpx
- xl: Xpx

## Border Radius

- sm: Xpx
- md: Xpx
- lg: Xpx
- full: 9999px

## Shadows

- sm: [value]
- md: [value]
- lg: [value]

## Components

### Buttons
- Primary: [describe style]
- Secondary: [describe style]

### Cards
- [describe style]

### Inputs
- [describe style]

## Dark Mode

If dark mode colors are detected, include them here.
```

## Rules

- Always save as DESIGN.md in the project root
- Include only data that was actually extracted. Do not hallucinate values.
- If a section has no data, omit it entirely
- Use hex values for all colors
- Use px values for sizes
- Keep it clean and scannable
- Add the source URL at the top
- No emojis