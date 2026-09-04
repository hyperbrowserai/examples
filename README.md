# Hyperbrowser Examples

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Documentation](https://img.shields.io/badge/docs-hyperbrowser.ai%2Fdocs-00C389)](https://www.hyperbrowser.ai/docs)
[![Discord](https://img.shields.io/badge/Discord-join-5865F2?logo=discord&logoColor=white)](https://discord.gg/zsYzsgVRjh)

Official examples, Jupyter notebooks, coding-agent skills, and HyperAgent task templates for [Hyperbrowser](https://www.hyperbrowser.ai) — cloud browsers and web infrastructure for AI agents and automation.

Each project is self-contained. Clone the repo, open a directory, add your API key, and run it.

## Table of contents

- [About Hyperbrowser](#about-hyperbrowser)
- [What's in this repository](#whats-in-this-repository)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Find an example](#find-an-example)
- [Example apps](#example-apps)
- [Cookbook](#cookbook)
- [Skills](#skills)
- [Task templates](#task-templates)
- [Repository layout](#repository-layout)
- [Related projects](#related-projects)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## About Hyperbrowser

Hyperbrowser is browser infrastructure for AI agents and apps: managed cloud browser sessions, scrape / crawl / extract APIs, computer-use agents, and sandboxes.

Use it when you need a real browser in the cloud — JavaScript-rendered pages, stealth and proxies, CAPTCHA handling, Playwright or Puppeteer over CDP, or an agent that can click through a site.

- **Product:** [hyperbrowser.ai](https://www.hyperbrowser.ai)
- **Dashboard / API keys:** [app.hyperbrowser.ai](https://app.hyperbrowser.ai)
- **Docs:** [hyperbrowser.ai/docs](https://www.hyperbrowser.ai/docs)
- **Node SDK:** [`@hyperbrowser/sdk`](https://www.npmjs.com/package/@hyperbrowser/sdk)
- **Python SDK:** [`hyperbrowser`](https://pypi.org/project/hyperbrowser/)

## What's in this repository

| Area | Path | What it is |
| --- | --- | --- |
| **Example apps** | Top-level directories | Standalone CLIs, bots, and small apps in TypeScript or Python |
| **Cookbook** | [`cookbook/`](cookbook/) | Jupyter notebooks for scrape, extract, Browser Use, and MCP patterns |
| **Skills** | [`skills/`](skills/) | Prompts you can drop into a coding agent (`/web`, `/design`, `/learn`, …) |
| **Task templates** | [`task-templates/`](task-templates/) | Copy-paste [HyperAgent](https://github.com/hyperbrowserai/HyperAgent) scripts by industry |

There is no root `package.json`. Install and run inside the directory you care about.

## Prerequisites

- A [Hyperbrowser API key](https://app.hyperbrowser.ai)
- **TypeScript examples:** Node.js 18 or newer, plus npm
- **Python examples:** Python 3.10+ (several Streamlit apps specify 3.13), plus `pip` or [uv](https://docs.astral.sh/uv/)
- Many examples also need an [OpenAI](https://platform.openai.com/) API key. A few use Anthropic, Groq, Slack, Serper, or ElevenLabs — each project's README lists the keys it needs

Never commit `.env` files. The repo gitignores them.

## Quick start

```bash
git clone https://github.com/hyperbrowserai/examples.git
cd examples/company-researcher
npm install
```

Create a `.env` in that directory:

```env
HYPERBROWSER_API_KEY=your_api_key_here
```

Run the example:

```bash
npx ts-node company-researcher.ts
```

Enter a company name and a research topic. The script searches the web and extracts structured findings through Hyperbrowser.

**Python path** (notebooks):

```bash
cd cookbook
pip install -r requirements.txt
jupyter notebook
```

Add `HYPERBROWSER_API_KEY` (and any other keys the notebook asks for) to `cookbook/.env`.

## Find an example

| If you want to… | Start here |
| --- | --- |
| Scrape a page and chat with it | [ChatWithWebsite-Scrape](ChatWithWebsite-Scrape/) |
| Research a company or competitor | [company-researcher](company-researcher/), [competitor-analyzer-bot](competitor-analyzer-bot/) |
| Turn sites into LLM / RAG data | [site2rag](site2rag/), [ragzip](ragzip/), [llm-crawl](llm-crawl/), [hyper-train](hyper-train/) |
| Monitor the web and alert Slack | [research-bot](research-bot/), [hb-intern-bot](hb-intern-bot/), [down-monitor](down-monitor/) |
| Audit UX, SEO, or security headers | [SEO-Analyzer](SEO-Analyzer/), [hb-headers](hb-headers/), [dark-pattern-finder](dark-pattern-finder/) |
| Drive a browser with an AI agent | [task-templates](task-templates/), [cookbook](cookbook/) Browser Use notebooks |
| Teach a coding agent a live site | [skills/web-skill.md](skills/web-skill.md), [skills/design-skill.md](skills/design-skill.md) |
| Compare computer-use models | [browser-agent-benchmark](browser-agent-benchmark/) |

## Example apps

Each folder has its own README with install steps, environment variables, and commands.

### Research and competitive intelligence

| Project | Description | Stack |
| --- | --- | --- |
| [company-researcher](company-researcher/) | Research any company on a topic and return structured findings | TypeScript |
| [competitor-analyzer-bot](competitor-analyzer-bot/) | Scrape two competitor sites and generate a comparison report | TypeScript |
| [research-bot](research-bot/) | Watch competitor pages, detect real changes, and send founder-focused Slack alerts | TypeScript |
| [hb-intern-bot](hb-intern-bot/) | Scheduled research intern: scrape HN, Reddit, Product Hunt, and blogs into digests | TypeScript |
| [hb-predict](hb-predict/) | Detect emerging tech signals from HN and Reddit and generate predictions | TypeScript |
| [Extract-github-analyzer](Extract-github-analyzer/) | Analyze a GitHub profile: languages, frameworks, and top repositories | TypeScript |
| [github-chatbot](github-chatbot/) | Scrape a GitHub repo and answer questions about it | TypeScript |
| [Trend-summary](Trend-summary/) | Take today's top Hacker News post and summarize related Reddit discussion | TypeScript |

### Scraping, crawl, and LLM data

| Project | Description | Stack |
| --- | --- | --- |
| [ChatWithWebsite-Scrape](ChatWithWebsite-Scrape/) | Scrape any URL and chat with the page in the terminal | TypeScript |
| [llm-crawl](llm-crawl/) | Crawl with the official Crawl API, then process pages with an LLM | TypeScript |
| [site2rag](site2rag/) | Scrape, strip boilerplate, and emit token-budgeted RAG chunks | TypeScript |
| [site2prompt](site2prompt/) | Scrape and clean sites into LLM training / prompt datasets | TypeScript |
| [ragzip](ragzip/) | Build citation-tagged context packs from scraped pages | TypeScript |
| [hyper-train](hyper-train/) | Scrape URLs into JSONL / Markdown training sets, with optional embeddings and QA pairs | TypeScript |
| [dataset-assmbler](dataset-assmbler/) | Search the web, extract text, dedupe, and split train/eval JSONL or CSV | TypeScript |
| [Internet-zip](Internet-zip/) | Compress a live page into a semantic `.kzip.json` knowledge shard | TypeScript |
| [oss-web-extractor](oss-web-extractor/) | Extract structured data with Hyperbrowser plus a local open-source model | TypeScript |
| [o3-pro-extractor](o3-pro-extractor/) | Scrape a page to Markdown, then extract structured JSON with OpenAI | TypeScript |
| [meta-scraper](meta-scraper/) | Extract and analyze title, description, Open Graph, and Twitter Card tags | TypeScript |
| [site-graph](site-graph/) | Crawl a domain and print a site map, orphan pages, and heaviest pages | TypeScript |
| [resource-summary](resource-summary/) | Summarize the resources a page loads | TypeScript |
| [tweet-fetcher](tweet-fetcher/) | Extract recent tweets and followers for a handle using a persistent browser profile | Python |

### Monitoring, news, and alerts

| Project | Description | Stack |
| --- | --- | --- |
| [down-monitor](down-monitor/) | Real-browser uptime checks (not HTTP pings) | TypeScript |
| [down-detector-bot](down-detector-bot/) | Watch AWS, GCP, Azure, and Cloudflare status pages; Slack on change | TypeScript |
| [hb-changelog-tracker](hb-changelog-tracker/) | Monitor AI / research blogs and post changelog-style Slack summaries | TypeScript |
| [agi-newsletter](agi-newsletter/) | Scrape AI lab blogs, draft a newsletter, and email subscribers | TypeScript |
| [crypto-news-bot](crypto-news-bot/) | Aggregate CoinDesk, Decrypt, and Cointelegraph into Slack digests | TypeScript |
| [vibe-posting-bot](vibe-posting-bot/) | Detect new tech stories and draft human-like Typefully posts | TypeScript |
| [link-sniper-bot](link-sniper-bot/) | Find external links on a page and classify them as working, broken, or blocked | TypeScript |

### Commerce, leads, and local search

| Project | Description | Stack |
| --- | --- | --- |
| [product-search](product-search/) | Extract a product, find Google Shopping alternatives, and refresh prices on a schedule | TypeScript |
| [real-estate-finder](real-estate-finder/) | Search US rental and for-sale listings across major real-estate sites | TypeScript |
| [Maps-lead-finder](Maps-lead-finder/) | Find business leads on Google Maps (name, address, contact) via HyperAgent | TypeScript |
| [gift-researcher](gift-researcher/) | Research gift ideas from live web discussions | TypeScript |
| [scam-scanner-bot](scam-scanner-bot/) | Scan a storefront in a real browser and flag fraud patterns | TypeScript |

### Site quality, privacy, and UX

| Project | Description | Stack |
| --- | --- | --- |
| [SEO-Analyzer](SEO-Analyzer/) | AI SEO audit: titles, meta, headings, content, images, links, and technical issues | TypeScript |
| [hb-headers](hb-headers/) | Follow redirects and report CORS, CSP, HSTS, cookies, and frame options | TypeScript |
| [hb-ui-bot](hb-ui-bot/) | Screenshot a page and review layout, type, color, and accessibility with vision | TypeScript |
| [dark-pattern-finder](dark-pattern-finder/) | Scan for deceptive UX (fake scarcity, hidden fees, obstruction) | TypeScript |
| [dataflow-tree](dataflow-tree/) | Map PII collection, forms, and third-party trackers | TypeScript |
| [deep-form](deep-form/) | Reverse-engineer form fields, validation, and submission flows | TypeScript |
| [CUA-CTA-Validator](CUA-CTA-Validator/) | Use OpenAI Computer Use to find the hero CTA and critique accessibility / SEO | TypeScript |

### Agents, apps, and evaluation

| Project | Description | Stack |
| --- | --- | --- |
| [chat-with/chat-with-youtube](chat-with/chat-with-youtube/) | Streamlit app: extract a YouTube transcript and chat with the video | Python |
| [article-tts](article-tts/) | Streamlit app: fetch an article and convert it to speech | Python |
| [changelog-builder](changelog-builder/) | Streamlit app: compare two GitHub refs and generate a changelog | Python |
| [agents/budget-travel-agent](agents/budget-travel-agent/) | Streamlit app: search Google Travel Explore and parse results with vision | Python |
| [browser-agent-benchmark](browser-agent-benchmark/) | Fair harness: run multiple models on the same real-browser tasks and score them | TypeScript |

## Cookbook

Jupyter notebooks in [`cookbook/`](cookbook/). Install [`cookbook/requirements.txt`](cookbook/requirements.txt), set `HYPERBROWSER_API_KEY` (and usually `OPENAI_API_KEY`) in `.env`, then open any notebook.

| Notebook | Topic |
| --- | --- |
| [company-researcher.ipynb](cookbook/company-researcher.ipynb) | Company research |
| [docs-qna.ipynb](cookbook/docs-qna.ipynb) | Question answering over documentation |
| [documentation-based-coding-agent.ipynb](cookbook/documentation-based-coding-agent.ipynb) | Coding agent grounded in live docs |
| [youtube_video_chat.ipynb](cookbook/youtube_video_chat.ipynb) | Chat with a YouTube transcript |
| [hacker-news-summarizer.ipynb](cookbook/hacker-news-summarizer.ipynb) | Summarize Hacker News |
| [news-analyst.ipynb](cookbook/news-analyst.ipynb) | News analysis |
| [twitter-profile-analyzer.ipynb](cookbook/twitter-profile-analyzer.ipynb) | Twitter / X profile analysis |
| [social-media-post-finder.ipynb](cookbook/social-media-post-finder.ipynb) | Find social posts |
| [shopping-assistant.ipynb](cookbook/shopping-assistant.ipynb) | Shopping assistant |
| [shopping-agents-with-vision.ipynb](cookbook/shopping-agents-with-vision.ipynb) | Vision-based shopping agents |
| [review-analyzer.ipynb](cookbook/review-analyzer.ipynb) | Review analysis |
| [movie-review-researcher.ipynb](cookbook/movie-review-researcher.ipynb) | Movie review research |
| [apartment-finder.ipynb](cookbook/apartment-finder.ipynb) | Apartment search |
| [flight-ticket-search.ipynb](cookbook/flight-ticket-search.ipynb) | Flight search |
| [concert-ticket-finder.ipynb](cookbook/concert-ticket-finder.ipynb) | Concert tickets |
| [local-events-finder.ipynb](cookbook/local-events-finder.ipynb) | Local events |
| [steam-special-suggestor.ipynb](cookbook/steam-special-suggestor.ipynb) | Steam specials |
| [doordash-location-recommender.ipynb](cookbook/doordash-location-recommender.ipynb) | Delivery / restaurant recommendations |
| [menu-recommendations.ipynb](cookbook/menu-recommendations.ipynb) | Menu recommendations |
| [ingredients-based-recipe-suggestor.ipynb](cookbook/ingredients-based-recipe-suggestor.ipynb) | Recipes from ingredients |
| [changelog-builder.ipynb](cookbook/changelog-builder.ipynb) | Changelog generation |
| [wiki-racer.ipynb](cookbook/wiki-racer.ipynb) | Path finding between Wikipedia articles |
| [next-chess-move.ipynb](cookbook/next-chess-move.ipynb) | Next chess move from a live board |
| [code-solver.ipynb](cookbook/code-solver.ipynb) | Solve coding problems in the browser |
| [code-solver-browser-use.ipynb](cookbook/code-solver-browser-use.ipynb) | Same pattern with Browser Use |
| [browser-use-hybrid-flows.ipynb](cookbook/browser-use-hybrid-flows.ipynb) | Hybrid Browser Use flows |
| [browser-use-authed-flows.ipynb](cookbook/browser-use-authed-flows.ipynb) | Authenticated Browser Use flows |
| [feature-recognition.ipynb](cookbook/feature-recognition.ipynb) | Recognize product features on a page |
| [comic-trip-planner.ipynb](cookbook/comic-trip-planner.ipynb) | Trip planning |
| [youtube-mcp-server.ipynb](cookbook/youtube-mcp-server.ipynb) | YouTube MCP server |
| [wikipedia-mcp-server.ipynb](cookbook/wikipedia-mcp-server.ipynb) | Wikipedia MCP server |
| [news-mcp-server.ipynb](cookbook/news-mcp-server.ipynb) | News MCP server |

## Skills

Markdown skills in [`skills/`](skills/) for coding agents (Claude Code, Cursor, and similar). They use Hyperbrowser's Fetch API or MCP tools (`web_fetch`, `scrape_webpage`) and, for discovery, Serper.

| Skill | Command | What it does |
| --- | --- | --- |
| [web-skill.md](skills/web-skill.md) | `/web <url>` | Map a live site into a `web.md` (pages, actions, flows, interactive elements) |
| [design-skill.md](skills/design-skill.md) | `/design <url>` | Extract colors, type, spacing, and components into `DESIGN.md` |
| [harness-skill.md](skills/harness-skill.md) | `/harness` | Run the agent against your repo and write a `CLAUDE.md` from real failures |
| [learn.md](skills/learn.md) | `/learn <topic>` | Discover official docs and generate a skill for a library or API |
| [learn-batch.md](skills/learn-batch.md) | `/learn batch <topics…>` | Same as `/learn`, for several topics at once |
| [skill-tree.md](skills/skill-tree.md) | `/skill-tree <topic-or-url>` | Build a skill graph from documentation |

Copy a skill into your agent's skills directory (for example `~/.claude/skills/` or `.claude/skills/`) and invoke the command. You need `HYPERBROWSER_API_KEY`; `/learn` and `/skill-tree` also need a Serper key.

## Task templates

Ready-to-run [HyperAgent](https://github.com/hyperbrowserai/HyperAgent) scripts in [`task-templates/`](task-templates/). Each file is a focused automation with a Zod schema. Copy one, set `HYPERBROWSER_API_KEY`, and execute it.

| Category | Templates |
| --- | --- |
| [AI pipelines](task-templates/ai-pipelines/) | News sentiment, product-review analysis, Amazon and TikTok shopping recommenders |
| [API servers](task-templates/api-servers/) | Craigslist, Hacker News, Product Hunt, Wikipedia, multi-site |
| [Booking](task-templates/booking/) | Google Flights, Kayak, hotels, OpenTable, Calendly |
| [Concepts](task-templates/concepts/) | Tables, infinite scroll, SEO content structure |
| [Data extraction](task-templates/data-extraction/) | Zillow, Airbnb, X / Twitter |
| [E-commerce](task-templates/e-commerce/) | Multi-site price comparison, coupons, eBay auctions, Etsy shops |
| [Finance](task-templates/finance/) | Stock quotes, earnings calendars, FX rates, crypto prices |
| [Form filling](task-templates/form-filling/) | Basic forms, Google Forms, multi-step onboarding |
| [Job search](task-templates/job-search/) | Indeed |
| [Monitoring](task-templates/monitoring/) | Changelog tracker, stock availability |
| [Research](task-templates/research/) | Competitor features, GitHub trending, startup launches, App Store |
| [Social](task-templates/social-media/) | YouTube, TikTok, Threads, Instagram |
| [Utils](task-templates/utils/) | Session video recording helpers |

## Repository layout

```text
examples/
├── cookbook/              # Jupyter notebooks
├── skills/                # Coding-agent skills
├── task-templates/        # HyperAgent scripts by category
├── agents/                # Multi-step agent apps
├── chat-with/             # Chat-with-content apps
├── <example>/             # One standalone project per directory
├── LICENSE                # MIT
└── README.md
```

Typical TypeScript example:

```text
example-name/
├── package.json
├── tsconfig.json
├── *.ts
└── README.md
```

Typical Python example:

```text
example-name/
├── pyproject.toml
├── *.py
└── README.md
```

## Related projects

| Project | Description |
| --- | --- |
| [hyperbrowserai/node-sdk](https://github.com/hyperbrowserai/node-sdk) | Official Node.js SDK |
| [hyperbrowserai/python-sdk](https://github.com/hyperbrowserai/python-sdk) | Official Python SDK |
| [hyperbrowserai/HyperAgent](https://github.com/hyperbrowserai/HyperAgent) | Open-source Playwright agent framework |
| [hyperbrowserai/mcp](https://github.com/hyperbrowserai/mcp) | Model Context Protocol server |
| [hyperbrowserai/n8n-node](https://github.com/hyperbrowserai/n8n-node) | n8n integration |
| [hyperbrowserai/hyperbrowser-app-examples](https://github.com/hyperbrowserai/hyperbrowser-app-examples) | Full Hyperbrowser-powered web apps |

## Contributing

New examples are welcome.

1. Fork the repository and create a branch.
2. Add a **self-contained** directory (or a notebook under `cookbook/`, a skill under `skills/`, a template under `task-templates/`).
3. Include a README that covers purpose, required keys, install, and a command that actually runs.
4. Use `@hyperbrowser/sdk` or `hyperbrowser` — do not reimplement the HTTP API.
5. Load secrets from the environment. Do not commit `.env`, API keys, `node_modules`, `.venv`, or generated datasets.
6. Keep the example focused. Prefer a small, runnable demo over a framework.
7. Open a pull request against `main`.

Please follow the site's terms of service and robots rules for any URL an example hits by default.

## Support

- Documentation: [hyperbrowser.ai/docs](https://www.hyperbrowser.ai/docs)
- Discord: [discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- Email: [info@hyperbrowser.ai](mailto:info@hyperbrowser.ai)
- Issues: [github.com/hyperbrowserai/examples/issues](https://github.com/hyperbrowserai/examples/issues)

Running an example uses your Hyperbrowser (and any LLM) quota. Failed jobs and long crawls still consume credits — start with a single URL and a short timeout while you learn the API.

## License

This repository is licensed under the [MIT License](LICENSE).
