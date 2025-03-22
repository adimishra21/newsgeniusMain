import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton, Tabs, Tab } from "@mui/material";
=======
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton } from "@mui/material";
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
import Navigation from "../Navigation/Navigation";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TheatersIcon from '@mui/icons-material/Theaters';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
<<<<<<< HEAD
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
=======
import './Entertainment.css';
import { 
  getEntertainmentHeadlines, 
  getBollywoodNews, 
  getHollywoodNews, 
  getTollywoodNews, 
  getUpcomingReleases 
} from '../../utils/entertainmentAPI';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import { useNavigate, useParams } from 'react-router-dom';
import FuelUpdates from '../FuelUpdates/FuelUpdates';

const Entertainment = ({ theme }) => {
  const navigate = useNavigate();
  const { category, tag } = useParams(); // Get category or tag from URL if present
  const [headlines, setHeadlines] = useState([]);
  const [bollywoodNews, setBollywoodNews] = useState([]);
  const [hollywoodNews, setHollywoodNews] = useState([]);
  const [tollywoodNews, setTollywoodNews] = useState([]);
  const [upcomingReleases, setUpcomingReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(category || "all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Mobile navigation
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Set initial category from URL params if available
  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
      setShowFilters(true);
    }
  }, [category]);

  // Fetch entertainment news and data
  useEffect(() => {
    const fetchEntertainmentData = async () => {
      try {
        // Fetch all data concurrently for better performance
        const [
          headlinesData,
          bollywoodData,
          hollywoodData,
          tollywoodData,
          releasesData
        ] = await Promise.all([
          getEntertainmentHeadlines(),
          getBollywoodNews(),
          getHollywoodNews(),
          getTollywoodNews(),
          getUpcomingReleases()
        ]);
        
        // Update state with fetched data
        setHeadlines(headlinesData);
        setBollywoodNews(bollywoodData);
        setHollywoodNews(hollywoodData);
        setTollywoodNews(tollywoodData);
        setUpcomingReleases(releasesData);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching entertainment data:", error);
        setError("Failed to load entertainment news. Please try again later.");
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
        setLoading(false);
      }
    };

<<<<<<< HEAD
    fetchNews();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

=======
    fetchEntertainmentData();
  }, []);

  // Handle search functionality
  const handleSearch = (searchTerm, results) => {
    setSearchResults(results);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchResults(null); // Clear search results when changing category
    
    // Update URL to reflect the selected category
    if (category === "all") {
      navigate('/entertainment');
    } else {
      navigate(`/entertainment/category/${category}`);
    }
  };

  const filterContentByCategory = (contentArray, category) => {
    // If there's a tag parameter, filter by tag
    if (tag) {
      return contentArray.filter(item => {
        const title = item.title.toLowerCase();
        const description = (item.description || "").toLowerCase();
        return title.includes(tag.toLowerCase()) || description.includes(tag.toLowerCase());
      });
    }
    
    if (category === "all") return contentArray;
    
    // This would be more sophisticated in a real app with proper categorization
    // This is just a simple mock implementation
    const categoryMapping = {
      "movies": ["movie", "film", "cinema", "bollywood", "hollywood", "tollywood"],
      "tv": ["tv", "series", "show", "netflix", "disney+", "streaming"],
      "music": ["music", "song", "album", "concert", "singer"],
      "celebrities": ["actor", "actress", "star", "celebrity"]
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
      onClick={() => navigate(`/entertainment/details/${news.id}`)}
    >
      <Box sx={{ 
        width: '100%', 
        height: '180px', 
        backgroundImage: `url(${news.image || 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop'})`,
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

  const ReleaseCard = ({ release }) => (
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
      onClick={() => navigate(`/entertainment/details/${release.id}`)}
    >
      <Box sx={{ 
        width: '100%', 
        height: '160px', 
        backgroundImage: `url(${release.image || 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop'})`,
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
          {release.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
          <Typography variant="body2" color="text.secondary">
            {release.releaseDate}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              bgcolor: release.type === 'Movie' ? 'primary.main' : 'secondary.main',
              color: 'white',
              px: 1,
              borderRadius: '4px'
            }}
          >
            {release.type}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
  if (loading) {
    return (
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
<<<<<<< HEAD
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Grid>
        <Grid item xs={12} lg={9} className="px-5 lg:px-9 hidden lg:block w-full relative">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading entertainment content...</Typography>
=======
          <Navigation theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <CircularProgress />
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
        <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
<<<<<<< HEAD
          <Navigation activePage="entertainment" theme={theme} toggleTheme={toggleTheme} />
        </Grid>
        <Grid item xs={12} lg={9} className="px-5 lg:px-9 hidden lg:block w-full relative">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
            <Button onClick={() => window.location.reload()} sx={{ ml: 2 }}>
              Retry
            </Button>
=======
          <Navigation theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
          </Alert>
        </Grid>
      </Grid>
    );
  }

<<<<<<< HEAD
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
=======
  // Filter content by selected category
  const filteredBollywood = filterContentByCategory(bollywoodNews, currentCategory);
  const filteredHollywood = filterContentByCategory(hollywoodNews, currentCategory);
  const filteredTollywood = filterContentByCategory(tollywoodNews, currentCategory);
  const filteredReleases = filterContentByCategory(upcomingReleases, currentCategory);

  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      {/* Mobile Navigation Header - Only visible on small screens */}
      <Box 
        sx={{ 
          display: { xs: 'flex', lg: 'none' }, 
          width: '100%', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          mt: 1
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
        }}
      >
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
<<<<<<< HEAD
        <Typography variant="h6">Entertainment</Typography>
=======
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Entertainment
        </Typography>
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>
<<<<<<< HEAD

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
=======
      
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

      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
        {/* Entertainment Header and Ticker */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <TheatersIcon sx={{ mr: 1 }} fontSize="large" />
              Entertainment {tag && <span style={{ fontWeight: 'normal', fontSize: '0.7em', marginLeft: '8px' }}>#{tag}</span>}
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
                    onClick={() => navigate(`/entertainment/category/${result.type === 'movie' ? 'movies' : result.type === 'celebrity' ? 'celebrities' : 'all'}`)}
                  >
                    <Typography variant="h6">{result.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{result.category}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Upcoming Releases Section */}
        {!searchResults && filteredReleases.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <LiveTvIcon sx={{ mr: 1 }} />
              Upcoming Movies & Shows
            </Typography>
            
            <Grid container spacing={3}>
              {filteredReleases.map((release) => (
                <Grid item xs={12} sm={6} md={4} key={release.id}>
                  <ReleaseCard release={release} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Bollywood Section */}
        {!searchResults && filteredBollywood.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              Bollywood News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredBollywood.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Hollywood Section */}
        {!searchResults && filteredHollywood.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              Hollywood News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredHollywood.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Tollywood Section */}
        {!searchResults && filteredTollywood.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <MovieIcon sx={{ mr: 1 }} />
              Tollywood News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredTollywood.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* No results message */}
        {!searchResults && filteredBollywood.length === 0 && filteredHollywood.length === 0 && filteredTollywood.length === 0 && filteredReleases.length === 0 && (
          <Alert severity="info" sx={{ mt: 4 }}>
            No entertainment content found for this category. Try selecting a different category.
          </Alert>
        )}

        {/* Related Articles */}
        <Grid item xs={12} lg={3} sx={{ 
          mt: { xs: 4, lg: 4 },
          pl: { xs: 2, lg: 2 },
          pr: { xs: 2, lg: 0 }
        }}>
          {/* Fuel Updates Section */}
          <Box sx={{ mb: 4 }}>
            <FuelUpdates />
          </Box>

          <Typography variant="h6" gutterBottom>Related Articles</Typography>
          {relatedArticles && relatedArticles.map((related) => (
            <Box 
              key={related.id}
              sx={{ 
                mb: 2,
                cursor: 'pointer',
                '&:hover': {
                  '& .title': {
                    color: 'primary.main'
                  }
                }
              }}
              onClick={() => navigate(`/entertainment/details/${related.id}`)}
            >
              <Box 
                component="img"
                src={related.image}
                alt={related.title}
                sx={{ 
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 1
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <Typography 
                variant="subtitle2" 
                className="title"
                sx={{ 
                  fontWeight: 'bold',
                  transition: 'color 0.2s'
                }}
              >
                {related.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {related.publishDate}
              </Typography>
            </Box>
          ))}
        </Grid>
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
      </Grid>
    </Grid>
  );
};

<<<<<<< HEAD
export default Entertainment;
=======
export default Entertainment; 
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
