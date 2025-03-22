import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

const Ticker = ({ category }) => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${category}+india&sortBy=publishedAt&language=en&pageSize=10&apiKey=9e76e457ea734bd79ae1f3b784796948`);
        const headlines = response.data.articles.map(item => item.title);
        setNews(headlines);
      } catch (error) {
        console.error('Error fetching ticker news:', error);
      }
    };

    fetchNews();
  }, [category]);

  useEffect(() => {
    if (news.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [news.length]);

  return (
    <Box
      sx={{
        backgroundColor: '#FFD700',
        padding: '8px 0',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        marginBottom: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          animation: 'ticker 30s linear infinite',
          whiteSpace: 'nowrap',
          '@keyframes ticker': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' }
          }
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: '#FF0000',
            fontWeight: 'bold',
            padding: '0 20px',
            display: 'inline-block'
          }}
        >
          {news[currentIndex]}
        </Typography>
      </Box>
    </Box>
  );
};

export default Ticker; 