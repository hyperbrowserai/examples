# Changelog Builder 📝

**Built with [Hyperbrowser](https://hyperbrowser.ai)**

A powerful Streamlit web application that automatically generates comprehensive changelogs by analyzing git commit differences between any two references in a GitHub repository. Perfect for release management, documentation, and tracking project evolution.

## ✨ Features

- 🔍 **Smart Git Comparison**: Compare any two commits, branches, or tags from a GitHub repository
- 📊 **Visual Commit Exploration**: Browse commits and file changes with expandable sections
- 🤖 **AI-Powered Changelogs**: Uses OpenAI to generate human-readable summaries
- 📂 **Multiple Formats**:
  - **Commit Diff View**: Traditional chronological listing with detailed file changes
  - **Categorized Changelog**: Auto-categorized by commit type (features, bugfixes, docs, tests, etc.)
  - **AI-Processed Changelog**: Intelligent changelog clearly separating additions, removals, changes, and fixes
  - **Raw Data View**: Complete JSON data for custom processing
- 💾 **Download Options**: Export any changelog format as markdown
- 🎯 **Web Scraping Powered**: Uses Hyperbrowser's Extract API to reliably fetch GitHub comparison data

## 🔧 Installation

1. Install dependencies using uv (recommended):
```bash
uv pip install -e .
```

Or using pip:
```bash
pip install -r requirements.txt
```

2. **Get API keys**:
   - Hyperbrowser: [https://hyperbrowser.ai](https://hyperbrowser.ai)
   - OpenAI (optional, for AI changelogs): [https://platform.openai.com](https://platform.openai.com)

3. Set up environment variables:
```bash
# Create .env file
cat > .env << EOF
HYPERBROWSER_API_KEY=your_hyperbrowser_key_here
OPENAI_API_KEY=your_openai_key_here
EOF
```

## 🚀 Quick Start

```bash
# Install dependencies
uv pip install -e .

# Run the Streamlit app
streamlit run main.py
```

Then in your browser:
1. Enter a GitHub repository URL (e.g., `https://github.com/facebook/react`)
2. Enter starting reference (e.g., `v18.2.0` or a commit hash)
3. Enter ending reference (e.g., `v18.3.0` or `main`)
4. Click "View Comparison" to generate changelogs

## 💡 Usage Examples

### Compare Release Tags
```
Repository: https://github.com/facebook/react
Start: v18.2.0
End: v18.3.0
```
→ Generates changelog showing all changes between these releases

### Compare Branch to Main
```
Repository: https://github.com/yourusername/yourproject
Start: develop
End: main
```
→ Shows what changes are in main that aren't in develop

### Compare Commit Ranges
```
Repository: https://github.com/yourorg/yourrepo
Start: abc1234
End: def5678
```
→ Detailed diff between any two commit hashes

## 📊 Changelog Formats

The tool generates four different views of your changelog:

### 1. AI-Processed Changelog (Recommended)
Uses OpenAI GPT-4 to generate a human-readable changelog with clear structure:
- **Added**: New features, files, or functionality
- **Removed**: Deleted functionality, deprecated features, or removed files
- **Changed**: Updates to existing features or refactoring
- **Fixed**: Bug fixes and error corrections

Each commit is presented with a clickable link to the full GitHub comparison view.

### 2. Commit Diff View
Traditional chronological view showing:
- Commit messages and descriptions
- Committer names and verification status
- Detailed file-by-file changes
- Line additions/deletions per file
- Code diff previews

### 3. Categorized Changelog
Auto-categorizes commits using heuristics based on commit message keywords:
- ✨ Features (feat, feature, add, new)
- 🐛 Bug Fixes (fix, bug, issue, error, resolv)
- 📄 Documentation (doc, readme, comment)
- 🔨 Refactoring (refactor, clean, restructure)
- 🧪 Tests (test, spec, assert)
- 🔄 Other Changes

### 4. Raw Data
Complete JSON data extracted from GitHub for custom processing or integration.

## 🏗️ Project Structure

```
changelog-builder/
├── main.py                    # Streamlit web app entrypoint
├── changelog_generator.py     # Core changelog generation logic
├── pyproject.toml            # Python dependencies (uv/pip)
├── uv.lock                   # Lockfile for reproducible builds
└── .streamlit/               # Streamlit configuration
```

## ⚙️ How It Works

1. **Extract**: Uses Hyperbrowser's Extract API to scrape GitHub comparison pages
   - Fetches commit messages, descriptions, and committer info
   - Extracts file changes with additions/deletions count
   - Captures code diffs for detailed analysis

2. **Process**: Transforms raw data into structured formats
   - Parses commits and file changes using Pydantic models
   - Categorizes commits based on message keywords
   - Formats data for different changelog styles

3. **Generate**: Creates multiple changelog formats
   - Standard chronological view
   - Heuristic-based categorization
   - AI-powered intelligent summaries (optional)

4. **Export**: Provides download options for all formats as markdown files

## 🔑 Environment Variables

```bash
HYPERBROWSER_API_KEY    # Required - Get at https://hyperbrowser.ai
OPENAI_API_KEY          # Optional - Required only for AI-processed changelogs
```

## 🐛 Troubleshooting

**"HYPERBROWSER_API_KEY environment variable not set"**
- Make sure you have a `.env` file in the project directory
- Verify the API key is correct and not expired

**"OpenAI API key not found"**
- This is optional - categorized and commit diff views work without it
- Add `OPENAI_API_KEY` to `.env` file to enable AI-processed changelogs

**No data extracted**
- Verify the GitHub repository is public
- Check that commit references (tags/branches/hashes) exist in the repository
- Ensure the comparison isn't empty (start and end references are different)

## 📚 Resources

- Hyperbrowser Documentation: [https://docs.hyperbrowser.ai](https://docs.hyperbrowser.ai)
- Hyperbrowser Discord: [https://discord.gg/zsYzsgVRjh](https://discord.gg/zsYzsgVRjh)
- Support: info@hyperbrowser.ai

---

Follow [@hyperbrowser](https://x.com/hyperbrowser) for updates.
