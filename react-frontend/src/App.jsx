import { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/articles`);
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data);
      } else {
        setError('Failed to fetch articles');
      }
    } catch (err) {
      setError('Error connecting to API: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'original') return !article.is_updated;
    if (filter === 'updated') return article.is_updated;
    return true;
  });

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchArticles}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>📚 BeyondChats Article Manager</h1>
          <p className="subtitle">Showcasing original and AI-enhanced articles</p>
        </div>
      </header>

      <div className="container">
        <div className="filter-bar">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All Articles ({articles.length})
          </button>
          <button 
            className={filter === 'original' ? 'active' : ''} 
            onClick={() => setFilter('original')}
          >
            Original ({articles.filter(a => !a.is_updated).length})
          </button>
          <button 
            className={filter === 'updated' ? 'active' : ''} 
            onClick={() => setFilter('updated')}
          >
            Enhanced ({articles.filter(a => a.is_updated).length})
          </button>
        </div>

        <div className="articles-grid">
          {filteredArticles.length === 0 ? (
            <div className="no-articles">
              <p>No articles found</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <div key={article.id} className={`article-card ${article.is_updated ? 'updated' : 'original'}`}>
                <div className="article-badge">
                  {article.is_updated ? '✨ Enhanced' : '📄 Original'}
                </div>
                <h2>{article.title}</h2>
                <div className="article-meta">
                  <span>👤 {article.author || 'Unknown'}</span>
                  <span>📅 {new Date(article.published_date || article.created_at).toLocaleDateString()}</span>
                </div>
                <div className="article-content">
                  <p>{article.content}</p>
                </div>
                {article.url && (
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
                    View Original →
                  </a>
                )}
                {article.references && (
                  <div className="references">
                    <h4>📎 References:</h4>
                    <div className="references-list">
                      {article.references.split('\n').map((ref, idx) => (
                        <div key={idx} className="reference-item">{ref}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>Built for BeyondChats Technical Product Manager Assignment</p>
          <p>Phase 1: Laravel API | Phase 2: NodeJS Enhancement | Phase 3: React Frontend</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
