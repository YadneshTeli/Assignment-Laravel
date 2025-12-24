#!/usr/bin/env node

/**
 * Article Enhancement Application
 * Main entry point for the application
 */

const config = require('./config/config');
const ArticleEnhancementApp = require('./src/app');

// Create and run the application
const app = new ArticleEnhancementApp(config);

app.run()
    .then(() => {
        console.log('\n✓ Application completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n✗ Application failed:', error.message);
        process.exit(1);
    });
