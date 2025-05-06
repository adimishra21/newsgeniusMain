import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Chip, 
  Grid, 
  CircularProgress, 
  Link, 
  Divider,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
import AutoTranslatedText from '../Common/AutoTranslatedText';
import { LanguageContext } from '../../utils/contexts';
import { searchNewsByTag, getTrendingNews } from '../../utils/newsSearchAPI';

const NewsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { language } = useContext(LanguageContext);

  // Fetch trending tags on component mount
  useEffect(() => {
    const fetchTrendingTags = async () => {
      try {
        setIsLoading(true);
        const results = await getTrendingNews('general', 10);
        
        // Transform news articles into tag format
        const newsToTags = results.map(article => ({
          tag: article.title.split(' ').slice(0, 3).join(' '),
          category: article.source.name || 'News'
        }));
        
        setTrendingTags(newsToTags);
      } catch (err) {
        console.error('Error fetching trending news:', err);
        setError('Failed to load trending topics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingTags();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      setIsLoading(true);
      setError('');
      const results = await searchNewsByTag(searchQuery);
      setSearchResults(results);
      
      // Check if the results indicate an error
      const hasError = results.some(article => 
        article.source === 'System' && article.url === '#'
      );
      
      if (hasError && results.length > 0) {
        setError(results[0].description);
      }
    } catch (err) {
      console.error('Error searching news:', err);
      setError('Failed to search news. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagClick = async (tag) => {
    setSearchQuery(tag);
    try {
      setIsLoading(true);
      setError('');
      const results = await searchNewsByTag(tag);
      setSearchResults(results);
      
      // Check if the results indicate an error
      const hasError = results.some(article => 
        article.source === 'System' && article.url === '#'
      );
      
      if (hasError && results.length > 0) {
        setError(results[0].description);
      }
    } catch (err) {
      console.error('Error searching news by tag:', err);
      setError('Failed to search news. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (err) {
      return dateString || 'Unknown date';
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        <AutoTranslatedText text="News Search" />
      </Typography>

      {/* Search form */}
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for news by keyword or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={isLoading}
              sx={{ height: '56px' }}
            >
              {isLoading ? <CircularProgress size={24} /> : <AutoTranslatedText text="Search News" />}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Trending Tags */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          <AutoTranslatedText text="Trending Topics" />
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {trendingTags.map((tagItem, index) => (
            <Chip
              key={index}
              label={tagItem.tag}
              color="primary"
              variant="outlined"
              onClick={() => handleTagClick(tagItem.tag)}
              sx={{ mb: 1 }}
            />
          ))}
          {trendingTags.length === 0 && !isLoading && (
            <Typography variant="body2" color="text.secondary">
              <AutoTranslatedText text="No trending topics available" />
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Error message */}
      {error && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error">
            <AutoTranslatedText text={error} />
          </Typography>
        </Box>
      )}

      {/* Search results */}
      <Box>
        {searchResults.length > 0 ? (
          <>
            <Typography variant="h5" gutterBottom>
              <AutoTranslatedText text={`Results for "${searchQuery}"`} />
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              {searchResults.map((article, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      {/* Article Image */}
                      <Box 
                        sx={{ 
                          width: '100%', 
                          height: 200, 
                          mb: 2,
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 1
                        }}
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-news.jpg';
                          }}
                        />
                      </Box>
                      
                      <Typography variant="h6" gutterBottom>
                        <AutoTranslatedText text={article.title} />
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <AutoTranslatedText text={`Source: ${article.source.name || article.source}`} />
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <AutoTranslatedText text={`Published: ${formatDate(article.publishedAt)}`} />
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <AutoTranslatedText text={article.description} />
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {article.tags && article.tags.map((tag, idx) => (
                          <Chip 
                            key={idx} 
                            label={tag} 
                            size="small" 
                            onClick={() => handleTagClick(tag)}
                            sx={{ mr: 0.5, mb: 0.5 }} 
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button 
                        startIcon={<LinkIcon />}
                        component={Link}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        <AutoTranslatedText text="Read Full Article" />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          !isLoading && searchQuery && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1">
                <AutoTranslatedText text="No results found. Try different keywords or topics." />
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default NewsSearch; 