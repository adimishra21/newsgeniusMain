import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import Ticker from '../Ticker/Ticker';
import axios from 'axios';

const Technology = ({ theme, toggleTheme }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [techNews, setTechNews] = useState([]);
  const [aiNews, setAiNews] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const [startups, setStartups] = useState([]);
  const [error, setError] = useState(null);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { label: 'Technology', value: 'tech' },
    { label: 'Artificial Intelligence', value: 'ai' },
    { label: 'Gadgets', value: 'gadgets' },
    { label: 'Startups', value: 'startups' }
  ];

  // Function to get technology-related image
  const getTechImage = (category) => {
    const images = {
      'tech': '/images/technology/tech.jpg',
      'ai': '/images/technology/ai.jpg',
      'gadgets': '/images/technology/gadgets.jpg',
      'startups': '/images/technology/startups.jpg'
    };
    return images[category] || '/images/technology/default.jpg';
  };

  // Function to fetch technology news
  const fetchTechNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'tech',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getTechImage('tech')
      }));
      setTechNews(news);
    } catch (error) {
      console.error('Error fetching technology news:', error);
      setError('Failed to fetch technology news');
    }
  };

  // Function to fetch AI news
  const fetchAiNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=artificial+intelligence+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'ai',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getTechImage('ai')
      }));
      setAiNews(news);
    } catch (error) {
      console.error('Error fetching AI news:', error);
      setError('Failed to fetch AI news');
    }
  };

  // Function to fetch gadgets news
  const fetchGadgetsNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=gadgets+technology+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'gadgets',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getTechImage('gadgets')
      }));
      setGadgets(news);
    } catch (error) {
      console.error('Error fetching gadgets news:', error);
      setError('Failed to fetch gadgets news');
    }
  };

  // Function to fetch startups news
  const fetchStartupsNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=tech+startups+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'startups',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getTechImage('startups')
      }));
      setStartups(news);
    } catch (error) {
      console.error('Error fetching startups news:', error);
      setError('Failed to fetch startups news');
    }
  };

  // Function to fetch featured technology news
  const fetchFeaturedNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=5&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const featured = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.urlToImage || getTechImage('tech')
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
          fetchTechNews(),
          fetchAiNews(),
          fetchGadgetsNews(),
          fetchStartupsNews(),
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
              Latest Technology News
            </Typography>
            {techNews.map((news) => (
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
              Artificial Intelligence News
            </Typography>
            {aiNews.map((news) => (
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
      case 2:
        return (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Latest Gadgets
            </Typography>
            {gadgets.map((news) => (
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
      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Tech Startups
            </Typography>
            {startups.map((news) => (
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
        <div className="technology-content">
          <Ticker category="technology" />
          <Typography variant="h4" component="h1" gutterBottom>
            Technology News
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
                  id={`technology-tab-${index}`}
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

export default Technology; 