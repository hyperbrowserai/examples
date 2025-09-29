# Agents

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A collection of AI-powered agent examples demonstrating how to combine Hyperbrowser's browser automation capabilities with Large Language Models to create intelligent web automation workflows.

## Overview

These examples showcase agent-based patterns where LLMs guide browser automation, analyze web content, and make intelligent decisions. Each agent demonstrates a different use case for combining web automation with AI reasoning.

## Examples

### Budget Travel Agent

An intelligent travel planning agent that automates searches on Google Travel Explore and uses OpenAI's Vision API to analyze and extract structured travel data.

**Features:**
- Automated Google Travel search with configurable parameters
- Visual analysis using OpenAI GPT-4 Vision
- Structured data extraction (destinations, prices, dates, travel times)
- Interactive Streamlit UI with pagination
- Location validation using geocoding
- Direct links to Google Flights for booking

**[View Example →](./budget-travel-agent/)**

## Common Architecture Patterns

### Agent-Based Automation
All examples in this directory follow an agent pattern:

1. **Task Planning**: LLM receives user intent and plans actions
2. **Browser Automation**: Hyperbrowser executes the planned actions
3. **Data Extraction**: Content is captured (screenshots, HTML, etc.)
4. **Intelligent Analysis**: LLM analyzes the extracted data
5. **Structured Output**: Results are formatted and presented to the user

### Key Technologies

- **Hyperbrowser SDK**: Browser automation and session management
- **OpenAI API**: LLM reasoning and vision capabilities
- **Playwright**: Browser control via CDP protocol
- **Pydantic**: Data validation and structured outputs
- **Streamlit**: Interactive web interfaces (where applicable)

## Getting Started

Each agent example has its own directory with:
- Dedicated README with specific instructions
- Independent dependencies and configuration
- Example code demonstrating the pattern

Navigate to individual agent directories for detailed setup and usage instructions.

## Prerequisites

Most agents require:
- **Hyperbrowser API Key**: Get one at [hyperbrowser.ai](https://hyperbrowser.ai)
- **OpenAI API Key**: Get one at [platform.openai.com](https://platform.openai.com)
- **Python 3.8+** or **Node.js 18+** (depending on the example)

## Environment Variables

Common environment variables across agents:

```bash
HYPERBROWSER_API_KEY="your_hyperbrowser_key"
OPENAI_API_KEY="your_openai_key"
```

Store these in a `.env` file in the specific agent directory.

## Use Cases

Agent-based automation is ideal for:

- **Research Automation**: Gather and analyze information from multiple sources
- **Price Monitoring**: Track and compare prices with intelligent filtering
- **Content Curation**: Find and summarize relevant content based on criteria
- **Form Automation**: Fill out complex forms with AI-guided decisions
- **Travel Planning**: Search, compare, and analyze travel options
- **Market Intelligence**: Competitive analysis with reasoning and insights

## Resources

- **Documentation**: [docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- **Discord Community**: [discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- **Support**: info@hyperbrowser.ai
- **Twitter**: [@hyperbrowser](https://x.com/hyperbrowser)

## Contributing

Each agent is designed as a standalone example. Feel free to use these as templates for your own agent-based automation workflows.