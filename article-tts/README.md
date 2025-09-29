# WebWhisper - Web to Voice Converter

**Built with [Hyperbrowser](https://hyperbrowser.ai) and [ElevenLabs](https://elevenlabs.io)**

A Streamlit web application that extracts article content from any URL and converts it into natural-sounding speech. Perfect for accessibility, productivity, and consuming content on the go.

## Features

- Web Content Extraction: Uses Hyperbrowser SDK to extract clean article content from any URL
- AI-Powered Speech: Converts text to natural-sounding audio using ElevenLabs TTS
- Multiple Voices: Choose from 9 different voice options (Rachel, Domi, Bella, Antoni, and more)
- Multilingual Support: Select between monolingual and multilingual models
- Interactive UI: Clean Streamlit interface with real-time extraction and conversion
- Audio Download: Save generated audio files as MP3

## Prerequisites

- Python 3.13 or higher
- API keys for:
  - Hyperbrowser SDK (get at [hyperbrowser.ai](https://hyperbrowser.ai))
  - ElevenLabs (get at [elevenlabs.io](https://elevenlabs.io))

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd article-tts
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   Create a `.env` file in the project root:
   ```env
   HYPERBROWSER_API_KEY=your_hyperbrowser_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```

## Usage

### Running the Application

```bash
streamlit run app.py
```

The application will open in your default web browser at `http://localhost:8501`.

### Using the Interface

1. **Configure API Keys**: Enter your Hyperbrowser and ElevenLabs API keys in the sidebar (or use environment variables)
2. **Enter URL**: Paste the URL of the article you want to convert
3. **Select Voice Options** (optional):
   - Choose your preferred voice (e.g., Rachel, Josh, Bella)
   - Select TTS model (monolingual or multilingual)
4. **Extract Content**: Click "Extract" to pull article content from the URL
5. **Convert to Speech**: Click "Convert to speech" to generate audio
6. **Listen or Download**: Play the audio in-browser or download the MP3 file

### Example Workflow

```bash
# Start the application
streamlit run app.py

# In the browser:
# 1. Enter URL: https://example.com/interesting-article
# 2. Click "Extract"
# 3. Review extracted content
# 4. Choose voice: "Rachel"
# 5. Click "Convert to speech"
# 6. Download the generated audio
```

## How It Works

1. **Content Extraction**: Hyperbrowser SDK extracts structured article data (title, author, abstract, full content) using AI-powered extraction with a defined schema
2. **Stealth Mode**: Uses stealth settings and cookie acceptance to reliably access content
3. **Speech Generation**: ElevenLabs API converts the extracted text into natural-sounding speech with customizable voices
4. **Audio Delivery**: Audio is streamed back to the browser for immediate playback or download

## Configuration

### Extraction Schema

The app extracts the following fields from web pages:
- `title`: Article title
- `author`: Article author (optional)
- `abstract`: Article summary (optional)
- `fullContent`: Full article text

### Voice Options

Available voices:
- Rachel, Domi, Bella (female voices)
- Antoni, Josh, Arnold, Adam, Sam (male voices)

### TTS Models

- `eleven_monolingual_v1`: Optimized for English
- `eleven_multilingual_v1`: Supports multiple languages

## Dependencies

- `streamlit==1.42.2` - Web interface framework
- `hyperbrowser==0.30.0` - Web scraping and extraction
- `elevenlabs==1.52.0` - Text-to-speech conversion
- `python-dotenv==1.0.1` - Environment variable management

## API Credits

ElevenLabs API usage is tracked and displayed in the sidebar. The app shows remaining character credits for your account.

## Error Handling

The application includes robust error handling for:
- Invalid API keys
- Failed content extraction
- Speech generation errors
- Network connectivity issues

## Development

### Project Structure

```
article-tts/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── pyproject.toml        # Project metadata (uv package manager)
├── uv.lock               # Dependency lock file
├── .env                  # Environment variables (not tracked)
└── README.md             # This file
```

### Running with UV

This project uses `uv` for dependency management:

```bash
# Install with uv
uv pip install -r requirements.txt

# Run the app
streamlit run app.py
```

## Notes

- ElevenLabs API has character limits based on your subscription plan
- Hyperbrowser SDK requires an active API key for web extraction
- Large articles may take longer to process and consume more API credits
- Audio files are generated in MP3 format by default

---

**Built with Hyperbrowser SDK** - Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
