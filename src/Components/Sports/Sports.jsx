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
        setLoading(false);
      }
    };

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

      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

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
      </Grid>
    </Grid>
  );
};

export default Sports; 