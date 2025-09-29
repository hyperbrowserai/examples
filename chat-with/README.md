# Chat With... Examples

A collection of interactive chat applications powered by Hyperbrowser and AI that enable users to have conversations with various content sources.

## Overview

These examples demonstrate how to build conversational interfaces that extract, process, and interact with content from different sources using the Hyperbrowser SDK combined with Large Language Models (LLMs).

## Available Examples

### [Chat with YouTube](./chat-with-youtube)

A Streamlit web application that enables users to chat with YouTube video content using AI. The application automatically extracts video transcripts and uses OpenAI to answer questions about the video content in a conversational interface.

**Key Features:**
- Extract transcripts directly from YouTube videos using Playwright and Hyperbrowser
- Chat with AI about video content with maintained conversation history
- View raw transcript data and API interactions
- Clean, user-friendly Streamlit interface

**Tech Stack:** Python, Streamlit, Playwright, OpenAI, Hyperbrowser SDK

**Use Case:** Perfect for understanding long videos, extracting key information from educational content, or summarizing video discussions without watching the entire video.

[View Example →](./chat-with-youtube)

## Common Architecture

All examples in this collection follow similar patterns:

1. **Content Extraction**: Use Hyperbrowser SDK to navigate and extract content from web sources
2. **Content Processing**: Parse and format extracted content for AI consumption
3. **Conversational Interface**: Maintain chat history and context for natural interactions
4. **AI-Powered Responses**: Use LLMs (primarily OpenAI) to generate intelligent responses based on extracted content

## Prerequisites

Most examples require:
- Python 3.7+ or Node.js 16+ (depending on the example)
- Hyperbrowser API key (get yours at [hyperbrowser.ai](https://hyperbrowser.ai))
- OpenAI API key (from [platform.openai.com](https://platform.openai.com))

## Getting Started

Each example has its own directory with:
- Detailed README with setup instructions
- Complete source code
- Dependencies configuration
- Environment variable requirements

Navigate to the specific example directory and follow its README for installation and usage instructions.

## About Hyperbrowser

[Hyperbrowser](https://hyperbrowser.ai) provides managed browser automation infrastructure that makes web scraping and automation reliable and scalable. It's purpose-built for AI agents and developers who need to interact with web content programmatically.

## Resources

- **Documentation**: [docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- **Discord Community**: [discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- **Support**: info@hyperbrowser.ai

## Contributing

Have an idea for a new "Chat With..." example? Feel free to submit a pull request or open an issue!

## License

Each example is provided for educational and demonstration purposes. Check individual example directories for specific licensing information.