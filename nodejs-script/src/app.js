const LaravelApiService = require('./services/laravelApiService');
const GoogleSearchService = require('./services/googleSearchService');
const WebScraperService = require('./services/webScraperService');
const GeminiService = require('./services/geminiService');

/**
 * Main application class for article enhancement
 */
class ArticleEnhancementApp {
    constructor(config) {
        this.laravelApi = new LaravelApiService(config.laravel.apiUrl);
        this.googleSearch = new GoogleSearchService(
            config.google.searchApiKey,
            config.google.searchEngineId
        );
        this.webScraper = new WebScraperService();
        this.gemini = new GeminiService(config.gemini.apiKey);
    }

    /**
     * Run the article enhancement process
     */
    async run() {
        try {
            console.log('=== Article Enhancement Application ===');
            console.log('Powered by Google Gemini AI\n');
            
            // Step 1: Fetch latest article
            const originalArticle = await this.laravelApi.fetchLatestArticle();
            
            // Step 2: Search Google
            const searchResults = await this.googleSearch.search(originalArticle.title);
            
            // Step 3: Scrape reference articles
            const referenceArticles = await this.webScraper.scrapeMultiple(searchResults);
            
            // Step 4: Enhance with Gemini AI
            const enhancedArticle = await this.gemini.enhanceArticle(
                originalArticle,
                referenceArticles
            );
            
            // Step 5: Publish enhanced article
            const publishedArticle = await this.laravelApi.publishArticle(
                enhancedArticle,
                searchResults
            );
            
            // Display summary
            console.log('\n=== Enhancement Complete ===');
            console.log(`Original article: ${originalArticle.id} - "${originalArticle.title}"`);
            console.log(`Enhanced article: ${publishedArticle.id} - "${publishedArticle.title}"`);
            console.log(`\nReferences:`);
            searchResults.forEach((url, index) => {
                console.log(`  ${index + 1}. ${url}`);
            });
            console.log('\n✨ Powered by Google Gemini AI');
            
            return publishedArticle;
        } catch (error) {
            console.error('\n❌ Application failed:', error.message);
            throw error;
        }
    }
}

module.exports = ArticleEnhancementApp;
