#!/bin/bash
set -e

echo "Starting Laravel application..."

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Check if database is accessible
echo "Testing database connection..."
php artisan db:show || {
    echo "Database connection failed! Check DB_* environment variables."
    exit 1
}

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force || {
    echo "Migration failed!"
    exit 1
}

# Ensure articles table exists; apply specific migration if needed
echo "Verifying articles migration status..."
if ! php artisan migrate:status | grep -E "2024_01_01_000000_create_articles_table" | grep -q "Yes"; then
    echo "Applying articles migration explicitly..."
    php artisan migrate --path=database/migrations/2024_01_01_000000_create_articles_table.php --force || {
        echo "Specific migration failed!"
        exit 1
    }
fi

# Seed database
echo "Seeding database..."
php artisan db:seed --force || {
    echo "Seeding failed, but continuing..."
}

# Cache configuration
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache

echo "Laravel setup complete!"

# Execute the main container command
exec "$@"
