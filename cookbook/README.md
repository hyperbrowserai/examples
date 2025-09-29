# Hyperbrowser Cookbook

A collection of Jupyter notebook recipes demonstrating practical applications of the Hyperbrowser SDK for web automation, AI-powered scraping, and intelligent workflows.

## Overview

This cookbook contains hands-on examples that show how to build real-world applications using Hyperbrowser's browser automation capabilities combined with AI models. Each notebook is self-contained and focuses on a specific use case, from simple web scraping to complex multi-agent systems.

## Prerequisites

Before running these notebooks, you'll need:

1. **Hyperbrowser API Key** - Sign up at [hyperbrowser.ai](https://hyperbrowser.ai) to get your API key
2. **OpenAI API Key** - Required for notebooks that use AI analysis (most examples)
3. **Python 3.9+** installed on your system
4. **Jupyter** environment (JupyterLab, Jupyter Notebook, or VS Code with Jupyter extension)

### Installation

Install all required dependencies:

```bash
pip install -r requirements.txt
```

Or install them individually:

```bash
pip install openai playwright python-dotenv jupyter hyperbrowser ipywidgets notebook
python -m playwright install chromium
```

### Environment Setup

Create a `.env` file in the cookbook directory with your API keys:

```bash
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

## Notebook Categories

### Browser Automation & Agent Workflows

Learn how to use Hyperbrowser's autonomous browser agents to navigate websites and extract information.

- **[feature-recognition.ipynb](./feature-recognition.ipynb)** - How agents automatically handle login pages, cookie prompts, and other obstacles
- **[browser-use-authed-flows.ipynb](./browser-use-authed-flows.ipynb)** - Using persistent browser profiles for authenticated sessions (Instagram example)
- **[browser-use-hybrid-flows.ipynb](./browser-use-hybrid-flows.ipynb)** - Combining autonomous agents with traditional scraping methods
- **[hacker-news-summarizer.ipynb](./hacker-news-summarizer.ipynb)** - Basic agent example for extracting and summarizing HN posts

### Search & Discovery

Examples for finding and analyzing information across the web.

- **[apartment-finder.ipynb](./apartment-finder.ipynb)** - Multi-step apartment search with filtering and AI-powered ranking
- **[concert-ticket-finder.ipynb](./concert-ticket-finder.ipynb)** - Searching for concert tickets and availability
- **[flight-ticket-search.ipynb](./flight-ticket-search.ipynb)** - Finding flight options with price comparison
- **[local-events-finder.ipynb](./local-events-finder.ipynb)** - Discovering events in your area
- **[steam-special-suggestor.ipynb](./steam-special-suggestor.ipynb)** - Finding Steam game deals based on preferences

### E-commerce & Shopping

Intelligent shopping assistants and product analysis.

- **[shopping-assistant.ipynb](./shopping-assistant.ipynb)** - AI-powered shopping helper
- **[shopping-agents-with-vision.ipynb](./shopping-agents-with-vision.ipynb)** - Visual product analysis and recommendations
- **[doordash-location-recommender.ipynb](./doordash-location-recommender.ipynb)** - Restaurant recommendations based on location and preferences
- **[menu-recommendations.ipynb](./menu-recommendations.ipynb)** - Menu item suggestions based on dietary preferences
- **[ingredients-based-recipe-suggestor.ipynb](./ingredients-based-recipe-suggestor.ipynb)** - Recipe suggestions based on available ingredients

### Content Analysis & Research

Deep analysis of web content using AI.

- **[company-researcher.ipynb](./company-researcher.ipynb)** - Comprehensive company research and analysis
- **[news-analyst.ipynb](./news-analyst.ipynb)** - News article analysis and summarization
- **[movie-review-researcher.ipynb](./movie-review-researcher.ipynb)** - Aggregating and analyzing movie reviews
- **[review-analyzer.ipynb](./review-analyzer.ipynb)** - Product review sentiment analysis
- **[twitter-profile-analyzer.ipynb](./twitter-profile-analyzer.ipynb)** - Social media profile analysis
- **[social-media-post-finder.ipynb](./social-media-post-finder.ipynb)** - Finding and analyzing social media content

### Documentation & Development Tools

Tools for working with documentation and code.

- **[docs-qna.ipynb](./docs-qna.ipynb)** - Question answering over documentation
- **[documentation-based-coding-agent.ipynb](./documentation-based-coding-agent.ipynb)** - Building coding agents that reference documentation
- **[code-solver.ipynb](./code-solver.ipynb)** - Solving coding challenges with AI
- **[code-solver-browser-use.ipynb](./code-solver-browser-use.ipynb)** - Browser-based code challenge solver
- **[changelog-builder.ipynb](./changelog-builder.ipynb)** - Automated changelog generation

### Model Context Protocol (MCP) Servers

Building MCP servers to extend AI model capabilities with real-time data.

- **[news-mcp-server.ipynb](./news-mcp-server.ipynb)** - Real-time news extraction server for AI models
- **[wikipedia-mcp-server.ipynb](./wikipedia-mcp-server.ipynb)** - Wikipedia integration via MCP
- **[youtube-mcp-server.ipynb](./youtube-mcp-server.ipynb)** - YouTube data extraction server

### Interactive & Fun Projects

Creative applications and games.

- **[youtube_video_chat.ipynb](./youtube_video_chat.ipynb)** - Chat with YouTube video transcripts
- **[comic-trip-planner.ipynb](./comic-trip-planner.ipynb)** - Plan trips with a creative twist
- **[wiki-racer.ipynb](./wiki-racer.ipynb)** - Wikipedia racing game automation
- **[next-chess-move.ipynb](./next-chess-move.ipynb)** - Chess move analysis and suggestions

## How to Use This Cookbook

1. **Start with the basics**: Begin with `feature-recognition.ipynb` or `hacker-news-summarizer.ipynb` to understand core concepts
2. **Choose your use case**: Browse the categories above to find examples relevant to your needs
3. **Run the notebooks**: Open any notebook in Jupyter and run cells sequentially
4. **Customize**: Modify parameters and prompts to adapt examples to your specific requirements
5. **Combine patterns**: Mix techniques from multiple notebooks to build more complex applications

## Key Concepts

### Browser Use Agent

The Browser Use agent is Hyperbrowser's autonomous browser automation system that:
- Understands natural language instructions
- Navigates websites visually like a human
- Handles obstacles (logins, cookie prompts, CAPTCHAs) automatically
- Works with dynamic content and modern web applications

### Persistent Profiles

Browser profiles maintain state across sessions:
- Store authentication cookies
- Remember user preferences
- Enable authenticated workflows without re-login
- Essential for social media and personalized content automation

### Vision-Enabled Agents

Agents with vision capabilities can:
- Analyze images and screenshots
- Make decisions based on visual content
- Handle complex UI layouts
- Provide more reliable automation for visual-heavy sites

### Structured Extraction

Define schemas (using Pydantic) to extract structured data:
- Specify exactly what fields you need
- Get consistent, typed data back
- Works across different website layouts
- Enables downstream processing and analysis

## Common Patterns

### Pattern 1: Simple Autonomous Agent

```python
from hyperbrowser import AsyncHyperbrowser
from hyperbrowser.models import StartBrowserUseTaskParams

hb = AsyncHyperbrowser(api_key="your-api-key")

resp = await hb.agents.browser_use.start_and_wait(
    StartBrowserUseTaskParams(
        task="Go to example.com and extract the main heading"
    )
)
```

### Pattern 2: Authenticated Session

```python
from hyperbrowser.models import CreateSessionParams, CreateSessionProfile

resp = await hb.agents.browser_use.start_and_wait(
    StartBrowserUseTaskParams(
        task="Your task here",
        session_options=CreateSessionParams(
            profile=CreateSessionProfile(id=profile_id)
        )
    )
)
```

### Pattern 3: Structured Data Extraction

```python
from pydantic import BaseModel
from hyperbrowser.models.extract import StartExtractJobParams

class Product(BaseModel):
    name: str
    price: float
    url: str

resp = hb.extract.start_and_wait(
    StartExtractJobParams(
        urls=["https://example.com/products"],
        schema=Product
    )
)
```

### Pattern 4: Multi-Stage Pipeline

```python
# Stage 1: Extract raw data with agent
search_results = await search_apartments(location, filters)

# Stage 2: Analyze and rank with LLM
ranked_results = await rank_with_ai(search_results, preferences)

# Stage 3: Present results
display(Markdown(ranked_results))
```

## Tips & Best Practices

1. **Start simple**: Begin with clear, specific instructions to the agent
2. **Use vision when needed**: Enable `use_vision=True` for sites with complex visual layouts
3. **Handle authentication**: Use persistent profiles for authenticated workflows
4. **Structure your data**: Define Pydantic schemas for consistent extraction
5. **Chain operations**: Combine autonomous agents with LLM analysis for powerful workflows
6. **Test incrementally**: Run notebook cells one at a time to debug issues
7. **Respect rate limits**: Be mindful of website terms of service and rate limits
8. **Use proxies when needed**: Set `use_proxy=True` for geo-restricted content

## Troubleshooting

**Agent not completing task**
- Make instructions more specific and step-by-step
- Enable vision mode if the site is visually complex
- Check if authentication is required (use persistent profiles)

**Extraction returning incomplete data**
- Verify your Pydantic schema matches available data
- Check if the page requires scrolling or interaction first
- Try using an agent-based approach instead of direct extraction

**Rate limiting or blocking**
- Use `use_proxy=True` in session options
- Add delays between requests
- Use persistent profiles to appear more like a regular user

## Resources

- **Documentation**: [docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- **Discord Community**: [discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- **Website**: [hyperbrowser.ai](https://hyperbrowser.ai)
- **Support**: info@hyperbrowser.ai

## Contributing

Found a bug or have a recipe idea? Open an issue or submit a pull request to the main repository.

## License

These examples are provided for educational and demonstration purposes. When using these patterns in production, ensure you comply with the terms of service of the websites you're automating.