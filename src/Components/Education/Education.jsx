import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import RightPart from '../RightPart/RightPart';
import Ticker from '../Ticker/Ticker';
import axios from 'axios';

const Education = ({ theme, toggleTheme }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [educationNews, setEducationNews] = useState([]);
  const [higherEducation, setHigherEducation] = useState([]);
  const [schoolEducation, setSchoolEducation] = useState([]);
  const [entranceExams, setEntranceExams] = useState([]);
  const [error, setError] = useState(null);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { label: 'Education News', value: 'education' },
    { label: 'Higher Education', value: 'higher' },
    { label: 'School Education', value: 'school' },
    { label: 'Entrance Exams', value: 'exams' }
  ];

  // Function to get education-related image
  const getEducationImage = (category) => {
    const images = {
      'education': '/images/education/education.jpg',
      'higher': '/images/education/higher.jpg',
      'school': '/images/education/school.jpg',
      'exams': '/images/education/exams.jpg'
    };
    return images[category] || '/images/education/default.jpg';
  };

  // Function to fetch education news
  const fetchEducationNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=education+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'education',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getEducationImage('education')
      }));
      setEducationNews(news);
    } catch (error) {
      console.error('Error fetching education news:', error);
      setError('Failed to fetch education news');
    }
  };

  // Function to fetch higher education news
  const fetchHigherEducationNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=higher+education+universities+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'higher',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getEducationImage('higher')
      }));
      setHigherEducation(news);
    } catch (error) {
      console.error('Error fetching higher education news:', error);
      setError('Failed to fetch higher education news');
    }
  };

  // Function to fetch school education news
  const fetchSchoolEducationNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=school+education+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'school',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getEducationImage('school')
      }));
      setSchoolEducation(news);
    } catch (error) {
      console.error('Error fetching school education news:', error);
      setError('Failed to fetch school education news');
    }
  };

  // Function to fetch entrance exams news
  const fetchEntranceExamsNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=entrance+exams+jee+neet+india&sortBy=publishedAt&language=en&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const news = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        category: 'exams',
        date: new Date(item.publishedAt).toLocaleDateString(),
        image: item.urlToImage || getEducationImage('exams')
      }));
      setEntranceExams(news);
    } catch (error) {
      console.error('Error fetching entrance exams news:', error);
      setError('Failed to fetch entrance exams news');
    }
  };

  // Function to fetch featured education news
  const fetchFeaturedNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=education+india&sortBy=publishedAt&language=en&pageSize=5&apiKey=9e76e457ea734bd79ae1f3b784796948`);
      const featured = response.data.articles.map(item => ({
        id: item.url,
        title: item.title,
        description: item.description,
        image: item.urlToImage || getEducationImage('education')
      }));
      setFeaturedNews(featured);
    } catch (error) {
      console.error('Error fetching featured news:', error);
    }
  };

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchEducationNews(),
          fetchHigherEducationNews(),
          fetchSchoolEducationNews(),
          fetchEntranceExamsNews(),
          fetchFeaturedNews()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (featuredNews.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredNews.length]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Render featured news slideshow
  const renderSlideshow = () => {
    if (!featuredNews.length) return null;

    return (
      <Box sx={{ mb: 4, position: 'relative' }}>
        <Card 
          sx={{ 
            height: '400px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          <CardMedia
            component="img"
            height="400"
            image={featuredNews[currentSlide]?.image}
            alt={featuredNews[currentSlide]?.title}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              p: 3
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {featuredNews[currentSlide]?.title}
            </Typography>
            <Typography variant="body1">
              {featuredNews[currentSlide]?.description}
            </Typography>
          </Box>
        </Card>
        <Box sx={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
          {featuredNews.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Box>
      </Box>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    switch (selectedTab) {
      case 0:
        return (
          <Box sx={{ mb: 4 }}>
            {renderSlideshow()}
            <Typography variant="h5" gutterBottom>
              Latest Education News
            </Typography>
            {educationNews.map((news) => (
              <Card 
                key={news.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {news.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {news.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Higher Education News
            </Typography>
            {higherEducation.map((news) => (
              <Card 
                key={news.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {news.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {news.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              School Education News
            </Typography>
            {schoolEducation.map((news) => (
              <Card 
                key={news.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {news.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {news.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Entrance Exams News
            </Typography>
            {entranceExams.map((news) => (
              <Card 
                key={news.id} 
                sx={{ 
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 3
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={news.image}
                  alt={news.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {news.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {news.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {news.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={6} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <div className="education-content">
          <Ticker category="education" />
          <Typography variant="h4" component="h1" gutterBottom>
            Education News
          </Typography>

          {/* Categories */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange} 
              variant="scrollable" 
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }
              }}
            >
              {categories.map((category, index) => (
                <Tab 
                  key={category.value} 
                  label={category.label} 
                  id={`education-tab-${index}`}
                />
              ))}
            </Tabs>
          </Box>

          {/* Content based on selected tab */}
          {renderContent()}
        </div>
      </Grid>

      <Grid item xs={0} lg={3} className="hidden lg:block w-full relative">
        <RightPart theme={theme} toggleTheme={toggleTheme} />
      </Grid>
    </Grid>
  );
};

export default Education; 