import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Grid, Card, CardMedia, CardContent, 
  Divider, Chip, Button, Paper, Avatar, CircularProgress, List, ListItem 
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import { 
  getEducationNews, 
  getUniversitiesNews, 
  getSchoolsNews, 
  getJobMarketNews,
  getFeaturedEducationNews
} from '../../utils/educationAPI';

const EducationDetails = ({ theme }) => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id); // Decode the URL-encoded ID
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Function to get education-related image
  const getEducationImage = (category) => {
    const images = {
      'education': '/images/education/education.jpg',
      'higher': '/images/education/higher.jpg',
      'school': '/images/education/school.jpg',
      'jobs': '/images/education/jobs.jpg'
    };
    return images[category] || '/images/education/default.jpg';
  };

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true);
      try {
        // Fetch all education news categories
        const [educationData, universitiesData, schoolsData, jobsData] = await Promise.all([
          getEducationNews(),
          getUniversitiesNews(),
          getSchoolsNews(),
          getJobMarketNews()
        ]);
        
        // Combine all news for searching
        const allNews = [...educationData, ...universitiesData, ...schoolsData, ...jobsData];

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
        onClick={() => navigate('/education')}
        sx={{ mb: 3 }}
        variant="contained"
      >
        Back to Education News
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
            label={article.author || 'Education Reporter'} 
            variant="outlined" 
            size="small" 
          />
          <Chip 
            icon={article.category === 'school' ? <MenuBookIcon /> : <SchoolIcon />}
            label={article.category} 
            color="primary" 
            size="small" 
          />
        </Box>
        
        <CardMedia
          component="img"
          height="400"
          image={article.image || getEducationImage(article.category)}
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
          This educational development represents a significant step forward in advancing learning outcomes and addressing key challenges faced by students and educators across the country.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Educational experts have emphasized the importance of this initiative in creating more equitable access to quality education resources, potentially bridging gaps that have persisted in the current system.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Implementation is expected to begin in the coming academic year, with a phased approach that allows institutions to adapt their curricula and training programs accordingly.
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
                onClick={() => navigate(`/education/details/${encodeURIComponent(related.id)}/education`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={related.image || getEducationImage(related.category)}
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

export default EducationDetails; 