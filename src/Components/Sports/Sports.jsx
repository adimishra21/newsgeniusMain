<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import './Sports.css';
import { 
  getSportsHeadlines, 
  getCricketNews, 
  getFootballNews, 
  getHockeyNews, 
  getUpcomingMatches 
} from '../../utils/sportsAPI';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import FuelUpdates from '../FuelUpdates/FuelUpdates';

const Sports = ({ theme }) => {
  const navigate = useNavigate();
  const { category, tag } = useParams();
  const [headlines, setHeadlines] = useState([]);
  const [cricketNews, setCricketNews] = useState([]);
  const [footballNews, setFootballNews] = useState([]);
  const [hockeyNews, setHockeyNews] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(category || "all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
      setShowFilters(true);
    }
  }, [category]);

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const [
          headlinesData,
          cricketData,
          footballData,
          hockeyData,
          matchesData
        ] = await Promise.all([
          getSportsHeadlines(),
          getCricketNews(),
          getFootballNews(),
          getHockeyNews(),
          getUpcomingMatches()
        ]);
        
        setHeadlines(headlinesData);
        setCricketNews(cricketData);
        setFootballNews(footballData);
        setHockeyNews(hockeyData);
        setUpcomingMatches(matchesData);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching sports data:", error);
        setError("Failed to load sports news. Please try again later.");
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
        setLoading(false);
      }
    };

<<<<<<< HEAD
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
=======
    fetchSportsData();
  }, []);

  const handleSearch = (searchTerm, results) => {
    setSearchResults(results);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchResults(null);
    
    if (category === "all") {
      navigate('/sports');
    } else {
      navigate(`/sports/category/${category}`);
    }
  };

  const filterContentByCategory = (contentArray, category) => {
    if (tag) {
      return contentArray.filter(item => {
        const title = item.title.toLowerCase();
        const description = (item.description || "").toLowerCase();
        return title.includes(tag.toLowerCase()) || description.includes(tag.toLowerCase());
      });
    }
    
    if (category === "all") return contentArray;
    
    const categoryMapping = {
      "cricket": ["cricket", "ipl", "t20", "test", "odi"],
      "football": ["football", "soccer", "premier league", "champions league"],
      "hockey": ["hockey", "nhl", "ice hockey", "field hockey"],
      "tennis": ["tennis", "grand slam", "wimbledon", "us open"],
      "olympics": ["olympics", "olympic", "games"]
    };
    
    return contentArray.filter(item => {
      const title = item.title.toLowerCase();
      const description = (item.description || "").toLowerCase();
      const terms = categoryMapping[category] || [];
      
      return terms.some(term => title.includes(term) || description.includes(term));
    });
  };

  const NewsCard = ({ news }) => (
    <Box 
      sx={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/sports/details/${news.id}/sports`)}
    >
      <Box sx={{ 
        width: '100%', 
        height: '180px', 
        backgroundImage: `url(${news.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 1
        }
      }} />
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {news.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {news.category} • {news.datePublished || 'Recent'}
        </Typography>
      </Box>
    </Box>
  );

  const MatchCard = ({ match }) => (
    <Box 
      sx={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer'
      }}
      onClick={() => navigate(`/sports/details/${match.id}/sports`)}
    >
      <Box sx={{ 
        width: '100%', 
        height: '160px', 
        backgroundImage: `url(${match.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.2)',
          zIndex: 1
        }
      }} />
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {match.title}
        </Typography>
        {match.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {match.description.length > 120 
              ? `${match.description.substring(0, 120)}...` 
              : match.description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Typography variant="body2" color="text.secondary">
            {match.matchDate}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              bgcolor: match.type === 'International' ? 'primary.main' : 'secondary.main',
              color: 'white',
              px: 1,
              borderRadius: '4px'
            }}
          >
            {match.type}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
          <Navigation theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
          <Navigation theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        </Grid>
      </Grid>
    );
  }

  const filteredCricket = filterContentByCategory(cricketNews, currentCategory);
  const filteredFootball = filterContentByCategory(footballNews, currentCategory);
  const filteredHockey = filterContentByCategory(hockeyNews, currentCategory);
  const filteredMatches = filterContentByCategory(upcomingMatches, currentCategory);

  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      {/* Mobile Navigation Header */}
      <Box 
        sx={{ 
          display: { xs: 'flex', lg: 'none' }, 
          width: '100%', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          mt: 1
        }}
      >
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Sports
        </Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>
      
      {/* Conditional Mobile Navigation */}
      {showMobileNav && (
        <Box sx={{ 
          display: { xs: 'block', lg: 'none' }, 
          width: '100%',
          mb: 3,
          p: 2,
          border: '1px solid #eee',
          borderRadius: '8px'
        }}>
          <Navigation theme={theme} />
        </Box>
      )}

>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

<<<<<<< HEAD
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
=======
      <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
        {/* Sports Header and Ticker */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <SportsCricketIcon sx={{ mr: 1 }} fontSize="large" />
              Sports {tag && <span style={{ fontWeight: 'normal', fontSize: '0.7em', marginLeft: '8px' }}>#{tag}</span>}
            </Typography>
            <Button 
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>
          
          {/* Headlines Ticker */}
          <Box 
            sx={{ 
              bgcolor: 'rgba(25, 118, 210, 0.08)', 
              p: 1.5, 
              borderRadius: '4px',
              border: '1px solid rgba(25, 118, 210, 0.2)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div className="ticker-wrap">
              <div className="ticker">
                {headlines.map((headline, index) => (
                  <div key={index} className="ticker-item">
                    {headline}
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Box>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Category Filters */}
        {showFilters && (
          <CategoryFilter 
            currentCategory={currentCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        )}

        {/* Search Results */}
        {searchResults && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Results
            </Typography>
            {searchResults.length === 0 ? (
              <Alert severity="info">No results found</Alert>
            ) : (
              <Box>
                {searchResults.map((result) => (
                  <Box 
                    key={result.id} 
                    sx={{ 
                      mb: 2, 
                      p: 2, 
                      border: '1px solid #ddd', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
                    }}
                    onClick={() => navigate(`/sports/category/${result.type === 'cricket' ? 'cricket' : result.type === 'football' ? 'football' : 'all'}`)}
                  >
                    <Typography variant="h6">{result.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{result.category}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Upcoming Matches Section */}
        {!searchResults && filteredMatches.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <SportsCricketIcon sx={{ mr: 1 }} />
              Upcoming Matches
            </Typography>
            
            <Grid container spacing={3}>
              {filteredMatches.map((match) => (
                <Grid item xs={12} sm={6} md={4} key={match.id}>
                  <MatchCard match={match} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Cricket Section */}
        {!searchResults && filteredCricket.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <SportsCricketIcon sx={{ mr: 1 }} />
              Cricket News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredCricket.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Football Section */}
        {!searchResults && filteredFootball.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <SportsFootballIcon sx={{ mr: 1 }} />
              Football News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredFootball.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Hockey Section */}
        {!searchResults && filteredHockey.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <SportsHockeyIcon sx={{ mr: 1 }} />
              Hockey News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredHockey.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* No results message */}
        {!searchResults && filteredCricket.length === 0 && filteredFootball.length === 0 && filteredHockey.length === 0 && filteredMatches.length === 0 && (
          <Alert severity="info" sx={{ mt: 4 }}>
            No sports content found for this category. Try selecting a different category.
          </Alert>
        )}
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
      </Grid>
    </Grid>
  );
};

export default Sports; 