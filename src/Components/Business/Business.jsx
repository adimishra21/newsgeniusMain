import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab, Chip, Stack, CircularProgress, Divider, Paper } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import Ticker from '../Ticker/Ticker';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Business = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
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
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=33b913e452b944178aeade1fdbbe1498`);
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
      const response = await axios.get(`https://newsapi.org/v2/everything?q=stock+market+india&sortBy=publishedAt&language=en&apiKey=33b913e452b944178aeade1fdbbe1498`);
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
      const response = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency+bitcoin&sortBy=publishedAt&language=en&apiKey=33b913e452b944178aeade1fdbbe1498`);
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
      const response = await axios.get(`https://newsapi.org/v2/everything?q=personal+finance+india&sortBy=publishedAt&language=en&apiKey=33b913e452b944178aeade1fdbbe1498`);
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
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=5&apiKey=33b913e452b944178aeade1fdbbe1498`);
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
            borderRadius: 2,
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/business/details/${encodeURIComponent(featuredNews[currentSlide]?.id)}/business`)}
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

    let newsToShow = [];
    switch (selectedTab) {
      case 0:
        newsToShow = businessNews;
        break;
      case 1:
        newsToShow = stockMarket;
        break;
      case 2:
        newsToShow = cryptocurrency;
        break;
      case 3:
        newsToShow = personalFinance;
        break;
      default:
        newsToShow = businessNews;
    }

    return (
      <Box>
        {renderSlideshow()}
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          {categories[selectedTab].label}
        </Typography>
        
        <Grid container spacing={3}>
          {newsToShow.map((news) => (
            <Grid item xs={12} sm={6} md={4} key={news.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 3
                  }
                }}
                onClick={() => navigate(`/business/details/${encodeURIComponent(news.id)}/business`)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={news.image || getBusinessImage(news.category)}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {news.description?.length > 120 ? 
                      `${news.description.substring(0, 120)}...` : 
                      news.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Chip 
                      label={news.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {news.date}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
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