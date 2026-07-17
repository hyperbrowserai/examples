# llms.txt generator

A CLI tool to **crawl websites** using [Hyperbrowser](https://hyperbrowser.ai) and generate an `llms.txt` file containing **short, LLM-ready descriptions of each page**. Summaries are created with OpenAI.

Useful for:

- SEO optimization
- Helping LLMs index your site with structured, concise descriptions
- Quick website overviews

---

## 🚀 Features

- 🌍 Crawl any website with [Hyperbrowser](https://hyperbrowser.ai)
- 🤖 Summarize each page into **3–5 word titles + short descriptions**
- 📄 Auto-generates `llms.txt` in your chosen directory
- 🔗 Saves discovered URLs into `crawl-urls.txt`

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
cd llms-txt-generator
bun install
```

### CLI Usage

```bash
bun run index.ts
✔ Enter the start URL: https://hyperbrowser.ai
✔ Max number of pages to crawl: 5
✔ Output directory: output
```

## Example output

```bash
✔ 🌍 Crawl completed.
🔗 URL Found: https://hyperbrowser.ai
🔗 URL Found: https://hyperbrowser.ai/blog
🔗 URL Found: https://hyperbrowser.ai/privacy-policy
🔗 URL Found: https://hyperbrowser.ai/terms
🔗 URL Found: https://hyperbrowser.ai/blog/introducing-hyperbrowser-mcp-server

Summarizing |████████████████████████████████████████| 100% || 5/5 Pages
✅ All summaries generated.
📄 llms.txt written to output/llms.txt

```

## Example llms.txt file

```
# https://hyperbrowser.ai llms.txt

- [Hyperbrowser](https://hyperbrowser.ai): Browser-as-a-Service for AI agents and apps.
- [Web Scraping Tools](https://hyperbrowser.ai/blog): Compare SSR, CSR, and rendering approaches.
- [Hyperbrowser](https://hyperbrowser.ai/): Privacy policy explains data collection and usage.
- [Terms of Service](https://hyperbrowser.ai/terms): Governs use of Hyperbrowser and privacy policy.
- [Hyperbrowser MCP Server](https://hyperbrowser.ai/blog/introducing-hyperbrowser-mcp-server): Connect LLMs to the web with AI-powered tools for scraping, automation, and data extraction.

```

## API Costs 💰

- Hyperbrowser: ~$0.01-0.05 per page (depending on pages to crawl)
- OpenAI GPT-4: ~$0.03-0.10 per page summary (depending on content length)

## Contributing 🤝

Feel free to submit issues, feature requests, or pull requests to improve the tool!

## License 📝

MIT License - feel free to use this tool to generate llms.txt for your websites!
