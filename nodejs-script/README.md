# NodeJS Enhancement Script

Phase 2 of the BeyondChats Technical Product Manager Assignment.

## Features

- Fetch latest article from Laravel API
- Google Search integration (with mock fallback)
- Web scraping with Cheerio
- LLM integration for content enhancement (with mock fallback)
- Reference tracking and citation
- Graceful fallbacks when APIs are unavailable

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and configure (all optional):

```env
LARAVEL_API_URL=http://localhost:8000/api
GOOGLE_SEARCH_API_KEY=your_google_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Note:** All API keys are optional. The script will use mock data/enhancement if keys are not provided.

## Usage

```bash
npm start
```

## How It Works

1. **Fetch Article**: Retrieves the latest article from Laravel API
2. **Search Google**: Searches for the article title on Google (or uses mock URLs)
3. **Scrape Content**: Extracts content from top 2 search results
4. **Enhance with LLM**: Uses OpenAI to enhance the article (or uses template)
5. **Publish**: Saves the enhanced article back to Laravel with references

## Example Output

```
=== Article Enhancement Script ===

Fetching latest article from Laravel API...
✓ Found article: "Getting Started with AI Chatbots"

Searching Google for: "Getting Started with AI Chatbots"
⚠ Google API keys not set. Using mock search results.

Scraping content from: https://example.com/article1
Scraping content from: https://example.com/article2

Enhancing article with LLM...
⚠ OpenAI API key not set. Creating mock enhanced content.

Publishing enhanced article...
✓ Article published successfully with ID: 6

=== Process Complete ===
Original article: 1 - "Getting Started with AI Chatbots"
Enhanced article: 6 - "[Updated] Getting Started with AI Chatbots"

References:
  1. https://example.com/article1
  2. https://example.com/article2
```

## Technologies Used

- Node.js 20
- Axios (HTTP client)
- Cheerio (Web scraping)
- dotenv (Environment configuration)

## API Integration

### Required APIs (Optional)

1. **Google Custom Search API**: For searching article titles
2. **OpenAI API**: For content enhancement using GPT models

Both APIs are optional - the script provides mock implementations for testing without API keys.
