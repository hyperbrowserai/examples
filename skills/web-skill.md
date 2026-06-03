---
name: web
description: Generate a web.md for any live website. Maps every page, action, flow, and interactive element so coding agents can navigate and interact with the site. Uses Hyperbrowser's Fetch API.
command: /web
---

Generate a web.md file from a live website using Hyperbrowser's Fetch API.

## Input

The user will provide a URL. Examples:
- `/web linear.app`
- `/web https://stripe.com/dashboard`
- `/web cal.com`

If the URL doesn't start with `https://`, prepend it.

## Steps

### 1. Fetch the homepage

Use Hyperbrowser's Fetch API to get the fully rendered page content.

Use the Hyperbrowser MCP tool `web_fetch` if available. If not, run the following command in the terminal:

```bash
hx web fetch <url> --format html,markdown,links
```

If the CLI is not available, create and run a temporary script:

```javascript
import { Hyperbrowser } from "@hyperbrowser/sdk";
const client = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY,
});
const result = await client.web.fetch({
  url: "<URL>",
  outputs: {
    formats: ["html", "markdown", "links"],
  },
});
console.log(JSON.stringify(result.data, null, 2));
```

Keep it simple. Do not pass sessionOptions, body overrides, or extra flags. The default fetch handles most public sites.

### 2. Discover all pages

From the homepage fetch, use the `links` output to find all internal links (same domain). Filter out anchors, query params, asset links, and duplicates. Cap at 15 pages.

Fetch each discovered page using the same command from Step 1:

```bash
hx web fetch <discovered-url> --format html,markdown,links
```

### 3. Extract interactive elements per page

For each fetched page, analyze the HTML and extract:

**Navigation:**
- Primary nav links and their destinations
- Secondary nav / sidebar links
- Breadcrumbs
- Footer links

**Actions:**
- Buttons (label, type, likely action)
- Forms (fields, input types, submit action)
- Dropdowns and selects
- Modals and dialogs (triggers)
- Toggles and switches

**Flows:**
- Sign up / login flow (steps, required fields)
- Onboarding flow (if detectable)
- Checkout / payment flow
- Multi-step forms or wizards
- Search functionality

**Data points:**
- Tables and lists (what data is displayed)
- Cards and repeated elements (structure)
- Filters and sort controls
- Pagination patterns

**State indicators:**
- Auth-gated sections (login walls, paywalls)
- Loading states
- Empty states
- Error patterns

### 4. Map the site structure

Build a complete navigation graph:
- Every route and what it contains
- How pages link to each other
- Primary user paths (homepage → pricing → signup)
- Shared components across pages (header, footer, sidebar)

### 5. Generate web.md

Save the file as `web.md` in the project root.

## Output Format

```markdown
# web.md

> Site map and interaction guide for [url]
> Generated via Hyperbrowser

## Overview
- **Site:** [url]
- **Pages mapped:** [count]
- **Interactive elements found:** [count]
- **Primary purpose:** [e.g. SaaS dashboard, marketing site, docs site]

## Site Structure

### Routes
| Route | Type | Description |
|-------|------|-------------|
| / | Landing | Homepage with hero, features, CTA |
| /pricing | Marketing | Pricing tiers with comparison table |
| /docs | Documentation | API reference and guides |
| /login | Auth | Login form (email + password) |
| /dashboard | App (auth-gated) | Main product interface |

### Navigation
- **Primary nav:** [Home, Product, Pricing, Docs, Login]
- **Footer:** [About, Blog, Careers, Legal, Contact]
- **Sidebar (app):** [Dashboard, Projects, Settings, Team]

## Pages

### / (Homepage)

**Actions:**
- "Get Started" button → /signup
- "Book a Demo" button → /demo (opens Calendly modal)
- Email input + "Subscribe" → newsletter signup form

**Content sections:**
- Hero: headline, subheadline, CTA
- Features: 3-column grid with icons
- Testimonials: carousel
- Pricing preview: 3 tiers
- Footer: links, social

**Interactive elements:**
- Mobile menu toggle (hamburger)
- Cookie consent banner (accept/reject)

---

### /pricing

**Actions:**
- "Start Free" buttons per tier → /signup?plan=[tier]
- Toggle: Monthly / Annual billing
- "Contact Sales" → /contact

**Content sections:**
- Pricing table: 3 tiers (Free, Pro, Enterprise)
- Feature comparison table
- FAQ accordion

**Interactive elements:**
- Billing toggle (monthly/annual, changes displayed prices)
- FAQ accordion (click to expand)
- Comparison table scroll (horizontal on mobile)

---

### /login

**Flow: Login**
1. Email input (required, type=email)
2. Password input (required, type=password)
3. "Forgot password?" link → /reset-password
4. "Sign in" submit button
5. OAuth options: Google, GitHub
6. "Don't have an account? Sign up" → /signup

---

[...repeat for each mapped page]

## Key Flows

### Sign Up Flow
1. /pricing → click "Start Free"
2. /signup → email, password, company name
3. Email verification
4. /onboarding → select use case, invite team
5. /dashboard

### Search
- Location: top nav bar, all pages
- Type: instant search with dropdown results
- Filters: by category, date, type

## Auth-Gated Sections
- /dashboard — requires login
- /settings — requires login
- /billing — requires login + admin role

## Technical Notes
- SPA (React/Next.js detected)
- Client-side routing
- API calls to api.[domain].com
- Cookie consent required before tracking
```

## Rules

- Use the same simple fetch command for all pages. Do not add extra flags or body overrides.
- If a page fails to fetch, skip it and move on
- Only include elements that were actually found. Do not hallucinate pages, buttons, or flows.
- If a page is auth-gated and cannot be accessed, note it as "auth-gated" and move on
- Focus on elements an AI agent would need to interact with the site programmatically
- Be specific about button labels, form fields, and link destinations
- Include the actual text of buttons and links, not generic descriptions
- Map flows as numbered steps an agent can follow
- No emojis
- Keep it clean and scannable
