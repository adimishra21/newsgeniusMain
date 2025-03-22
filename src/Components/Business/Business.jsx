import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab, Chip, Stack, CircularProgress, Divider, Paper } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import Ticker from '../Ticker/Ticker';
import axios from 'axios';

const Business = ({ theme, toggleTheme }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [businessNews, setBusinessNews] = useState([]);
  const [stockMarket, setStockMarket] = useState([]);
  const [cryptocurrency, setCryptocurrency] = useState([]);
  const [personalFinance, setPersonalFinance] = useState([]);
  const [error, setError] = useState(null);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { label: 'Business News', value: 'business' },
    { label: 'Stock Market', value: 'stocks' },
    { label: 'Cryptocurrency', value: 'crypto' },
    { label: 'Personal Finance', value: 'finance' }
  ];

  // Function to get business-related image
  const getBusinessImage = (category) => {
    const images = {
      'business': '/images/business/news.jpg',
      'stocks': '/images/business/stocks.jpg',
      'crypto': '/images/business/crypto.jpg',
      'finance': '/images/business/finance.jpg'
    };
    return images[category] || '/images/business/default.jpg';
  };

  // Function to fetch business news from API
  const fetchBusinessNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'business',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getBusinessImage('business')
      }));
      setBusinessNews(news);
    } catch (error) {
      console.error('Error fetching business news:', error);
      setError('Failed to fetch business news');
    }
  };

  // Function to fetch stock market data
  const fetchStockMarket = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=stock+market+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const stocks = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'stocks',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getBusinessImage('stocks')
      }));
      setStockMarket(stocks);
    } catch (error) {
      console.error('Error fetching stock market data:', error);
      setError('Failed to fetch stock market data');
    }
  };

  // Function to fetch cryptocurrency data
  const fetchCryptocurrency = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency+bitcoin&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const crypto = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'crypto',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getBusinessImage('crypto')
      }));
      setCryptocurrency(crypto);
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      setError('Failed to fetch cryptocurrency data');
    }
  };

  // Function to fetch personal finance data
  const fetchPersonalFinance = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=personal+finance+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const finance = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'finance',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getBusinessImage('finance')
      }));
      setPersonalFinance(finance);
    } catch (error) {
      console.error('Error fetching personal finance data:', error);
      setError('Failed to fetch personal finance data');
    }
  };

  // Function to fetch featured business news for slideshow
  const fetchFeaturedNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=5&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const featured = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.urlToImage || getBusinessImage('business')
      }));
      setFeaturedNews(featured);
    } catch (error) {
      console.error('Error fetching featured news:', error);
    }
  };

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchBusinessNews(),
          fetchStockMarket(),
          fetchCryptocurrency(),
          fetchPersonalFinance(),
          fetchFeaturedNews()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (featuredNews.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredNews.length]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Render featured news slideshow
  const renderSlideshow = () => {
    if (!featuredNews.length) return null;

    return (
      <Box sx={{ mb: 4, position: 'relative' }}>
        <Card 
          sx={{ 
            height: '400px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={featuredNews[currentSlide]?.image}
            alt={featuredNews[currentSlide]?.title}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              p: 3
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {featuredNews[currentSlide]?.title}
            </Typography>
            <Typography variant="body1">
              {featuredNews[currentSlide]?.description}
            </Typography>
          </Box>
        </Card>
        <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
          {featuredNews.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Box>
      </Box>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    switch (selectedTab) {
      case 0:
        return (
          <Box sx={{ mb: 4 }}>
            {renderSlideshow()}
            <Typography variant="h5" gutterBottom>
              Latest Business News
            </Typography>
            {businessNews.map((news) => (
              <Card 
                key={news.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {news.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {news.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Stock Market Updates
            </Typography>
            {stockMarket.map((stock) => (
              <Card 
                key={stock.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={stock.image}
                  alt={stock.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {stock.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {stock.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stock.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Cryptocurrency News
            </Typography>
            {cryptocurrency.map((crypto) => (
              <Card 
                key={crypto.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={crypto.image}
                  alt={crypto.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {crypto.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {crypto.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {crypto.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Personal Finance
            </Typography>
            {personalFinance.map((finance) => (
              <Card 
                key={finance.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={finance.image}
                  alt={finance.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {finance.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {finance.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {finance.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={6} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <div className="business-content">
          <Ticker category="business" />
          <Typography variant="h4" component="h1" gutterBottom>
            Business News
          </Typography>

          {/* Categories */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange} 
              variant="scrollable" 
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }
              }}
            >
              {categories.map((category, index) => (
                <Tab 
                  key={category.value} 
                  label={category.label} 
                  id={`business-tab-${index}`}
                />
              ))}
            </Tabs>
          </Box>

          {/* Content based on selected tab */}
          {renderContent()}
        </div>
      </Grid>

      <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
        <RightPart theme={theme} toggleTheme={toggleTheme} />
      </Grid>
    </Grid>
  );
};

export default Business; 