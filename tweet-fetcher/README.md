**Built with [Hyperbrowser](https://hyperbrowser.ai)**

# Tweet Fetcher

A powerful CLI tool for extracting tweets and followers from Twitter/X profiles using Hyperbrowser's browser automation and AI-powered data extraction. Perfect for social media analysis, research, and lead generation.

## Why Hyperbrowser?

[Hyperbrowser](https://hyperbrowser.ai) is the **Internet for AI**  purpose-built for developers creating AI agents and automating web tasks. Skip the infrastructure headaches and focus on building.

## Features

- **Smart Extraction**: Uses Hyperbrowser's Extract API with structured schemas for reliable data extraction
- **Tweet Collection**: Fetches the 10 most recent tweets with engagement metrics (likes, retweets, replies)
- **Follower Scraping**: Extracts verified followers from Twitter profiles
- **Persistent Sessions**: Creates and reuses browser profiles for consistent scraping
- **Proxy Support**: Built-in proxy configuration for reliable access
- **Stealth Mode**: Uses anti-detection features (stealth, adblock, cookie handling)
- **CLI Interface**: Rich terminal UI with progress indicators and colored output

## Quick Start

1. **Get your API key**: https://hyperbrowser.ai
2. **Install**: `uv sync` (or `pip install -r pyproject.toml`)
3. **Configure**: Add `HYPERBROWSER_API_KEY` to `.env`
4. **Run**: `python main.py tweets elonmusk`

## Installation

```bash
# Install dependencies using uv (recommended)
uv sync

# Or using pip
pip install click hyperbrowser openai pydantic pydantic-settings python-dotenv rich

# Set environment variables
export HYPERBROWSER_API_KEY="your_hyperbrowser_api_key"
```

## Configuration

Create a `.env` file in the project directory:

```bash
# Required
HYPERBROWSER_API_KEY=your_hyperbrowser_api_key  # Get at https://hyperbrowser.ai

# Optional: Proxy configuration for reliable access
PROXY_SERVER_URL=http://your-proxy:port
PROXY_SERVER_USERNAME=your_username
PROXY_SERVER_PASSWORD=your_password

# Optional: Reuse existing profile ID
PROFILE_ID=your_profile_id
```

## Usage

### Extract Tweets

Fetch the 10 most recent tweets from a profile:

```bash
python main.py tweets elonmusk
```

Output saved to: `elonmusk_tweets.json`

**Example output structure:**
```json
{
  "tweets": [
    {
      "content": "Tweet text here...",
      "num_likes": 15234,
      "num_retweets_and_quotes": 1234,
      "num_replies": 567,
      "published_at": "2025-09-29T10:30:00Z"
    }
  ]
}
```

### Extract Followers

Fetch verified followers from a profile:

```bash
python main.py followers elonmusk
```

Output saved to: `elonmusk_followers.json`

**Example output structure:**
```json
{
  "followers": ["@user1", "@user2", "@user3", ...]
}
```

### Extract Both

Get both tweets and followers in one command:

```bash
python main.py all elonmusk
```

### Session Management

#### Create a New Session

For initial setup or when you need to authenticate manually:

```bash
python main.py session
```

This creates a persistent browser profile and returns a live session URL where you can:
- Log into Twitter/X manually
- Solve any CAPTCHAs
- Complete any verification steps

The session ID and profile ID are saved locally for reuse.

#### Stop a Session

Close an active browser session:

```bash
# Stop the most recent session
python main.py stop

# Stop a specific session
python main.py stop --session-id <session-id>
```

## CLI Commands

```bash
python main.py [command] [options]

Commands:
  session              Create a new browser session for manual authentication
  tweets <handle>      Extract tweets from a Twitter profile
  followers <handle>   Extract verified followers from a Twitter profile
  all <handle>         Extract both tweets and followers
  stop                 Stop an active browser session

Options:
  --session-id TEXT    Session ID to stop (for stop command)
  --help              Show help message
```

## How It Works

1. **Profile Management**: Creates or reuses a persistent browser profile stored in `.profile`
2. **Session Creation**: Launches a browser session with stealth mode, proxy, and adblock enabled
3. **Schema-Based Extraction**: Uses Pydantic models to define expected data structure:
   - `AllTweets`: List of tweets with content and engagement metrics
   - `AllFollowers`: List of follower handles
4. **AI Extraction**: Hyperbrowser's Extract API uses AI to parse the rendered page and extract structured data
5. **JSON Output**: Results are saved to JSON files for easy processing

## Project Structure

- **`main.py`** - CLI entrypoint with Click commands and extraction logic
- **`config.py`** - Settings management using Pydantic with `.env` file support
- **`schemas.py`** - Pydantic models defining data structures for extraction
- **`.profile`** - Auto-generated file storing persistent profile ID
- **`.session`** - Auto-generated file storing active session ID

## Data Schemas

### Tweet Schema
```python
class Tweet(BaseModel):
    content: str                      # Tweet text
    num_likes: int                    # Like count
    num_retweets_and_quotes: int      # Retweet + quote count
    num_replies: int                  # Reply count
    published_at: str                 # Timestamp
```

### Followers Schema
```python
class AllFollowers(BaseModel):
    followers: list[str]              # List of Twitter handles
```

## Advanced Configuration

### Custom Proxy Setup

Configure proxy settings in `.env` for reliable access:

```bash
PROXY_SERVER_URL=http://proxy.example.com:8080
PROXY_SERVER_USERNAME=myusername
PROXY_SERVER_PASSWORD=mypassword
```

### Profile Persistence

The tool automatically creates and persists browser profiles to maintain:
- Login sessions
- Cookies and localStorage
- Browser fingerprint consistency

Profile ID is stored in `.profile` and reused across runs.

## Use Cases

**Perfect for**: Social media research, competitor analysis, influencer tracking, lead generation, sentiment analysis, trend monitoring, audience research.

## Development

```bash
# Install dev dependencies
uv sync --dev

# Format code
isort .
ruff check .

# Run with different profiles
PROFILE_ID=custom_profile python main.py tweets example
```

## Technical Stack

- **[@hyperbrowser/sdk](https://pypi.org/project/hyperbrowser/)**: Browser automation and AI extraction
- **Click**: CLI framework with rich command structure
- **Rich**: Beautiful terminal UI with progress indicators
- **Pydantic**: Data validation and settings management
- **Python 3.13+**: Modern Python features

## Troubleshooting

### Rate Limiting
If you encounter rate limits, use the `session` command to authenticate manually and solve any CAPTCHAs.

### Authentication Required
Run `python main.py session` to create a live session where you can log into Twitter manually. The session will be persisted for future runs.

### Proxy Issues
Ensure your proxy credentials are correct in `.env` and the proxy server is accessible.

---

=€ **Scale your AI development** with [Hyperbrowser](https://hyperbrowser.ai) | Follow [@hyperbrowser](https://x.com/hyperbrowser)