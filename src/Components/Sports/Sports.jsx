import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab, Chip, Stack, CircularProgress } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import Ticker from '../Ticker/Ticker';
import axios from 'axios';

const Sports = ({ theme, toggleTheme }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cricketNews, setCricketNews] = useState([]);
  const [footballNews, setFootballNews] = useState([]);
  const [tennisNews, setTennisNews] = useState([]);
  const [hockeyNews, setHockeyNews] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { label: 'Cricket', value: 'cricket' },
    { label: 'Football', value: 'football' },
    { label: 'Tennis', value: 'tennis' },
    { label: 'Hockey', value: 'hockey' }
  ];

  // Function to fetch cricket news
  const fetchCricketNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=cricket+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'cricket',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage
      }));
      setCricketNews(news);
    } catch (error) {
      console.error('Error fetching cricket news:', error);
      setError('Failed to fetch cricket news');
    }
  };

  // Function to fetch football news
  const fetchFootballNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=football+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'football',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage
      }));
      setFootballNews(news);
    } catch (error) {
      console.error('Error fetching football news:', error);
      setError('Failed to fetch football news');
    }
  };

  // Function to fetch tennis news
  const fetchTennisNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=tennis+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'tennis',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage
      }));
      setTennisNews(news);
    } catch (error) {
      console.error('Error fetching tennis news:', error);
      setError('Failed to fetch tennis news');
    }
  };

  // Function to fetch hockey news
  const fetchHockeyNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=hockey+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'hockey',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage
      }));
      setHockeyNews(news);
    } catch (error) {
      console.error('Error fetching hockey news:', error);
      setError('Failed to fetch hockey news');
    }
  };

  // Function to fetch featured sports news
  const fetchFeaturedNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=sports+india&sortBy=publishedAt&language=en&pageSize=5&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const featured = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.urlToImage
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
          fetchCricketNews(),
          fetchFootballNews(),
          fetchTennisNews(),
          fetchHockeyNews(),
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
              Latest Cricket News
            </Typography>
            {cricketNews.map((news) => (
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
              Latest Football News
            </Typography>
            {footballNews.map((news) => (
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
              Latest Tennis News
            </Typography>
            {tennisNews.map((news) => (
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
              Latest Hockey News
            </Typography>
            {hockeyNews.map((news) => (
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

  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={6} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <div className="sports-content">
          <Ticker category="sports" />
          <Typography variant="h4" component="h1" gutterBottom>
            Sports News
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
                  id={`sports-tab-${index}`}
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

export default Sports; 