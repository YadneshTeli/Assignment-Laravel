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
php artisan tinker --execute="DB::connection()->getPdo(); echo 'DB connected';" || {
    echo "Database connection failed! Check DB_* environment variables."
    exit 1
}

# Run database migrations - use fresh on first deploy
echo "Running database migrations..."
if ! php artisan migrate:status 2>/dev/null | grep -q "2024_01_01_000000_create_articles_table"; then
    echo "Fresh migration needed..."
    php artisan migrate:fresh --force || {
        echo "Migration failed!"
        exit 1
    }
else
    php artisan migrate --force || {
        echo "Migration failed!"
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
