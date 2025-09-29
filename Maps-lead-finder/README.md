# Maps Lead Finder

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

An intelligent CLI tool that automates business lead generation from Google Maps using HyperAgent AI. Simply specify a location and business type, and let AI navigate Google Maps to extract structured business information including names, addresses, and contact details.

## Features

- 🤖 **AI-Powered Automation**: Uses HyperAgent with OpenAI GPT-4o for intelligent browser control
- 🗺️ **Google Maps Integration**: Automatically searches and extracts business data from Google Maps
- 💼 **Lead Extraction**: Returns structured business information (name, address, contact details)
- 🎯 **Interactive CLI**: Simple prompts for location and business type input
- ✅ **Schema Validation**: Uses Zod for type-safe output validation
- 📊 **Structured Output**: Returns clean, validated business data ready for CRM import

## Prerequisites

- Node.js (v18 or higher recommended)
- API keys for:
  - **Hyperbrowser**: Get yours at [hyperbrowser.ai](https://hyperbrowser.ai)
  - **OpenAI**: Create at [platform.openai.com](https://platform.openai.com)

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env` file (use `.env.example` as template):
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Run the lead finder:**
   ```bash
   npx tsx maps-lead-finder.ts
   ```

## Usage

When you run the script, you'll be prompted for two inputs:

```bash
Enter the area to search (e.g. 'San Francisco, CA'): New York, NY
Enter the business type to find (e.g. 'restaurants'): coffee shops
```

The AI agent will then:
1. Navigate to Google Maps
2. Search for the specified business type in the given location
3. Extract data from at least 5 businesses
4. Return structured results

## Example Output

```json
[
  {
    "name": "Blue Bottle Coffee",
    "address": "160 Berry St, Brooklyn, NY 11249",
    "contact": "(510) 653-3394"
  },
  {
    "name": "La Colombe Coffee Roasters",
    "address": "400 Lafayette St, New York, NY 10003",
    "contact": "(212) 677-5834"
  },
  // ... more businesses
]
```

## How It Works

1. **User Input**: Interactive prompts collect location and business type
2. **AI Navigation**: HyperAgent controls a browser to search Google Maps
3. **Data Extraction**: AI identifies and extracts business information from search results
4. **Schema Validation**: Zod ensures output matches expected structure
5. **Results Display**: Validated business leads are displayed in the terminal

## Code Structure

**Main file**: `maps-lead-finder.ts`

Key components:
- `getUserInput()` - Interactive CLI prompts using readline
- `schema` - Zod validation schema for business data structure
- `HyperAgent` - AI-powered browser automation agent
- `ChatOpenAI` - OpenAI GPT-4o model for intelligent task execution

**Dependencies**:
- `@hyperbrowser/agent` - AI agent for browser automation
- `@langchain/openai` - OpenAI integration via LangChain
- `zod` - Runtime type validation and schema enforcement
- `dotenv` - Environment variable management
- `readline` - Node.js built-in for CLI input

## Configuration

### Modify Search Parameters

You can adjust the number of results or customize the search prompt:

```typescript
const result = await agent.executeTask(
  `Navigate to google maps, find the businesses in the area of ${area} and ${businessType}. Return a list of at least 10 businesses with their name, address and contact information.`, // Change "5" to "10"
  {
    outputSchema: schema,
  }
);
```

### Customize Output Schema

Extend the Zod schema to capture additional fields:

```typescript
const schema = z.object({
  businesses: z.array(
    z.object({
      name: z.string(),
      address: z.string(),
      contact: z.string(),
      website: z.string().optional(),  // Add website
      rating: z.number().optional(),   // Add rating
    }),
  ),
});
```

## Use Cases

- 🎯 **Lead Generation**: Find potential business clients in specific industries
- 📍 **Market Research**: Discover competitor locations and contact information
- 📧 **Sales Prospecting**: Build targeted outreach lists for cold emails
- 🗺️ **Location Analysis**: Map business density in different areas
- 📊 **Database Building**: Populate CRM systems with local business data

## Important Notes

- The script waits for complete execution before returning results
- Progress is displayed step-by-step via the `onStep` callback
- Agent automatically closes after task completion
- Ensure stable internet connection for reliable Google Maps access
- Results depend on what's publicly available on Google Maps

## Troubleshooting

**API Key Issues:**
- Verify both API keys are set correctly in `.env`
- Check that your OpenAI account has available credits

**No Results Returned:**
- Try more specific location (e.g., "Manhattan, New York" vs "New York")
- Use common business type terms (e.g., "restaurants" not "eateries")

**Agent Timeout:**
- Google Maps may be slow to load; be patient
- Check your internet connection

---

Follow [@hyperbrowser](https://twitter.com/hyperbrowser) for updates
