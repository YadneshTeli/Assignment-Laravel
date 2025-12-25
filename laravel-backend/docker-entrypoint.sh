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

# Run database migrations (fresh for demo) with explicit pgsql connection
echo "Running fresh database migrations..."
php artisan migrate:fresh --database=pgsql --force || {
    echo "Fresh migration failed!"
    exit 1
}

# Wait 5 seconds to ensure pgbouncer releases connections and schema is fully visible
echo "Waiting 5 seconds for migration to be fully committed..."
sleep 5

echo "Migration status:"
php artisan migrate:status --database=pgsql || true

# Wait additional 5 seconds before seeding to ensure table is visible to all connections
echo "Waiting 5 seconds before seeding..."
sleep 5

# Seed database with explicit pgsql connection
echo "Seeding database..."
php artisan db:seed --database=pgsql --force || {
    echo "Seeding failed, but continuing..."
}

# Wait 3 seconds after seeding to ensure all inserts are committed
echo "Waiting 3 seconds for seeding to complete..."
sleep 3

# Verify data was seeded
echo "Verifying database state..."
php artisan db:show --database=pgsql || true

# Wait before caching to ensure all operations are complete
echo "Waiting 2 seconds before caching..."
sleep 2

# Cache configuration
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache

echo "Laravel setup complete!"

# Execute the main container command
exec "$@"
