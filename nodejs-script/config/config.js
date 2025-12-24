require('dotenv').config();

/**
 * Application configuration
 */
const config = {
    laravel: {
        apiUrl: process.env.LARAVEL_API_URL || 'http://localhost:8000/api'
    },
    google: {
        searchApiKey: process.env.GOOGLE_SEARCH_API_KEY || '',
        searchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID || ''
    },
    gemini: {
        apiKey: process.env.GEMINI_API_KEY || ''
    }
};

module.exports = config;
