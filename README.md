# BeyondChats Technical Product Manager Assignment

A complete full-stack application demonstrating article management with AI-powered content enhancement, built with Laravel, NodeJS, and React.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Port 5173)               │
│  • Article display with filtering                           │
│  • Responsive UI for original & enhanced articles           │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP Requests
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Laravel Backend API (Port 8000)                │
│  • RESTful CRUD endpoints                                   │
│  • SQLite database                                          │
│  • Article storage & management                             │
└────────────────────┬────────────────────────────────────────┘
                     │ API Calls
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  NodeJS Enhancement Script                  │
│  1. Fetch latest article from Laravel API                   │
│  2. Search Google for article title                         │
│  3. Scrape top 2 search results                             │
│  4. Use LLM to enhance article content                      │
│  5. Publish enhanced article with references                │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Project Structure

```
Assignment-Laravel/
├── laravel-backend/          # Laravel 11 API
│   ├── app/
│   │   ├── Http/Controllers/ # API Controllers
│   │   └── Models/          # Eloquent Models
│   ├── database/
│   │   ├── migrations/      # Database schema
│   │   └── seeders/         # Data seeders (article scraper)
│   ├── routes/
│   │   └── api.php          # API routes
│   └── .env                 # Environment configuration
│
├── nodejs-script/           # NodeJS enhancement script
│   ├── index.js             # Main script
│   ├── package.json         # Dependencies
│   └── .env.example         # Environment template
│
├── react-frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   └── App.css          # Styling
│   ├── package.json         # Dependencies
│   └── .env                 # API configuration
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18 or higher
- npm

### Phase 1: Laravel Backend Setup

```bash
# Navigate to Laravel directory
cd laravel-backend

# Install dependencies
composer install

# Copy environment file (if needed)
cp .env.example .env

# Generate application key (if needed)
php artisan key:generate

# Create SQLite database
touch database.sqlite

# Run migrations
php artisan migrate

# Seed database with articles
php artisan db:seed

# Start Laravel development server
php artisan serve
```

The API will be available at `http://localhost:8000/api`

### Phase 2: NodeJS Script Setup

```bash
# Navigate to NodeJS directory
cd nodejs-script

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Optional: Configure API keys in .env
# - GOOGLE_SEARCH_API_KEY (optional - uses mock data if not provided)
# - GOOGLE_SEARCH_ENGINE_ID (optional)
# - OPENAI_API_KEY (optional - uses mock enhancement if not provided)

# Run the enhancement script
npm start
```

The script will:
1. Fetch the latest article from Laravel API
2. Search Google (or use mock data)
3. Scrape reference articles
4. Enhance content using LLM (or mock enhancement)
5. Publish enhanced article back to Laravel

### Phase 3: React Frontend Setup

```bash
# Navigate to React directory
cd react-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List all articles |
| GET | `/api/articles/{id}` | Get single article |
| GET | `/api/articles/latest/one` | Get latest article |
| POST | `/api/articles` | Create new article |
| PUT | `/api/articles/{id}` | Update article |
| DELETE | `/api/articles/{id}` | Delete article |

### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Getting Started with AI Chatbots",
      "content": "Article content...",
      "url": "https://beyondchats.com/blogs/article-url",
      "author": "BeyondChats",
      "published_date": "2025-12-18",
      "references": null,
      "is_updated": false,
      "created_at": "2025-12-23T19:16:05.000000Z",
      "updated_at": "2025-12-23T19:16:05.000000Z"
    }
  ]
}
```

## 🎨 Features

### Phase 1: Laravel Backend
- ✅ RESTful API with CRUD operations
- ✅ SQLite database for easy setup
- ✅ Article scraper from BeyondChats blog (with fallback to sample data)
- ✅ Proper error handling and validation
- ✅ CORS configuration for frontend access

### Phase 2: NodeJS Script
- ✅ Fetch articles from Laravel API
- ✅ Google Search integration (with mock fallback)
- ✅ Web scraping with Cheerio
- ✅ LLM integration for content enhancement (with mock fallback)
- ✅ Reference tracking and citation
- ✅ Graceful fallbacks when APIs are unavailable

### Phase 3: React Frontend
- ✅ Modern, responsive UI design
- ✅ Article listing with filtering (All, Original, Enhanced)
- ✅ Beautiful card-based layout
- ✅ Display of article metadata (author, date)
- ✅ Reference citations for enhanced articles
- ✅ Loading states and error handling
- ✅ Mobile-responsive design

## 🔧 Configuration

### Laravel Backend (.env)

```env
APP_NAME=BeyondChatsArticles
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=database.sqlite
```

### NodeJS Script (.env)

```env
LARAVEL_API_URL=http://localhost:8000/api
GOOGLE_SEARCH_API_KEY=your_google_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

### React Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
```

## 🧪 Testing

### Test Laravel API

```bash
# Get all articles
curl http://localhost:8000/api/articles

# Get latest article
curl http://localhost:8000/api/articles/latest/one

# Create new article
curl -X POST http://localhost:8000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Article",
    "content": "Test content",
    "author": "Test Author"
  }'
```

### Test NodeJS Script

```bash
cd nodejs-script
npm start
```

### Test React Frontend

Open your browser to `http://localhost:5173` and verify:
- Articles are displayed correctly
- Filtering works (All, Original, Enhanced)
- UI is responsive on mobile devices

## 🌟 Key Decisions & Trade-offs

### Technology Choices

1. **Laravel 11**: Latest version with improved performance and modern PHP features
2. **SQLite**: Easy setup, no additional database server required
3. **Vite + React**: Modern, fast development experience
4. **Cheerio**: Lightweight and efficient for web scraping
5. **Axios**: Reliable HTTP client for both NodeJS and browser

### Implementation Notes

1. **Article Scraping**: Implemented with fallback to sample data since beyondchats.com may not be accessible in all environments
2. **API Keys**: Made optional with mock implementations to allow testing without external API access
3. **CORS**: Configured to allow local development between different ports
4. **Error Handling**: Comprehensive error handling with user-friendly messages
5. **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 📝 Future Enhancements

If given more time, these features could be added:

- [ ] User authentication and authorization
- [ ] Pagination for article listing
- [ ] Search functionality in frontend
- [ ] Article editing in frontend
- [ ] Scheduled jobs for automatic enhancement
- [ ] Rate limiting for API endpoints
- [ ] Caching layer for improved performance
- [ ] Comprehensive test coverage
- [ ] Deployment configuration (Docker, CI/CD)
- [ ] Analytics dashboard

## 🐛 Known Limitations

1. **Article Scraping**: Real scraping from beyondchats.com may fail due to network restrictions; sample data is used as fallback
2. **Google Search**: Requires API keys for actual search; uses mock data otherwise
3. **LLM Enhancement**: Requires OpenAI API key; uses template-based enhancement otherwise
4. **No Authentication**: API is open without authentication
5. **Single Database**: Uses SQLite for simplicity; production would use PostgreSQL/MySQL

## 📄 License

This project was created as part of a technical assignment for BeyondChats.

## 👤 Author

Assignment submission for BeyondChats Technical Product Manager position

---

## 🔗 Repository Structure

This is a monorepo containing all three phases:
- `laravel-backend/` - Phase 1
- `nodejs-script/` - Phase 2
- `react-frontend/` - Phase 3

Each phase can be run independently, but they work together to provide the complete functionality.
