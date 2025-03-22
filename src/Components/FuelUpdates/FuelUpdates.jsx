import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Grid } from '@mui/material';

const FuelUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=fuel+price+india&language=en&sortBy=publishedAt&apiKey=9e76e457ea734bd79ae1f3b784796948`
        );
        setNews(response.data.articles.slice(0, 6)); // Limit to 6 articles
      } catch (error) {
        console.error('Error fetching fuel news:', error);
        setError('Failed to load fuel updates');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
=======
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton
} from '@mui/material';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getFuelPrices } from '../../utils/fuelAPI';

const FuelUpdates = () => {
  const [fuelData, setFuelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [lastPrices, setLastPrices] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const data = await getFuelPrices();
      
      // Store current prices for comparison
      if (fuelData) {
        setLastPrices(fuelData);
      }
      
      setFuelData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch fuel prices. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Refresh prices every 30 minutes
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleRefresh = () => {
    fetchData();
  };

  const getPriceChange = (current, previous, type) => {
    if (!previous || !previous[selectedState]) return null;
    
    const diff = current - previous[selectedState][type];
    if (Math.abs(diff) < 0.01) return null;
    
    return {
      diff: diff.toFixed(2),
      increased: diff > 0
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
<<<<<<< HEAD
      <Alert severity="error" sx={{ mt: 2 }}>
=======
      <Alert severity="error" sx={{ mb: 2 }}>
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
        {error}
      </Alert>
    );
  }

<<<<<<< HEAD
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Fuel Updates
      </Typography>
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
=======
  const states = Object.keys(fuelData || {});
  const currentPrices = fuelData[selectedState];
  const petrolChange = getPriceChange(currentPrices.petrol, lastPrices, 'petrol');
  const dieselChange = getPriceChange(currentPrices.diesel, lastPrices, 'diesel');

  return (
    <Box sx={{ 
      p: 2, 
      bgcolor: 'background.paper', 
      borderRadius: 1, 
      boxShadow: 1,
      position: 'relative' 
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalGasStationIcon sx={{ mr: 1 }} />
          Fuel Price Updates
        </Typography>
        <Tooltip title="Refresh prices">
          <IconButton 
            onClick={handleRefresh} 
            disabled={refreshing}
            size="small"
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="state-select-label">Select State</InputLabel>
        <Select
          labelId="state-select-label"
          id="state-select"
          value={selectedState}
          label="Select State"
          onChange={handleStateChange}
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fuel Type</TableCell>
              <TableCell align="right">Price (₹/L)</TableCell>
              <TableCell align="right">Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Petrol</TableCell>
              <TableCell align="right">₹ {currentPrices.petrol.toFixed(2)}</TableCell>
              <TableCell align="right">
                {petrolChange && (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {petrolChange.increased ? (
                      <TrendingUpIcon color="error" fontSize="small" />
                    ) : (
                      <TrendingDownIcon color="success" fontSize="small" />
                    )}
                    <Typography 
                      variant="body2" 
                      color={petrolChange.increased ? 'error' : 'success'}
                      sx={{ ml: 0.5 }}
                    >
                      {petrolChange.increased ? '+' : ''}{petrolChange.diff}
                    </Typography>
                  </Box>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Diesel</TableCell>
              <TableCell align="right">₹ {currentPrices.diesel.toFixed(2)}</TableCell>
              <TableCell align="right">
                {dieselChange && (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {dieselChange.increased ? (
                      <TrendingUpIcon color="error" fontSize="small" />
                    ) : (
                      <TrendingDownIcon color="success" fontSize="small" />
                    )}
                    <Typography 
                      variant="body2" 
                      color={dieselChange.increased ? 'error' : 'success'}
                      sx={{ ml: 0.5 }}
                    >
                      {dieselChange.increased ? '+' : ''}{dieselChange.diff}
                    </Typography>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="caption" color="text.secondary">
        Last Updated: {currentPrices.lastUpdated}
      </Typography>
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
    </Box>
  );
};

<<<<<<< HEAD
export default FuelUpdates;
=======
export default FuelUpdates; 
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
