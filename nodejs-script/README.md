# Article Enhancement Application

Phase 2 of the BeyondChats Technical Product Manager Assignment - A Node.js application for enhancing articles using Google Gemini AI.

## Features

- **Modular Architecture**: Organized service-based structure with separation of concerns
- **Laravel API Integration**: Fetch and publish articles via RESTful API
- **Google Search**: Find top-ranking articles for research
- **Web Scraping**: Extract content from reference articles using Cheerio
- **Gemini AI Enhancement**: Leverage Google's Gemini AI for intelligent content improvement
- **Graceful Fallbacks**: Works without API keys using mock implementations
- **Error Handling**: Comprehensive error handling and logging

## Project Structure

```
nodejs-script/
├── config/
│   └── config.js           # Application configuration
├── src/
│   ├── app.js              # Main application class
│   └── services/
│       ├── laravelApiService.js    # Laravel API interactions
│       ├── googleSearchService.js  # Google search functionality
│       ├── webScraperService.js    # Web scraping logic
│       └── geminiService.js        # Gemini AI integration
├── main.js                 # Application entry point
├── package.json
└── .env.example
```

## Setup

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

```bash
# Copy environment file
cp .env.example .env
```

Edit `.env` and configure (all optional):

```env
# Laravel API (Required)
LARAVEL_API_URL=http://localhost:8000/api

# Google Search API (Optional - uses mock data if not provided)
GOOGLE_SEARCH_API_KEY=your_google_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here

# Google Gemini API (Optional - uses mock enhancement if not provided)
GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting API Keys:**

1. **Gemini API**: Get your free API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Google Custom Search**: 
   - API Key: [Google Cloud Console](https://console.cloud.google.com/)
   - Search Engine ID: [Programmable Search Engine](https://programmablesearchengine.google.com/)

## Usage

### Run the Application

```bash
npm start
```

Or for development:

```bash
npm run dev
```

## How It Works

The application follows a five-step enhancement process:

1. **Fetch Article**: Retrieves the latest article from Laravel API
2. **Search Google**: Finds top 2 articles related to the topic
3. **Scrape Content**: Extracts text content from found articles
4. **Enhance with Gemini**: Uses Google's Gemini AI to improve article quality
5. **Publish**: Saves enhanced article back to Laravel with references

### Process Flow

```
┌─────────────────┐
│ Laravel API     │
│ (Fetch Article) │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Google Search   │
│ (Find Related)  │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Web Scraper     │
│ (Extract Text)  │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Gemini AI       │
│ (Enhance)       │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Laravel API     │
│ (Publish)       │
└─────────────────┘
```

## Example Output

```
=== Article Enhancement Application ===
Powered by Google Gemini AI

Fetching latest article from Laravel API...
✓ Found article: "Getting Started with AI Chatbots"

Searching Google for: "Getting Started with AI Chatbots"
✓ Found 2 search results

Scraping content from: https://example.com/article1
✓ Scraped 1523 characters

Scraping content from: https://example.com/article2
✓ Scraped 1847 characters

Enhancing article with Gemini AI...
✓ Article enhanced successfully with Gemini AI

Publishing enhanced article...
✓ Article published successfully with ID: 7

=== Enhancement Complete ===
Original article: 1 - "Getting Started with AI Chatbots"
Enhanced article: 7 - "[Updated] Getting Started with AI Chatbots"

References:
  1. https://example.com/article1
  2. https://example.com/article2

✨ Powered by Google Gemini AI

✓ Application completed successfully
```

## Service Architecture

### LaravelApiService
Handles all interactions with the Laravel backend:
- Fetch latest article
- Publish enhanced articles
- Manage article metadata

### GoogleSearchService
Manages Google Custom Search API:
- Query construction
- Result parsing
- Fallback to mock data

### WebScraperService
Extracts content from web pages:
- HTML parsing with Cheerio
- Content cleaning and formatting
- Error handling for failed scrapes

### GeminiService
Google Gemini AI integration:
- Article enhancement
- Content formatting
- Mock enhancement fallback

## Technologies Used

- **Node.js 20**: Runtime environment
- **@google/generative-ai**: Official Google Gemini AI SDK
- **Axios**: HTTP client for API requests
- **Cheerio**: Fast, flexible HTML parsing for web scraping
- **dotenv**: Environment variable management

## Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Automatic retries and fallbacks
- **API Failures**: Mock data when APIs are unavailable
- **Scraping Issues**: Graceful degradation if content cannot be extracted
- **Invalid Responses**: Validation and error messages

## API Integration

### Required APIs

**Gemini API (Recommended)**
- Free tier available
- 60 requests per minute
- Best for content enhancement

**Google Custom Search (Optional)**
- Limited free tier (100 searches/day)
- Can work without this using mock data

## Development

### Adding New Services

1. Create service file in `src/services/`
2. Implement service class with clear methods
3. Add to `src/app.js` initialization
4. Update configuration in `config/config.js`

### Testing

```bash
# Test with Laravel server running
npm start
```

## Troubleshooting

### "Connection refused" error
- Ensure Laravel server is running on port 8000
- Check LARAVEL_API_URL in .env

### "API key invalid" error
- Verify your Gemini API key at Google AI Studio
- Ensure no extra spaces in .env file

### "Failed to scrape" warnings
- This is normal for protected/blocked sites
- Application will continue with available content

## License

This project was created as part of a technical assignment for BeyondChats.

## Notes

- All external APIs are optional - the application works with mock implementations
- Gemini API provides intelligent content enhancement
- The service-based architecture makes it easy to extend and maintain
