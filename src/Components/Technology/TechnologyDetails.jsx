import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Grid, Card, CardMedia, CardContent, 
  Divider, Chip, Button, Paper, Avatar, CircularProgress, List, ListItem 
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeIcon from '@mui/icons-material/Code';
import DevicesIcon from '@mui/icons-material/Devices';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import { 
  getTechNews, 
  getAiNews, 
  getGadgetsNews, 
  getStartupsNews,
  getFeaturedTechNews
} from '../../utils/technologyAPI';

const TechnologyDetails = ({ theme }) => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id); // Decode the URL-encoded ID
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Function to get technology-related image
  const getTechImage = (category) => {
    const images = {
      'tech': '/images/technology/tech.jpg',
      'ai': '/images/technology/ai.jpg',
      'gadgets': '/images/technology/gadgets.jpg',
      'startups': '/images/technology/startups.jpg'
    };
    return images[category] || '/images/technology/default.jpg';
  };

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);
      try {
        // Fetch all tech news categories
        const [techData, aiData, gadgetsData, startupsData] = await Promise.all([
          getTechNews(),
          getAiNews(),
          getGadgetsNews(),
          getStartupsNews()
        ]);
        
        // Combine all news for searching
        const allNews = [...techData, ...aiData, ...gadgetsData, ...startupsData];

        console.log('Searching for article with ID:', decodedId);
        console.log('Available IDs:', allNews.map(item => item.id));
        
        // Find the specific article by ID (decoded URL)
        const foundArticle = allNews.find(item => item.id === decodedId);
        
        if (foundArticle) {
          console.log('Found article:', foundArticle);
          setArticle(foundArticle);
          
          // Get related articles (similar category)
          const related = allNews
            .filter(item => item.id !== decodedId && item.category === foundArticle.category)
            .slice(0, 3);
          
          setRelatedArticles(related);
        } else {
          console.error('Article not found with ID:', decodedId);
          setError('Article not found');
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h5" color="error">{error || 'Article not found'}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/technology')}
        sx={{ mb: 3 }}
        variant="contained"
      >
        Back to Technology News
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
            label={article.author || 'Tech Reporter'} 
            variant="outlined" 
            size="small" 
          />
          <Chip 
            icon={article.category === 'gadgets' ? <DevicesIcon /> : <CodeIcon />}
            label={article.category} 
            color="primary" 
            size="small" 
          />
        </Box>
        
        <CardMedia
          component="img"
          height="400"
          image={article.image || getTechImage(article.category)}
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
          This technological advancement represents a significant milestone in the industry, potentially transforming how we interact with digital systems and expanding capabilities across multiple sectors.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Experts in the field have highlighted the innovative approach taken by the development team, noting that this could establish new standards for performance, efficiency, and user experience in future applications.
        </Typography>
        
        <Typography variant="body1" paragraph>
          While initial adoption may face challenges related to integration with existing systems, the long-term benefits could substantially outweigh these temporary obstacles, according to industry analysts.
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
                onClick={() => navigate(`/technology/details/${encodeURIComponent(related.id)}/technology`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={related.image || getTechImage(related.category)}
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

export default TechnologyDetails; 