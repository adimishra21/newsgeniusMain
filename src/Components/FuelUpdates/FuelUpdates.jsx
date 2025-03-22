import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Grid } from '@mui/material';

const FuelUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=fuel+price+india&language=en&sortBy=publishedAt&apiKey=9e76e457ea734bd79ae1f3b784796948`
        );
        setNews(response.data.articles.slice(0, 6)); // Limit to 6 articles
      } catch (error) {
        console.error('Error fetching fuel news:', error);
        setError('Failed to load fuel updates');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Fuel Updates
      </Typography>
      <Grid container spacing={2}>
        {news.map((article) => (
          <Grid item xs={12} key={article.url}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}
              onClick={() => window.open(article.url, '_blank')}
            >
              <Box sx={{ width: '120px', height: '120px', flexShrink: 0 }}>
                <img
                  src={article.urlToImage || '/logo.jpg'}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <Box sx={{ p: 2, flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {article.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {article.source.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FuelUpdates;