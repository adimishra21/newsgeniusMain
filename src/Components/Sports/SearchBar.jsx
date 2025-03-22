import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (term) => {
    if (!term.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      // Here you would typically make an API call to search for sports news
      // For now, we'll use mock data
      const mockResults = [
        { id: 1, title: 'Cricket World Cup 2024', category: 'cricket' },
        { id: 2, title: 'Premier League Match Report', category: 'football' },
        { id: 3, title: 'Olympic Games 2024', category: 'olympics' },
        { id: 4, title: 'Tennis Grand Slam', category: 'tennis' },
        { id: 5, title: 'Hockey Championship', category: 'hockey' }
      ].filter(item => 
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase())
      );

      setResults(mockResults);
      setShowResults(true);
      onSearch(term, mockResults);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setShowResults(false);
    onSearch('', []);
  };

  return (
    <Box sx={{ position: 'relative', mb: 3 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '8px',
          '&:hover': {
            borderColor: 'primary.main'
          }
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search sports news..."
          value={searchTerm}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {showResults && results.length > 0 && (
        <Paper 
          elevation={3}
          sx={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            zIndex: 1000,
            maxHeight: 300,
            overflow: 'auto'
          }}
        >
          <List>
            {results.map((result) => (
              <ListItem 
                key={result.id}
                button
                onClick={() => {
                  setSearchTerm(result.title);
                  setShowResults(false);
                  onSearch(result.title, [result]);
                }}
              >
                <ListItemText
                  primary={result.title}
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar; 