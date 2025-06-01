import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const TopReels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=video+india&sortBy=publishedAt&language=en&apiKey=33b913e452b944178aeade1fdbbe1498`);
        const news = response.data.articles.map(item => ({
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.urlToImage || '/logo.jpg',
          source: item.source.name,
          publishedAt: new Date(item.publishedAt).toLocaleDateString()
        }));
        setReels(news.slice(0, 6)); // Limit to 6 reels
      } catch (error) {
        console.error('Error fetching reels:', error);
        setError('Failed to load top reels');
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Error loading reels: {error}
    </Alert>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Top Reels
      </Typography>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 2
      }}>
        {reels.map((reel) => (
          <Box
            key={reel.url}
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
            onClick={() => window.open(reel.url, '_blank')}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '150px' }}>
              <img 
                src={reel.urlToImage} 
                alt={reel.title}
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
                {reel.source}
              </Box>
            </Box>
            
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {reel.title}
            </Typography>

            <Typography variant="body2" sx={{ 
              color: '#666',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {reel.description}
            </Typography>

            <Typography variant="caption" sx={{ color: '#666' }}>
              {reel.publishedAt}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopReels; 