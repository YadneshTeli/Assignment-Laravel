# Testing Guide

This guide provides step-by-step instructions to test all components of the BeyondChats Article Manager.

## Prerequisites

Ensure all three components are installed:

```bash
# Laravel Backend
cd laravel-backend && composer install && cd ..

# NodeJS Script
cd nodejs-script && npm install && cd ..

# React Frontend
cd react-frontend && npm install && cd ..
```

## Test Sequence

### 1. Test Laravel Backend

```bash
# Terminal 1: Start Laravel server
cd laravel-backend
php artisan serve

# Terminal 2: Test API endpoints
curl http://localhost:8000/api/articles
curl http://localhost:8000/api/articles/latest/one
```

Expected: JSON responses with article data

### 2. Test NodeJS Enhancement Script

```bash
# Make sure Laravel server is still running
cd nodejs-script
npm start
```

Expected output:
```
=== Article Enhancement Script ===
Fetching latest article from Laravel API...
✓ Found article: "..."
...
✓ Article published successfully with ID: X
```

### 3. Verify Enhanced Article

```bash
curl http://localhost:8000/api/articles | jq '.data[] | select(.is_updated==true)'
```

Expected: Enhanced article with references

### 4. Test React Frontend

```bash
# Terminal 3: Start React dev server
cd react-frontend
npm run dev
```

Then open http://localhost:5173 in your browser

Expected:
- See all articles displayed
- Filter buttons work (All, Original, Enhanced)
- Enhanced articles show references
- Responsive design works on mobile

## Verification Checklist

- [ ] Laravel API returns articles
- [ ] NodeJS script creates enhanced article
- [ ] Enhanced article has references
- [ ] React frontend displays all articles
- [ ] Filtering works correctly
- [ ] UI is responsive
- [ ] No console errors

## Common Issues

### Laravel: "Class not found"
```bash
cd laravel-backend
composer dump-autoload
```

### NodeJS: "Connection refused"
Make sure Laravel server is running on port 8000

### React: "Failed to fetch"
Check that VITE_API_URL in .env points to correct Laravel URL

## Full Integration Test

Run this script to test the entire flow:

```bash
#!/bin/bash
set -e

echo "Starting integration test..."

# Start Laravel
cd laravel-backend
php artisan serve > /dev/null 2>&1 &
LARAVEL_PID=$!
sleep 2

# Test API
echo "Testing API..."
curl -s http://localhost:8000/api/articles > /dev/null
echo "✓ API working"

# Run NodeJS script
echo "Running enhancement script..."
cd ../nodejs-script
npm start > /dev/null 2>&1
echo "✓ Enhancement complete"

# Verify
cd ../laravel-backend
ENHANCED=$(curl -s http://localhost:8000/api/articles | jq '.data[] | select(.is_updated==true)' | wc -l)
echo "✓ Found $ENHANCED enhanced articles"

# Cleanup
kill $LARAVEL_PID
echo "Test complete!"
```
