import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  CircularProgress, 
  Alert,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Avatar,
  Chip,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { 
  getSportsHeadlines, 
  getCricketNews, 
  getFootballNews, 
  getTennisNews, 
  getHockeyNews,
  getLiveScores,
  getUpcomingMatches
} from '../../utils/sportsAPI';
import './Sports.css';

const Sports = ({ theme }) => {
  const navigate = useNavigate();
  const { category, tag } = useParams();
  const [allNews, setAllNews] = useState([]);
  const [cricketNews, setCricketNews] = useState([]);
  const [footballNews, setFootballNews] = useState([]);
  const [tennisNews, setTennisNews] = useState([]);
  const [hockeyNews, setHockeyNews] = useState([]);
  const [liveScores, setLiveScores] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(category || "all");
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Set initial category from URL params if available
  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
      setShowFilters(true);
    }
  }, [category]);

  // Fetch sports news and data
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        // Fetch all data concurrently for better performance
        const [
          headlinesData,
          cricketData,
          footballData,
          tennisData,
          hockeyData,
          scoresData,
          matchesData
        ] = await Promise.all([
          getSportsHeadlines(),
          getCricketNews(),
          getFootballNews(),
          getTennisNews(),
          getHockeyNews(),
          getLiveScores(),
          getUpcomingMatches()
        ]);
        
        // Update state with fetched data
        setAllNews(headlinesData);
        setCricketNews(cricketData);
        setFootballNews(footballData);
        setTennisNews(tennisData);
        setHockeyNews(hockeyData);
        setLiveScores(scoresData);
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

  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = [
      ...cricketNews,
      ...footballNews,
      ...tennisNews,
      ...hockeyNews,
      ...upcomingMatches
    ].filter(item => {
      return (
        item.title.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.category && item.category.toLowerCase().includes(query))
      );
    });
    
    setSearchResults(results);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSearchResults(null); // Clear search results when changing category
    
    // Update URL to reflect the selected category
    if (category === "all") {
      navigate('/sports');
    } else {
      navigate(`/sports/category/${category}`);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
    
    // For sports, we can directly use the category field
    return contentArray.filter(item => {
      const itemCategory = (item.category || "").toLowerCase();
      return itemCategory.includes(category.toLowerCase());
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
        backgroundImage: `url(${news.image || 'https://media.istockphoto.com/id/492556476/photo/stadium-light.jpg?s=612x612&w=0&k=20&c=h6ERnGrC14xhZjnqsYPkT7D3fpEJuWDC8leAgXbXE8k='})`,
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
          {news.category} • {news.date || 'Recent'}
        </Typography>
      </Box>
    </Box>
  );

  const ScoreCard = ({ match }) => (
    <Card sx={{ 
      mb: 2, 
      borderRadius: '8px', 
      overflow: 'hidden',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: match.category === 'cricket' ? 'rgba(0, 150, 136, 0.05)' : 
                match.category === 'football' ? 'rgba(63, 81, 181, 0.05)' :
                match.category === 'tennis' ? 'rgba(233, 30, 99, 0.05)' : 'rgba(255, 152, 0, 0.05)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip 
            label={match.status === 'live' ? 'LIVE' : match.status}
            size="small"
            color={match.status === 'live' ? 'error' : 'default'}
            sx={{ 
              height: '20px',
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {match.category}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={match.team1?.logo || ''} sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2" fontWeight="bold">
              {match.team1?.name || 'Team 1'}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={match.status === 'live' ? 'bold' : 'normal'}>
            {match.team1?.score || '0'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={match.team2?.logo || ''} sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography variant="body2" fontWeight="bold">
              {match.team2?.name || 'Team 2'}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={match.status === 'live' ? 'bold' : 'normal'}>
            {match.team2?.score || '0'}
          </Typography>
        </Box>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          {match.location} • {match.time}
        </Typography>
      </Box>
    </Card>
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
        height: '120px', 
        backgroundImage: `url(${match.image || 'https://media.istockphoto.com/id/492556476/photo/stadium-light.jpg?s=612x612&w=0&k=20&c=h6ERnGrC14xhZjnqsYPkT7D3fpEJuWDC8leAgXbXE8k='})`,
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {match.team1?.name || 'Team 1'} vs {match.team2?.name || 'Team 2'}
          </Typography>
          <Chip 
            label={match.category}
            size="small"
            sx={{ 
              height: '20px',
              bgcolor: match.category === 'cricket' ? 'rgba(0, 150, 136, 0.1)' : 
                      match.category === 'football' ? 'rgba(63, 81, 181, 0.1)' :
                      match.category === 'tennis' ? 'rgba(233, 30, 99, 0.1)' : 'rgba(255, 152, 0, 0.1)',
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.7rem'
              }
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
          <ScheduleIcon fontSize="inherit" sx={{ mr: 0.5 }} />
          {match.date} • {match.time}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {match.location}
        </Typography>
      </Box>
    </Box>
  );

  // Filter content by selected category
  const filteredCricket = filterContentByCategory(cricketNews, currentCategory);
  const filteredFootball = filterContentByCategory(footballNews, currentCategory);
  const filteredTennis = filterContentByCategory(tennisNews, currentCategory);
  const filteredHockey = filterContentByCategory(hockeyNews, currentCategory);
  const filteredScores = filterContentByCategory(liveScores, currentCategory);
  const filteredMatches = filterContentByCategory(upcomingMatches, currentCategory);

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
        {/* Sports Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <SportsFootballIcon sx={{ mr: 1 }} fontSize="large" />
              Sports News {tag && <span style={{ fontWeight: 'normal', fontSize: '0.7em', marginLeft: '8px' }}>#{tag}</span>}
            </Typography>
            <Button 
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>
          
          {/* Sports Headlines Ticker */}
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
                {allNews.map((headline, index) => (
                  <div key={index} className="ticker-item">
                    {headline}
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search for sports news, teams, or players"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSearch}
                    size="small"
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Box>

        {/* Category Filters */}
        {showFilters && (
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 2 }}
            >
              <Tab 
                label="All Sports" 
                onClick={() => handleCategoryChange('all')}
              />
              <Tab 
                label="Cricket" 
                icon={<SportsCricketIcon />} 
                iconPosition="start" 
                onClick={() => handleCategoryChange('cricket')}
              />
              <Tab 
                label="Football" 
                icon={<SportsFootballIcon />} 
                iconPosition="start" 
                onClick={() => handleCategoryChange('football')}
              />
              <Tab 
                label="Tennis" 
                icon={<SportsTennisIcon />} 
                iconPosition="start" 
                onClick={() => handleCategoryChange('tennis')}
              />
              <Tab 
                label="Hockey" 
                icon={<SportsHockeyIcon />} 
                iconPosition="start" 
                onClick={() => handleCategoryChange('hockey')}
              />
            </Tabs>
          </Box>
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
              <Grid container spacing={3}>
                {searchResults.map((result) => (
                  <Grid item xs={12} sm={6} md={4} key={result.id}>
                    {result.team1 ? <MatchCard match={result} /> : <NewsCard news={result} />}
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Live Scores Section */}
        {!searchResults && filteredScores.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
              Live Scores
            </Typography>
            <Grid container spacing={2}>
              {filteredScores.map((match) => (
                <Grid item xs={12} sm={6} md={4} key={match.id}>
                  <ScoreCard match={match} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Upcoming Matches */}
        {!searchResults && filteredMatches.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <ScheduleIcon sx={{ mr: 1 }} />
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

        {/* Tennis Section */}
        {!searchResults && filteredTennis.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <SportsTennisIcon sx={{ mr: 1 }} />
              Tennis News
            </Typography>
            
            <Grid container spacing={3}>
              {filteredTennis.map((news) => (
                <Grid item xs={12} sm={6} md={3} key={news.id}>
                  <NewsCard news={news} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* No results message */}
        {!searchResults && 
          filteredCricket.length === 0 && 
          filteredFootball.length === 0 && 
          filteredTennis.length === 0 && 
          filteredHockey.length === 0 && 
          filteredScores.length === 0 && 
          filteredMatches.length === 0 && (
          <Alert severity="info" sx={{ mt: 4 }}>
            No sports content found for this category. Try selecting a different category.
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default Sports; 