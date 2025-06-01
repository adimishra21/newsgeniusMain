import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import Ticker from '../Ticker/Ticker';
import { useNavigate } from 'react-router-dom';
import { 
  getTechNews, 
  getAiNews, 
  getGadgetsNews, 
  getStartupsNews, 
  getFeaturedTechNews 
} from '../../utils/technologyAPI';

const Technology = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
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

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch all data concurrently for better performance
        const [
          techData,
          aiData,
          gadgetsData,
          startupsData,
          featuredData
        ] = await Promise.all([
          getTechNews(),
          getAiNews(),
          getGadgetsNews(),
          getStartupsNews(),
          getFeaturedTechNews()
        ]);
        
        // Update state with fetched data
        setTechNews(techData);
        setAiNews(aiData);
        setGadgets(gadgetsData);
        setStartups(startupsData);
        setFeaturedNews(featuredData);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
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
          onClick={() => navigate(`/technology/details/${encodeURIComponent(featuredNews[currentSlide]?.id)}/technology`)}
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
        newsToShow = techNews;
        break;
      case 1:
        newsToShow = aiNews;
        break;
      case 2:
        newsToShow = gadgets;
        break;
      case 3:
        newsToShow = startups;
        break;
      default:
        newsToShow = techNews;
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
                onClick={() => navigate(`/technology/details/${encodeURIComponent(news.id)}/technology`)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={news.image || getTechImage(news.category)}
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
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        bgcolor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1 
                      }}
                    >
                      {news.category}
                    </Typography>
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