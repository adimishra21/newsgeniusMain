import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const TrendingNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=9e76e457ea734bd79ae1f3b784796948`);
        const news = response.data.articles.map(item => ({
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.urlToImage || '/logo.jpg',
          source: item.source.name,
          publishedAt: new Date(item.publishedAt).toLocaleDateString()
        }));
        setArticles(news.slice(0, 10)); // Limit to 10 articles
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load trending news');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Error loading articles: {error}
    </Alert>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 2
      }}>
        {articles.map((article) => (
          <Box
            key={article.url}
            sx={{
              flex: 1,
              height: 300,
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
              }
            }}
            onClick={() => window.open(article.url, '_blank')}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '150px' }}>
              <img 
                src={article.urlToImage} 
                alt={article.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <Box sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.75rem'
              }}>
                {article.source}
              </Box>
            </Box>
            
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {article.title}
            </Typography>

            <Typography variant="body2" sx={{ 
              color: '#666',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {article.description}
            </Typography>

            <Typography variant="caption" sx={{ color: '#666' }}>
              {article.publishedAt}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrendingNews;
