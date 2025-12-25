#!/bin/bash
set -e

echo "Starting Laravel application..."

# Generate app key if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Run database migrations with verbose output
echo "Running database migrations..."
php artisan migrate --force --verbose || {
    echo "Migration failed! Check database connection."
    exit 1
}

# Verify table exists before seeding
echo "Verifying articles table exists..."
php artisan tinker --execute="echo Schema::hasTable('articles') ? 'Table exists' : 'Table missing';" || true

# Seed database if empty
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
