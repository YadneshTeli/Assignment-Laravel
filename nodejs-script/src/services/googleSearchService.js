const axios = require('axios');

/**
 * Service for Google Search functionality
 */
class GoogleSearchService {
    constructor(apiKey, searchEngineId) {
        this.apiKey = apiKey;
        this.searchEngineId = searchEngineId;
    }

    /**
     * Search Google for article title
     */
    async search(query) {
        try {
            console.log(`\nSearching Google for: "${query}"`);
            
            // If API keys are not set, use mock data for demonstration
            if (!this.apiKey || !this.searchEngineId) {
                console.log('⚠ Google API keys not set. Using mock search results.');
                return [
                    'https://example.com/article1',
                    'https://example.com/article2'
                ];
            }
            
            const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.searchEngineId}&q=${encodeURIComponent(query)}`;
            const response = await axios.get(searchUrl);
            
            // Extract first two URLs from search results
            const urls = response.data.items
                .slice(0, 2)
                .map(item => item.link);
            
            console.log(`✓ Found ${urls.length} search results`);
            return urls;
        } catch (error) {
            console.error('Error searching Google:', error.message);
            // Return mock URLs as fallback
            return [
                'https://example.com/article1',
                'https://example.com/article2'
            ];
        }
    }
}

module.exports = GoogleSearchService;
