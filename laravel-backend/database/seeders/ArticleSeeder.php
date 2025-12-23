<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Scrape articles from BeyondChats blog
        $url = 'https://beyondchats.com/blogs/';
        
        try {
            $response = Http::timeout(30)->get($url);
            
            if ($response->successful()) {
                $html = $response->body();
                $crawler = new Crawler($html);
                
                // Find all article links
                $articles = [];
                
                // Extract article information
                $crawler->filter('article, .blog-post, .post, .article-item, a[href*="/blog"]')->each(function (Crawler $node) use (&$articles) {
                    try {
                        // Try to extract title
                        $titleNode = $node->filter('h2, h3, .title, .post-title')->first();
                        $title = $titleNode->count() > 0 ? trim($titleNode->text()) : '';
                        
                        // Try to extract link
                        $linkNode = $node->filter('a')->first();
                        $link = $linkNode->count() > 0 ? $linkNode->attr('href') : '';
                        
                        // Try to extract content/excerpt
                        $contentNode = $node->filter('p, .excerpt, .description')->first();
                        $content = $contentNode->count() > 0 ? trim($contentNode->text()) : '';
                        
                        if ($title && $link) {
                            // Make sure link is absolute
                            if (!str_starts_with($link, 'http')) {
                                $link = 'https://beyondchats.com' . $link;
                            }
                            
                            $articles[] = [
                                'title' => $title,
                                'url' => $link,
                                'content' => $content ?: 'Content will be scraped from the article page.',
                            ];
                        }
                    } catch (\Exception $e) {
                        // Skip this node if there's an error
                    }
                });
                
                // Get last 5 articles (oldest from the last page)
                $articles = array_slice($articles, -5);
                
                // If we didn't find articles with the above selectors, try a simpler approach
                if (empty($articles)) {
                    $this->createSampleArticles();
                    return;
                }
                
                // Save articles to database
                foreach ($articles as $articleData) {
                    Article::create([
                        'title' => $articleData['title'],
                        'content' => $articleData['content'],
                        'url' => $articleData['url'],
                        'author' => 'BeyondChats',
                        'published_date' => now()->subDays(rand(1, 30)),
                        'is_updated' => false
                    ]);
                }
                
                $this->command->info('Successfully scraped and stored ' . count($articles) . ' articles from BeyondChats blog.');
            } else {
                $this->command->error('Failed to fetch the blog page. Creating sample articles instead.');
                $this->createSampleArticles();
            }
        } catch (\Exception $e) {
            $this->command->error('Error scraping articles: ' . $e->getMessage());
            $this->command->info('Creating sample articles instead.');
            $this->createSampleArticles();
        }
    }
    
    /**
     * Create sample articles if scraping fails
     */
    private function createSampleArticles(): void
    {
        $sampleArticles = [
            [
                'title' => 'Getting Started with AI Chatbots',
                'content' => 'Artificial Intelligence chatbots are revolutionizing customer service. Learn how to implement them in your business.',
                'url' => 'https://beyondchats.com/blogs/getting-started-with-ai-chatbots',
                'author' => 'BeyondChats',
                'published_date' => now()->subDays(5),
            ],
            [
                'title' => 'The Future of Customer Support',
                'content' => 'Explore how automated customer support is changing the landscape of business communication.',
                'url' => 'https://beyondchats.com/blogs/future-of-customer-support',
                'author' => 'BeyondChats',
                'published_date' => now()->subDays(10),
            ],
            [
                'title' => 'Building Intelligent Chat Systems',
                'content' => 'A comprehensive guide to building intelligent chat systems using modern AI technologies.',
                'url' => 'https://beyondchats.com/blogs/building-intelligent-chat-systems',
                'author' => 'BeyondChats',
                'published_date' => now()->subDays(15),
            ],
            [
                'title' => 'Natural Language Processing in Chatbots',
                'content' => 'Understanding how NLP powers modern chatbots and improves user experience.',
                'url' => 'https://beyondchats.com/blogs/nlp-in-chatbots',
                'author' => 'BeyondChats',
                'published_date' => now()->subDays(20),
            ],
            [
                'title' => 'Chatbot Best Practices for 2024',
                'content' => 'Essential best practices for deploying and managing chatbots in your organization.',
                'url' => 'https://beyondchats.com/blogs/chatbot-best-practices-2024',
                'author' => 'BeyondChats',
                'published_date' => now()->subDays(25),
            ],
        ];
        
        foreach ($sampleArticles as $article) {
            Article::create($article);
        }
        
        $this->command->info('Created 5 sample articles.');
    }
}
