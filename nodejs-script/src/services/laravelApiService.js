const axios = require('axios');

/**
 * Service for interacting with Laravel API
 */
class LaravelApiService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    /**
     * Fetch the latest article from Laravel API
     */
    async fetchLatestArticle() {
        try {
            console.log('Fetching latest article from Laravel API...');
            const response = await axios.get(`${this.apiUrl}/articles/latest/one`);
            
            if (response.data.success && response.data.data) {
                console.log(`✓ Found article: "${response.data.data.title}"`);
                return response.data.data;
            } else {
                throw new Error('No article found');
            }
        } catch (error) {
            console.error('Error fetching article:', error.message);
            throw error;
        }
    }

    /**
     * Publish updated article to Laravel API
     */
    async publishArticle(enhancedArticle, references) {
        try {
            console.log('\nPublishing enhanced article...');
            
            const referencesText = references.map((url, index) => 
                `${index + 1}. ${url}`
            ).join('\n');
            
            const articleData = {
                title: `[Updated] ${enhancedArticle.title}`,
                content: enhancedArticle.content,
                references: referencesText,
                is_updated: true,
                author: 'AI Enhanced (Gemini)',
                url: 'https://beyondchats.com/blogs/enhanced'
            };
            
            const response = await axios.post(`${this.apiUrl}/articles`, articleData);
            
            if (response.data.success) {
                console.log(`✓ Article published successfully with ID: ${response.data.data.id}`);
                return response.data.data;
            } else {
                throw new Error('Failed to publish article');
            }
        } catch (error) {
            console.error('Error publishing article:', error.message);
            throw error;
        }
    }
}

module.exports = LaravelApiService;
