import React, { useState, useEffect } from 'react';
import { 
  getEducationNews, 
  getUniversitiesNews, 
  getSchoolsNews, 
  getJobMarketNews 
} from '../utils/educationAPI';
import { Box, Tabs, Tab, Typography, Container, Grid, Card, CardMedia, CardContent, CardActionArea, Chip, Divider } from '@mui/material';
import { format } from 'date-fns';
import LoadingSpinner from './LoadingSpinner';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`education-tabpanel-${index}`}
      aria-labelledby={`education-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `education-tab-${index}`,
    'aria-controls': `education-tabpanel-${index}`,
  };
}

const NewsCard = ({ article }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={article.image}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Chip 
              label={article.category} 
              size="small" 
              color="primary" 
              sx={{ textTransform: 'capitalize' }} 
            />
            <Typography variant="caption" color="text.secondary">
              {article.date}
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default function EducationalPanel() {
  const [value, setValue] = useState(0);
  const [educationNews, setEducationNews] = useState([]);
  const [universitiesNews, setUniversitiesNews] = useState([]);
  const [schoolsNews, setSchoolsNews] = useState([]);
  const [jobMarketNews, setJobMarketNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data for all tabs at once to make switching tabs faster
        const [education, universities, schools, jobs] = await Promise.all([
          getEducationNews(),
          getUniversitiesNews(),
          getSchoolsNews(),
          getJobMarketNews()
        ]);
        
        setEducationNews(education);
        setUniversitiesNews(universities);
        setSchoolsNews(schools);
        setJobMarketNews(jobs);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch educational news:', err);
        setError('Failed to load educational news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography color="error" variant="h6">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Education News
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="educational news tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          <Tab label="General Education" {...a11yProps(0)} />
          <Tab label="Universities" {...a11yProps(1)} />
          <Tab label="Schools" {...a11yProps(2)} />
          <Tab label="Job Market" {...a11yProps(3)} />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {educationNews.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {universitiesNews.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <Grid container spacing={3}>
          {schoolsNews.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      
      <TabPanel value={value} index={3}>
        <Grid container spacing={3}>
          {jobMarketNews.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
} 