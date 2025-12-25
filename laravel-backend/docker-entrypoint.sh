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

# Run database migrations (fresh for demo)
echo "Running fresh database migrations..."
php artisan migrate:fresh --force || {
    echo "Fresh migration failed!"
    exit 1
}

# Small delay to ensure connection state is consistent
sleep 1

echo "Migration status:"
php artisan migrate:status || true

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
