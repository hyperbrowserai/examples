**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# AI Newsletter Automation

Automated newsletter system that scrapes the latest AI news from top sources (Anthropic, OpenAI, DeepMind, Hacker News), generates personalized content using OpenAI, and delivers customized newsletters to subscribers via email.

## Features

- Multi-source scraping from major AI news sources
- AI-powered content generation with OpenAI GPT-4
- Personalized delivery with recipient names
- Email integration through Resend API
- TypeScript with full type safety

## News Sources

- [Anthropic News](https://www.anthropic.com/news)
- [OpenAI Blog](https://openai.com/blog)
- [DeepMind Blog](https://deepmind.com/blog)
- [Hacker News Front Page](https://news.ycombinator.com/front)

## Prerequisites

- Node.js (v18 or later)
- API keys for:
  - **Hyperbrowser**: Get yours at [hyperbrowser.ai](https://hyperbrowser.ai)
  - **OpenAI**: Create at [platform.openai.com](https://platform.openai.com)
  - **Resend**: Sign up at [resend.com](https://resend.com) (domain verification required)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
   OPENAI_API_KEY=your_openai_api_key
   RESEND_API_KEY=your_resend_api_key
   ```

3. **Configure subscribers:**
   Edit the `users` array in `trend-newsletter.ts`:
   ```typescript
   const users = [
     { name: "Your Name", email: "your.email@example.com" },
     // Add more subscribers...
   ];
   ```

4. **Run the newsletter:**
   ```bash
   npx ts-node trend-newsletter.ts
   ```

## Configuration

### Adding News Sources

Modify the `urls` array in `trend-newsletter.ts`:

```typescript
const urls = [
  "https://www.anthropic.com/news",
  "https://openai.com/blog",
  "https://your-new-source.com/news", // Add here
];
```

### Customizing Newsletter Content

Adjust the `SYSTEM_PROMPT` to change style and tone:

```typescript
const SYSTEM_PROMPT = `Your custom instructions for the AI...`;
```

### Email Settings

Update email configuration (requires verified Resend domain):

```typescript
const emailResponse = await resend.emails.send({
  from: "your-verified-domain@example.com",
  to: user.email,
  subject: "Your Custom Newsletter Title",
  text: personalizedNewsletter,
});
```

## How It Works

1. **Scrape**: Uses Hyperbrowser SDK to scrape markdown content from configured news sources
2. **Process**: Combines all scraped content into a single markdown document
3. **Generate**: OpenAI GPT-4 creates a friendly, engaging newsletter from the content
4. **Personalize**: Each newsletter is customized with the recipient's name
5. **Deliver**: Sends personalized newsletters via Resend to all subscribers

## Example Output

```
🔍 Starting to scrape pages...
🌐 Scraping https://www.anthropic.com/news
🌐 Scraping https://openai.com/blog
🌐 Scraping https://deepmind.com/blog
🌐 Scraping https://news.ycombinator.com/front
🤖 Generating newsletter draft with OpenAI...
📧 Sent newsletter to user@example.com: { id: 'email-id' }
📨 All newsletters generated and sent successfully!
```

## Code Structure

**Main file**: `trend-newsletter.ts`

Key components:
- `urls` - Array of news sources to scrape
- `users` - Subscriber list with names and emails
- `SYSTEM_PROMPT` - Instructions for OpenAI newsletter generation
- `main()` - Orchestrates scraping, generation, and delivery

**Dependencies**:
- `@hyperbrowser/sdk` - Web scraping via official SDK
- `openai` - AI content generation
- `resend` - Email delivery service
- `zod` - Schema validation
- `dotenv` - Environment variable management

## Important Notes

- Be mindful of API rate limits for all services
- Resend domain must be verified before sending emails
- Monitor generated content for accuracy and appropriate tone
- Includes error handling for failed scrapes and email delivery

---

Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates
