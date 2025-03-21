import os
import re
import time
import streamlit as st
from playwright.sync_api import sync_playwright
from playwright.sync_api import Page
from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from hyperbrowser.client.sync import Hyperbrowser
from hyperbrowser.models.session import CreateSessionParams

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def get_session():
    client = Hyperbrowser(
        api_key=os.getenv("HYPERBROWSER_API_KEY"),
    )
    session = client.sessions.create(CreateSessionParams(use_proxy=True))
    return session


def extract_video_id(url):
    """Extract the YouTube video ID from a URL."""
    # Regular expression pattern for YouTube URLs
    patterns = [
        r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\s]+)",
        r"(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^\?\s]+)",
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)

    return None


def get_youtube_transcript(page: Page, url: str):
    """Get the transcript of a YouTube video directly from the page using Playwright."""
    try:
        # Wait for the video player to load
        description_selector = page.wait_for_selector(
            "div#description", state="visible"
        )
        if description_selector is None:
            return None
        description_selector.click()

        transcript_show_more_selector = page.wait_for_selector(
            'button[aria-label="Show transcript"]', state="visible"
        )
        if transcript_show_more_selector is None:
            return None
        transcript_show_more_selector.click()

        transcript_display_selector = page.wait_for_selector(
            "ytd-transcript-segment-list-renderer", state="visible"
        )
        if transcript_display_selector is None:
            return None

        transcript_segments: list[dict] = transcript_display_selector.evaluate(
            """()=>(
                    [...document
                        .querySelector("ytd-transcript-segment-list-renderer")
                        .querySelector("div#segments-container")
                        .querySelectorAll("ytd-transcript-segment-renderer")
                    ].map(e=>({
                        timestamp: e.querySelector("div.segment-timestamp").innerText,
                        text: e.querySelector("yt-formatted-string").innerText
                        })
                    )
                )"""
        )

        # Return the raw transcript data as JSON
        if transcript_segments and isinstance(transcript_segments, list):
            return transcript_segments
        else:
            st.error("Failed to extract transcript segments")
            return None

    except Exception as e:
        st.error(f"Error getting transcript: {str(e)}")
        return None


def format_transcript(transcript_segments, include_timestamps=True):
    """Format transcript segments into a readable string."""
    if not transcript_segments:
        return ""

    formatted_text = ""
    for segment in transcript_segments:
        if include_timestamps:
            formatted_text += f"[{segment['timestamp']}] {segment['text']}\n"
        else:
            formatted_text += f"{segment['text']} "

    return formatted_text.strip()


def get_video_title(page: Page, url: str):
    """Use Playwright to get the video title and other metadata."""
    try:
        page.goto(url, wait_until="domcontentloaded")

        # Get video title
        title: str = page.evaluate("document.title")

        # Remove the " - YouTube" suffix if present
        if " - YouTube" in title:
            title = title.replace(" - YouTube", "")

        return title
    except Exception as e:
        st.error(f"Error getting video info: {str(e)}")
        return "Unknown Video"


@st.cache_data(show_spinner=False)
def get_all_video_info(url: str):
    with sync_playwright() as playwright:
        session = get_session()
        browser_url = session.ws_endpoint
        if browser_url is None:
            raise Exception("Browser URL not found")

        browser = playwright.chromium.connect_over_cdp(browser_url)
        context = browser.new_context()
        page = context.new_page()

        # Get video title
        video_title = get_video_title(page, url)

        page.keyboard.press("k")
        # Brief delay to ensure the pause takes effect
        time.sleep(0.5)

        # Get video transcript directly from YouTube page
        transcript_segments = get_youtube_transcript(page, url)
        if transcript_segments:
            st.success(f"Successfully fetched transcript for: {video_title}")
            return transcript_segments, video_title
        else:
            st.error("Failed to retrieve transcript for this video.")
            return None, None


def chat_with_transcript(transcript_segments, prompt, chat_history=None):
    """Use OpenAI to chat with the transcript content."""
    try:
        # Format the transcript for the prompt
        formatted_transcript = format_transcript(
            transcript_segments, include_timestamps=False
        )

        # Start with system message
        messages: list[ChatCompletionMessageParam] = [
            {
                "role": "system",
                "content": f"You are an AI assistant that helps users understand the content of a YouTube video. Here is the transcript of the video:\n\n{formatted_transcript}\n\nAnswer questions based only on the content of this transcript. If you don't know the answer, preface your response by saying that you are inferring the answer based on your training data, and not the transcript.",
            },
        ]

        # Add chat history to provide context
        if chat_history:
            for prev_query, prev_response in chat_history:
                messages.append({"role": "user", "content": prev_query})
                messages.append({"role": "assistant", "content": prev_response})

        # Add current user query
        messages.append({"role": "user", "content": prompt})

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini", messages=messages, temperature=0.7, max_tokens=500
        )

        # Store the full response as a dictionary
        api_response = {
            "prompt": messages,
            "response": response.model_dump(),
            "timestamp": time.time(),
        }

        return response.choices[0].message.content, api_response
    except Exception as e:
        return f"Error: {str(e)}", None


st.set_page_config(
    layout="centered",  # Can be "centered" or "wide". In the future also "dashboard", etc.
    initial_sidebar_state="auto",  # Can be "auto", "expanded", "collapsed"
    page_title="Chat with YouTube Video - Hyperbrowser",  # String or None. Strings get appended with "• Streamlit".
    page_icon="https://hyperbrowser-assets-bucket.s3.us-east-1.amazonaws.com/favicon.ico",  # String, anything supported by st.image, or None.
)


def main():
    # Create two columns for the header
    col1, col2 = st.columns([3, 2])

    # Add logo in the left column - using local file
    with col1:
        st.image(
            "https://hyperbrowser-assets-bucket.s3.us-east-1.amazonaws.com/wordmark-dark.png",
            width=200,
        )

    # Add hyperbrowser link in the right column, aligned to the right
    with col2:
        st.html(
            """
        <div style="text-align: right; display: flex; justify-content: flex-end; height: 100%; align-items: center;">
            <p style="margin: 0px;">
                Powered by <a href="https://hyperbrowser.ai" target="_blank">hyperbrowser.ai</a>
            </p>
        </div>
        """,
        )

    st.title("YouTube Video Chat")
    st.write("Chat with the content of any YouTube video using AI")

    if "url" in st.query_params:
        default_url = st.query_params["url"]
        if default_url == "":
            default_url = None
    else:
        default_url = None

    # Input for YouTube URL
    youtube_url = st.text_input(
        "Enter Youtube URL:",
        label_visibility="collapsed",
        value=default_url,
        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    )

    if youtube_url:
        video_id = extract_video_id(youtube_url)

        if not video_id:
            st.error("Invalid YouTube URL. Please enter a valid URL.")
        else:
            # Initialize or retrieve session state variables
            if "transcript" not in st.session_state:
                st.session_state.transcript = None
                st.session_state.video_title = None

            # Initialize OpenAI API call history
            if "api_history" not in st.session_state:
                st.session_state.api_history = []

            with st.spinner("Fetching video information..."):
                transcript_segments, video_title = get_all_video_info(youtube_url)
                st.session_state.transcript = transcript_segments
                st.session_state.video_title = video_title

            # Display video information
            if st.session_state.transcript:
                st.subheader(f"{st.session_state.video_title}")

                # Initialize chat history
                if "chat_history" not in st.session_state:
                    st.session_state.chat_history = []

                # Input for user question - moved up to capture it before displaying history
                user_question = st.chat_input("Ask a question about the video:")

                # Display chat history
                if len(st.session_state.chat_history) > 0:
                    for i, (question, answer) in enumerate(
                        st.session_state.chat_history
                    ):
                        with st.chat_message("user"):
                            st.write(question)
                        with st.chat_message("assistant"):
                            st.write(answer)
                # Only show welcome message if chat history is empty AND no question is asked yet
                elif not user_question:
                    # Display a more inviting message when chat history is empty
                    with st.chat_message("assistant"):
                        st.markdown(
                            """
                        👋 **Hello!** I've analyzed the transcript of this video.
                        
                        Ask me any question about the video content using the chat box below, and I'll provide answers based on what was discussed in the video.
                        """
                        )

                # Process user question if entered
                if user_question:
                    # Display user question
                    with st.chat_message("user"):
                        st.write(user_question)

                    # Generate and display AI response
                    with st.chat_message("assistant"):
                        with st.spinner("Thinking..."):
                            ai_response, api_data = chat_with_transcript(
                                st.session_state.transcript,
                                user_question,
                                chat_history=(
                                    st.session_state.chat_history[-5:]
                                    if st.session_state.chat_history
                                    else None
                                ),
                            )
                            st.write(ai_response)

                            # Store the API interaction data if available
                            if api_data:
                                st.session_state.api_history.append(api_data)

                    # Add to chat history
                    st.session_state.chat_history.append((user_question, ai_response))

                    # Rerun the app to update the UI
                    st.rerun()

                # Option to view transcript
                if st.checkbox("Show video transcript"):
                    if st.session_state.transcript:
                        formatted_transcript = format_transcript(
                            st.session_state.transcript
                        )
                        st.text_area("Transcript", formatted_transcript, height=200)

                        # Optionally, show raw JSON data
                        if st.checkbox("Show raw transcript data"):
                            st.json(st.session_state.transcript)

                # Option to view API history
                if st.checkbox("Show OpenAI API History"):
                    if st.session_state.api_history:
                        st.json(st.session_state.api_history)
                    else:
                        st.info("No API interaction history available.")

                # Clear chat history button
                if st.button("Clear Chat History"):
                    st.session_state.chat_history = []
                    st.session_state.api_history = []
                    st.rerun()  # Using st.rerun() instead of st.experimental_rerun()
            else:
                st.error("Failed to retrieve transcript for this video.")


if __name__ == "__main__":
    main()
