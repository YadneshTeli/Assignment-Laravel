require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

// Configuration
const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://localhost:8000/api';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const GOOGLE_SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY || '';
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID || '';

/**
 * Fetch the latest article from Laravel API
 */
async function fetchLatestArticle() {
    try {
        console.log('Fetching latest article from Laravel API...');
        const response = await axios.get(`${LARAVEL_API_URL}/articles/latest/one`);
        
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
 * Search Google for article title
 */
async function searchGoogle(query) {
    try {
        console.log(`\nSearching Google for: "${query}"`);
        
        // If API keys are not set, use mock data for demonstration
        if (!GOOGLE_SEARCH_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
            console.log('⚠ Google API keys not set. Using mock search results.');
            return [
                'https://example.com/article1',
                'https://example.com/article2'
            ];
        }
        
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;
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

/**
 * Scrape content from a URL
 */
async function scrapeArticleContent(url) {
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
 * Use LLM to enhance article content
 */
async function enhanceArticleWithLLM(originalArticle, referenceArticles) {
    try {
        console.log('\nEnhancing article with LLM...');
        
        if (!OPENAI_API_KEY) {
            console.log('⚠ OpenAI API key not set. Creating mock enhanced content.');
            return {
                title: originalArticle.title,
                content: `${originalArticle.content}\n\n## Enhanced Content\n\nThis article has been enhanced with insights from top-ranking articles on this topic. The content has been reformatted and expanded to provide more comprehensive coverage.\n\n### Key Insights\n\n1. Modern approaches to ${originalArticle.title.toLowerCase()}\n2. Best practices and industry standards\n3. Real-world applications and case studies\n\n### Detailed Analysis\n\n${originalArticle.content}\n\nBased on analysis of leading articles in this space, we've identified several critical factors for success. The integration of modern technologies and methodologies has transformed how organizations approach this challenge.\n\n### Conclusion\n\nBy following these guidelines and learning from industry leaders, you can effectively implement these strategies in your organization.`
            };
        }
        
        const prompt = `You are an expert content writer. Given an original article and two reference articles from top Google search results, rewrite the original article to match the style, depth, and formatting of the reference articles while keeping the original topic and message.

Original Article:
Title: ${originalArticle.title}
Content: ${originalArticle.content}

Reference Article 1:
${referenceArticles[0]}

Reference Article 2:
${referenceArticles[1]}

Please rewrite the original article to:
1. Match the formatting style of the reference articles
2. Expand the content with similar depth and detail
3. Keep the original message but enhance it
4. Make it professional and engaging

Return the response as JSON with "title" and "content" fields.`;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert content writer that helps improve and format articles.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const enhancedContent = response.data.choices[0].message.content;
        
        // Try to parse as JSON, if not just use the text
        try {
            const parsed = JSON.parse(enhancedContent);
            console.log('✓ Article enhanced successfully');
            return parsed;
        } catch {
            console.log('✓ Article enhanced (as text)');
            return {
                title: originalArticle.title,
                content: enhancedContent
            };
        }
    } catch (error) {
        console.error('Error enhancing article:', error.message);
        // Return enhanced version without LLM
        return {
            title: originalArticle.title,
            content: `${originalArticle.content}\n\n[Enhanced content would appear here if LLM API was configured]`
        };
    }
}

/**
 * Publish updated article to Laravel API
 */
async function publishArticle(enhancedArticle, references) {
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
            author: 'AI Enhanced',
            url: 'https://beyondchats.com/blogs/enhanced'
        };
        
        const response = await axios.post(`${LARAVEL_API_URL}/articles`, articleData);
        
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

/**
 * Main execution function
 */
async function main() {
    try {
        console.log('=== Article Enhancement Script ===\n');
        
        // Step 1: Fetch latest article
        const originalArticle = await fetchLatestArticle();
        
        // Step 2: Search Google
        const searchResults = await searchGoogle(originalArticle.title);
        
        // Step 3: Scrape reference articles
        const referenceArticles = [];
        for (const url of searchResults) {
            const content = await scrapeArticleContent(url);
            referenceArticles.push(content);
        }
        
        // Step 4: Enhance with LLM
        const enhancedArticle = await enhanceArticleWithLLM(originalArticle, referenceArticles);
        
        // Step 5: Publish enhanced article
        const publishedArticle = await publishArticle(enhancedArticle, searchResults);
        
        console.log('\n=== Process Complete ===');
        console.log(`Original article: ${originalArticle.id} - "${originalArticle.title}"`);
        console.log(`Enhanced article: ${publishedArticle.id} - "${publishedArticle.title}"`);
        console.log(`\nReferences:`);
        searchResults.forEach((url, index) => {
            console.log(`  ${index + 1}. ${url}`);
        });
        
    } catch (error) {
        console.error('\n❌ Script failed:', error.message);
        process.exit(1);
    }
}

// Run the script
main();
