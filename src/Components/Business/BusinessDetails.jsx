import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Grid, Card, CardMedia, CardContent, 
  Divider, Chip, Button, Paper, Avatar, CircularProgress, List, ListItem 
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import axios from 'axios';
import { getBusinessNews, getFeaturedBusinessNews, getStockMarket, getCryptocurrency, getPersonalFinance } from '../../utils/businessAPI';

const BusinessDetails = ({ theme }) => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id); // Decode the URL-encoded ID
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Function to get business-related image
  const getBusinessImage = (category) => {
    const images = {
      'business': '/images/business/news.jpg',
      'stocks': '/images/business/stocks.jpg',
      'crypto': '/images/business/crypto.jpg',
      'finance': '/images/business/finance.jpg'
    };
    return images[category] || '/images/business/default.jpg';
  };

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);
      try {
        // Check if the ID is a URL (which is expected from the real API)
        const isUrl = decodedId.startsWith('http') || decodedId.includes('://');
        
        if (isUrl) {
          console.log('ID is a URL:', decodedId);
          setError('This appears to be a URL. For this demo version, please use one of the sample article IDs instead.');
          setLoading(false);
          return;
        }
        
        // If it's not a URL, try to parse it as a number for our mock data
        const numericId = parseInt(decodedId);
        if (!isNaN(numericId)) {
          console.log('Using numeric ID:', numericId);
          
          // Fetch all business news from different categories
          const [businessNews, stockMarketNews, cryptoNews, financeNews] = await Promise.all([
            getBusinessNews(),
            getStockMarket(),
            getCryptocurrency(),
            getPersonalFinance()
          ]);
          
          // Combine all news for searching
          const allNews = [...businessNews, ...stockMarketNews, ...cryptoNews, ...financeNews];

          console.log('Available IDs:', allNews.map(item => item.id));
          
          // Find the specific article by numeric ID
          const foundArticle = allNews.find(item => {
            // Try both exact match and numeric comparison
            return item.id === numericId || (typeof item.id === 'number' && item.id === numericId);
          });
          
          if (foundArticle) {
            console.log('Found article:', foundArticle);
            setArticle(foundArticle);
            
            // Get related articles (same category but different ID)
            const related = allNews
              .filter(item => item.id !== foundArticle.id && item.category === foundArticle.category)
              .slice(0, 3);
            
            setRelatedArticles(related);
          } else {
            console.error('Article not found with ID:', numericId);
            setError(`Article with ID ${numericId} not found`);
          }
        } else {
          console.error('Invalid article ID (not numeric):', decodedId);
          setError('Invalid article ID format. Please use a numeric ID for mock data.');
        }
      } catch (error) {
        console.error('Error fetching article data:', error);
        setError('Failed to fetch article data');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [decodedId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || 'Article not found'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', maxWidth: '600px' }}>
          We couldn't find the requested article. This might be because:
          <br/>1. The article ID format is incorrect
          <br/>2. The article has been removed
          <br/>3. There's a mismatch between the live API data and our mock data
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/business')}
          sx={{ mb: 2 }}
        >
          Back to Business Section
        </Button>
        
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          You can try one of these sample articles instead:
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: '600px' }}>
          {/* Display mock articles as alternatives */}
          <Card 
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
              },
              mb: 2
            }}
            onClick={() => navigate('/business/details/1/business')}
          >
            <Box sx={{ display: 'flex', p: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                image="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1000&auto=format&fit=crop"
                alt="Indian Economy"
              />
              <CardContent>
                <Typography variant="h6">Indian Economy Shows Strong Growth in Q1</Typography>
                <Typography variant="body2" color="text.secondary">
                  The Indian economy exhibited robust performance in the first quarter with a 7.8% GDP growth rate, surpassing analyst expectations.
                </Typography>
              </CardContent>
            </Box>
          </Card>
          
          <Card 
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
              },
              mb: 2
            }}
            onClick={() => navigate('/business/details/4/business')}
          >
            <Box sx={{ display: 'flex', p: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop"
                alt="Sensex"
              />
              <CardContent>
                <Typography variant="h6">Sensex Crosses 80,000 Mark for First Time</Typography>
                <Typography variant="body2" color="text.secondary">
                  Indian stock markets reached a historic milestone as the Sensex crossed 80,000 points, driven by strong foreign institutional investment.
                </Typography>
              </CardContent>
            </Box>
          </Card>
          
          <Card 
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
              }
            }}
            onClick={() => navigate('/business/details/7/business')}
          >
            <Box sx={{ display: 'flex', p: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                image="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop"
                alt="Bitcoin"
              />
              <CardContent>
                <Typography variant="h6">Bitcoin Surges Past $75,000 Amid Institutional Adoption</Typography>
                <Typography variant="body2" color="text.secondary">
                  The world's largest cryptocurrency continues its upward trajectory as more institutional investors add Bitcoin to their portfolios.
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/business')}
        sx={{ mb: 3 }}
        variant="contained"
      >
        Back to Business News
      </Button>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {article.title}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Chip 
            icon={<CalendarTodayIcon />} 
            label={article.date} 
            variant="outlined" 
            size="small" 
          />
          <Chip 
            icon={<PersonIcon />} 
            label={article.author || 'Staff Reporter'} 
            variant="outlined" 
            size="small" 
          />
          <Chip 
            label={article.category} 
            color="primary" 
            size="small" 
          />
        </Box>
        
        <CardMedia
          component="img"
          height="400"
          image={article.image || getBusinessImage(article.category)}
          alt={article.title}
          sx={{ borderRadius: 2, mb: 3, objectFit: 'cover' }}
        />
        
        <Typography variant="body1" paragraph>
          {article.description}
        </Typography>
        
        {article.content && (
          <Typography variant="body1" paragraph>
            {article.content}
          </Typography>
        )}
        
        {/* Placeholder content since we don't have actual full article content */}
        <Typography variant="body1" paragraph>
          The business landscape continues to evolve at an unprecedented pace, with this development marking a significant shift in how companies approach their strategic planning and market positioning.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Industry analysts have noted that this represents a continuation of trends observed in recent quarters, where adaptability and innovation have become critical factors for business success in an increasingly competitive global marketplace.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Market reactions to this news have been mixed, with some investors expressing optimism about long-term growth prospects while others remain cautious about potential regulatory challenges and market volatility.
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" gutterBottom>
          Related Articles
        </Typography>
        
        <Grid container spacing={3}>
          {relatedArticles.map((related) => (
            <Grid item xs={12} sm={6} md={4} key={related.id}>
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
                onClick={() => navigate(`/business/details/${encodeURIComponent(related.id)}/business`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={related.image || getBusinessImage(related.category)}
                  alt={related.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {related.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {related.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default BusinessDetails; 