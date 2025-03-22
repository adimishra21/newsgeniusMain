import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Tabs, Tab, Grid } from '@mui/material';

const Politics = () => {
  const [value, setValue] = useState(0);
  const [nationalNews, setNationalNews] = useState([]);
  const [internationalNews, setInternationalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['National Politics', 'International Politics'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Fetch national politics news
        const nationalResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=politics+india&language=en&sortBy=publishedAt&apiKey=9e76e457ea734bd79ae1f3b784796948`
        );
        setNationalNews(nationalResponse.data.articles.slice(0, 10));

        // Fetch international politics news
        const internationalResponse = await axios.get(
          `https://newsapi.org/v2/everything?q=international+politics&language=en&sortBy=publishedAt&apiKey=9e76e457ea734bd79ae1f3b784796948`
        );
        setInternationalNews(internationalResponse.data.articles.slice(0, 10));
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load political news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const renderNews = (news) => (
    <Grid container spacing={3}>
      {news.map((article) => (
        <Grid item xs={12} md={6} key={article.url}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
              }
            }}
            onClick={() => window.open(article.url, '_blank')}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
              <img
                src={article.urlToImage || '/logo.jpg'}
                alt={article.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem'
                }}
              >
                {article.source.name}
              </Box>
            </Box>
            <Box sx={{ p: 2, flexGrow: 1 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {article.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(article.publishedAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Politics News
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange}>
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ mt: 3 }}>
        {value === 0 ? renderNews(nationalNews) : renderNews(internationalNews)}
      </Box>
    </Box>
  );
};

export default Politics; 