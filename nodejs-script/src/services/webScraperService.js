const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Service for web scraping functionality
 */
class WebScraperService {
    /**
     * Scrape content from a URL
     */
    async scrapeArticleContent(url) {
        try {
            console.log(`\nScraping content from: ${url}`);
            const response = await axios.get(url, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            
            const $ = cheerio.load(response.data);
            
            // Remove scripts, styles, and navigation elements
            $('script, style, nav, header, footer, aside, .menu, .nav, .navigation').remove();
            
            // Try to find the main content
            let content = '';
            
            // Common article selectors
            const selectors = [
                'article',
                '.post-content',
                '.article-content',
                '.entry-content',
                'main',
                '.content',
                '#content'
            ];
            
            for (const selector of selectors) {
                const element = $(selector);
                if (element.length > 0) {
                    content = element.text().trim();
                    if (content.length > 200) {
                        break;
                    }
                }
            }
            
            // If no content found with selectors, get all paragraph text
            if (content.length < 200) {
                content = $('p').map((i, el) => $(el).text().trim()).get().join('\n\n');
            }
            
            // Clean up the content
            content = content
                .replace(/\s+/g, ' ')
                .replace(/\n\s*\n/g, '\n\n')
                .trim()
                .substring(0, 2000); // Limit length
            
            console.log(`✓ Scraped ${content.length} characters`);
            return content;
        } catch (error) {
            console.error(`Error scraping ${url}:`, error.message);
            return 'Unable to scrape content from this URL.';
        }
    }

    /**
     * Scrape multiple URLs
     */
    async scrapeMultiple(urls) {
        const results = [];
        for (const url of urls) {
            const content = await this.scrapeArticleContent(url);
            results.push(content);
        }
        return results;
    }
}

module.exports = WebScraperService;
