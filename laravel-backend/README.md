# Laravel Backend - BeyondChats Article Manager

Phase 1 of the BeyondChats Technical Product Manager Assignment.

## Features

- RESTful API with CRUD operations for articles
- SQLite database for easy setup
- Article scraper from BeyondChats blog (with fallback to sample data)
- Proper error handling and validation
- CORS configuration for frontend access

## Setup

### Install Dependencies

```bash
composer install
```

### Configure Environment

The `.env` file should already be configured. If not:

```bash
cp .env.example .env
php artisan key:generate
```

### Setup Database

```bash
# Create SQLite database
touch database.sqlite

# Run migrations
php artisan migrate

# Seed with articles
php artisan db:seed
```

### Start Server

```bash
php artisan serve
```

The API will be available at `http://localhost:8000/api`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List all articles |
| GET | `/api/articles/{id}` | Get single article |
| GET | `/api/articles/latest/one` | Get latest article |
| POST | `/api/articles` | Create new article |
| PUT | `/api/articles/{id}` | Update article |
| DELETE | `/api/articles/{id}` | Delete article |

## Testing

```bash
# Get all articles
curl http://localhost:8000/api/articles

# Get latest article
curl http://localhost:8000/api/articles/latest/one
```

## Project Structure

```
laravel-backend/
├── app/
│   ├── Http/Controllers/
│   │   ├── ArticleController.php  # CRUD operations
│   │   └── Controller.php
│   └── Models/
│       └── Article.php             # Article model
├── database/
│   ├── migrations/
│   │   └── 2024_01_01_000000_create_articles_table.php
│   └── seeders/
│       ├── ArticleSeeder.php       # Web scraper + sample data
│       └── DatabaseSeeder.php
├── routes/
│   └── api.php                     # API routes
└── config/
    └── cors.php                    # CORS configuration
```

## Technologies Used

- Laravel 11
- PHP 8.3
- SQLite
- Guzzle HTTP Client
- Symfony DOM Crawler
