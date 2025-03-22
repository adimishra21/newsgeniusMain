import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab, Chip, Stack, CircularProgress, Divider } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import Ticker from '../Ticker/Ticker';
import axios from 'axios';

const Astrology = ({ theme, toggleTheme }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [horoscopePredictions, setHoroscopePredictions] = useState([]);
  const [tarotReadings, setTarotReadings] = useState([]);
  const [remedies, setRemedies] = useState([]);
  const [vedicAstrology, setVedicAstrology] = useState([]);
  const [error, setError] = useState(null);
  const [astrologyNews, setAstrologyNews] = useState([]);
  const [horoscopes, setHoroscopes] = useState([]);
  const [zodiacSigns, setZodiacSigns] = useState([]);
  const [numerology, setNumerology] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { label: 'Astrology News', value: 'astrology' },
    { label: 'Daily Horoscopes', value: 'horoscopes' },
    { label: 'Tarot Cards', value: 'tarot' },
    { label: 'Vedic Astrology', value: 'vedic' },
    { label: 'Zodiac Signs', value: 'zodiac' },
    { label: 'Numerology', value: 'numerology' }
  ];

  // Function to get random astrology-related image
  const getAstrologyImage = (query) => {
    const images = {
      // Zodiac Signs
      'aries': '/images/astrology/zodiac/aries.jpg',
      'taurus': '/images/astrology/zodiac/taurus.jpg',
      'gemini': '/images/astrology/zodiac/gemini.jpg',
      'cancer': '/images/astrology/zodiac/cancer.jpg',
      'leo': '/images/astrology/zodiac/leo.jpg',
      'virgo': '/images/astrology/zodiac/virgo.jpg',
      'libra': '/images/astrology/zodiac/libra.jpg',
      'scorpio': '/images/astrology/zodiac/scorpio.jpg',
      'sagittarius': '/images/astrology/zodiac/sagittarius.jpg',
      'capricorn': '/images/astrology/zodiac/capricorn.jpg',
      'aquarius': '/images/astrology/zodiac/aquarius.jpg',
      'pisces': '/images/astrology/zodiac/pisces.jpg',
      
      // Categories
      'tarot': '/images/astrology/categories/tarot.jpg',
      'remedies': '/images/astrology/categories/remedies.jpg',
      'vedic': '/images/astrology/categories/vedic.jpg'
    };

    // If the query is a zodiac sign, return its specific image
    if (images[query]) {
      return images[query];
    }

    // For other queries, return a default image
    return '/images/astrology/categories/default.jpg';
  };

  // Function to fetch daily horoscope
  const fetchHoroscope = () => {
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    const predictions = signs.map(sign => ({
      id: sign,
      sign: sign.charAt(0).toUpperCase() + sign.slice(1),
      prediction: `Today's horoscope for ${sign.charAt(0).toUpperCase() + sign.slice(1)}: A day of growth and opportunities. Focus on personal development and new ventures. Your creative energy is at its peak today. Good time for starting new projects or taking initiative in existing ones. Health remains stable, but avoid overexertion.`,
      date: new Date().toLocaleDateString(),
      image: getAstrologyImage(sign),
      luckyNumber: Math.floor(Math.random() * 9) + 1,
      luckyColor: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'White'][Math.floor(Math.random() * 8)]
    }));
    setHoroscopePredictions(predictions);
  };

  // Function to fetch tarot readings
  const fetchTarotReadings = () => {
    const cards = ['The Sun', 'The Moon', 'The Star'];
    const reading = {
      id: Date.now(),
      title: `${new Date().toLocaleDateString()} Tarot Card Revelations`,
      cards,
      reading: cards.map(card => `${card}: Today's cards suggest a period of enlightenment and new beginnings. The ${card} indicates success and vitality.`).join('\n\n'),
      image: getAstrologyImage('tarot'),
      date: new Date().toLocaleDateString()
    };
    setTarotReadings([reading]);
  };

  // Function to fetch remedies
  const fetchRemedies = () => {
    const remedy = {
      id: Date.now(),
      title: 'Daily Spiritual Remedy',
      description: 'Here are some effective spiritual remedies for today:\n\n1. Start your day with meditation\n2. Practice gratitude\n3. Connect with nature\n4. Help others in need\n5. Maintain positive thoughts',
      image: getAstrologyImage('remedies'),
      date: new Date().toLocaleDateString()
    };
    setRemedies([remedy]);
  };

  // Function to fetch vedic astrology
  const fetchVedicAstrology = () => {
    const vedic = {
      id: Date.now(),
      title: 'Vedic Astrology Insights',
      description: 'Today\'s Vedic astrology insights:\n\n1. The Moon is in a favorable position\n2. Good time for spiritual practices\n3. Focus on personal growth\n4. Maintain harmony in relationships\n5. Practice mindfulness',
      image: getAstrologyImage('vedic'),
      date: new Date().toLocaleDateString()
    };
    setVedicAstrology([vedic]);
  };

  // Function to fetch astrology news
  const fetchAstrologyNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=astrology+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'astrology',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getAstrologyImage('astrology')
      }));
      setAstrologyNews(news);
    } catch (error) {
      console.error('Error fetching astrology news:', error);
      setError('Failed to fetch astrology news');
    }
  };

  // Function to fetch horoscopes news
  const fetchHoroscopesNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=daily+horoscope+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'horoscopes',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getAstrologyImage('horoscopes')
      }));
      setHoroscopes(news);
    } catch (error) {
      console.error('Error fetching horoscopes news:', error);
      setError('Failed to fetch horoscopes news');
    }
  };

  // Function to fetch zodiac signs news
  const fetchZodiacSignsNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=zodiac+signs+astrology+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'zodiac',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getAstrologyImage('zodiac')
      }));
      setZodiacSigns(news);
    } catch (error) {
      console.error('Error fetching zodiac signs news:', error);
      setError('Failed to fetch zodiac signs news');
    }
  };

  // Function to fetch numerology news
  const fetchNumerologyNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=numerology+astrology+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'numerology',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getAstrologyImage('numerology')
      }));
      setNumerology(news);
    } catch (error) {
      console.error('Error fetching numerology news:', error);
      setError('Failed to fetch numerology news');
    }
  };

  // Function to fetch featured astrology news
  const fetchFeaturedNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=astrology+india&sortBy=publishedAt&language=en&pageSize=5&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const featured = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.urlToImage || getAstrologyImage('astrology')
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
        fetchHoroscope();
        fetchTarotReadings();
        fetchRemedies();
        fetchVedicAstrology();
        await Promise.all([
          fetchAstrologyNews(),
          fetchHoroscopesNews(),
          fetchZodiacSignsNews(),
          fetchNumerologyNews(),
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
              Latest Astrology News
            </Typography>
            {astrologyNews.map((news) => (
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
              Daily Horoscopes
            </Typography>
            {horoscopes.map((news) => (
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
              Tarot Card Readings
            </Typography>
            {tarotReadings.map((reading) => (
              <Card 
                key={reading.id} 
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
                  image={reading.image}
                  alt="Tarot Cards"
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {reading.title}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    {reading.cards.map((card, index) => (
                      <Chip 
                        key={index} 
                        label={card} 
                        size="small"
                        sx={{ fontWeight: 'medium' }}
                      />
                    ))}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {reading.reading}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {reading.date}
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
              Vedic Astrology
            </Typography>
            {vedicAstrology.map((item) => (
              <Card 
                key={item.id} 
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
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    {item.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 4:
        return (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Zodiac Signs
            </Typography>
            {zodiacSigns.map((news) => (
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
      case 5:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Numerology
            </Typography>
            {numerology.map((news) => (
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
        <div className="astrology-content">
          <Ticker category="astrology" />
          <Typography variant="h4" component="h1" gutterBottom>
            Astrology News
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
                  id={`astrology-tab-${index}`}
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

export default Astrology; 