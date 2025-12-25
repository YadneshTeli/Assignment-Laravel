#!/bin/bash
set -e

echo "Starting Laravel application..."

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Seed database if empty
echo "Seeding database..."
php artisan db:seed --force || true

# Cache configuration
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache

echo "Laravel setup complete!"

# Execute the main container command
exec "$@"
