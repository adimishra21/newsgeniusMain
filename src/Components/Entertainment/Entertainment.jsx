import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton, Tabs, Tab } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TheatersIcon from '@mui/icons-material/Theaters';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
import './Entertainment.css';
import { getEntertainmentNews, getBollywoodNews, getHollywoodNews, getTollywoodNews } from '../../utils/newsAPI';

const Entertainment = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [value, setValue] = useState(0);
  const [bollywoodNews, setBollywoodNews] = useState([]);
  const [hollywoodNews, setHollywoodNews] = useState([]);
  const [tollywoodNews, setTollywoodNews] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [upcomingReleases, setUpcomingReleases] = useState([]);

  const categories = ['Bollywood', 'Hollywood', 'Tollywood'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all news in parallel with error handling for each request
        const fetchWithErrorHandling = async (fetchFunction, category) => {
          try {
            const response = await fetchFunction();
            console.log(`${category} API Response:`, response);
            if (!response.articles || response.articles.length === 0) {
              console.warn(`No articles found for ${category}`);
              return [];
            }
            return response.articles;
          } catch (error) {
            console.error(`Error fetching ${category} news:`, error);
            return [];
          }
        };

        const [bollywoodArticles, hollywoodArticles, tollywoodArticles, headlinesArticles] = await Promise.all([
          fetchWithErrorHandling(getBollywoodNews, 'Bollywood'),
          fetchWithErrorHandling(getHollywoodNews, 'Hollywood'),
          fetchWithErrorHandling(getTollywoodNews, 'Tollywood'),
          fetchWithErrorHandling(getEntertainmentNews, 'Headlines')
        ]);

        // Process and set the news data with validation
        const processArticles = (articles, category) => {
          if (!Array.isArray(articles) || articles.length === 0) {
            console.warn(`No valid articles for ${category}`);
            return [];
          }
          return articles.slice(0, 6).map(article => ({
            ...article,
            urlToImage: article.urlToImage || '/logo.jpg',
            title: article.title || 'No title available',
            description: article.description || 'No description available',
            source: article.source || { name: 'Unknown Source' },
            publishedAt: article.publishedAt || new Date().toISOString()
          }));
        };

        setBollywoodNews(processArticles(bollywoodArticles, 'Bollywood'));
        setHollywoodNews(processArticles(hollywoodArticles, 'Hollywood'));
        setTollywoodNews(processArticles(tollywoodArticles, 'Tollywood'));
        setHeadlines(headlinesArticles.slice(0, 5).map(article => article.title || 'No headline available'));

        // Mock upcoming releases data since we don't have an API for it
        setUpcomingReleases([
          {
            id: 1,
            title: "Upcoming Movie 1",
            releaseDate: "2024-04-01",
            type: "Movie",
            image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop"
          },
          {
            id: 2,
            title: "Upcoming Movie 2",
            releaseDate: "2024-04-15",
            type: "Movie",
            image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop"
          },
          {
            id: 3,
            title: "Upcoming Series 1",
            releaseDate: "2024-05-01",
            type: "Series",
            image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop"
          }
        ]);

      } catch (error) {
        console.error('Error in fetchNews:', error);
        setError('Failed to load entertainment news. Please try again later.');
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
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Grid>
        <Grid item xs={12} lg={9} className="px-5 lg:px-9 hidden lg:block w-full relative">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading entertainment content...</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Grid>
        <Grid item xs={12} lg={9} className="px-5 lg:px-9 hidden lg:block w-full relative">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
            <Button onClick={() => window.location.reload()} sx={{ ml: 2 }}>
              Retry
            </Button>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  const renderNews = (news) => (
    <Grid container spacing={2}>
      {news.map((article) => (
        <Grid item xs={12} key={article.url}>
          <Box
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
              }
            }}
            onClick={() => window.open(article.url, '_blank')}
          >
            <Box sx={{ width: '120px', height: '120px', flexShrink: 0 }}>
              <img
                src={article.urlToImage || '/logo.jpg'}
                alt={article.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
            <Box sx={{ p: 2, flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {article.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {article.source.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      {/* Mobile Navigation Header */}
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 1,
          p: 1,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6">Entertainment</Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Navigation */}
      {showMobileNav && (
        <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Box>
      )}

      {/* Desktop Navigation */}
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} lg={9} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>Entertainment News</Typography>
          
          {/* Headlines Ticker */}
          <Box className="ticker-wrap" sx={{ mb: 4 }}>
            <div className="ticker">
              {headlines.map((headline, index) => (
                <div className="ticker-item" key={index}>{headline}</div>
              ))}
            </div>
          </Box>
          
          {/* Upcoming Releases */}
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            <TheatersIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Upcoming Releases
          </Typography>
          <Grid container spacing={2}>
            {upcomingReleases.map((release) => (
              <Grid item xs={12} sm={6} md={4} key={release.id}>
                <Box
                  className="movie-card"
                  onClick={() => navigate(`/entertainment/details/${release.id}/${release.category || 'entertainment'}`)}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    height: 200,
                    backgroundImage: `url(${release.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    mb: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      zIndex: 1
                    }
                  }}
                >
                  <Box 
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.7)',
                      p: 1,
                      zIndex: 2
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>
                      {release.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                      {release.releaseDate}
                    </Typography>
                    <Box 
                      className={release.type === 'Movie' ? 'movie-badge' : 'series-badge'}
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: 10,
                        px: 1,
                        borderRadius: 1,
                        fontSize: '0.7rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {release.type}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          {/* Bollywood News */}
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            <MovieIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Bollywood News
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={value} onChange={handleChange}>
              {categories.map((category, index) => (
                <Tab key={index} label={category} />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ mt: 3 }}>
            {value === 0 && renderNews(bollywoodNews)}
          </Box>
          
          {/* Hollywood News */}
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            <LiveTvIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Hollywood News
          </Typography>
          <Box sx={{ mt: 3 }}>
            {value === 1 && renderNews(hollywoodNews)}
          </Box>
          
          {/* Tollywood News */}
          <Typography variant="h5" gutterBottom sx={{ mt: 5, mb: 2 }}>
            <TheatersIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Tollywood News
          </Typography>
          <Box sx={{ mt: 3 }}>
            {value === 2 && renderNews(tollywoodNews)}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Entertainment;