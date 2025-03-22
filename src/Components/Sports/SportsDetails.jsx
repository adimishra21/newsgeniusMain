import React, { useState, useEffect } from "react";
import { 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert, 
  Button,
  IconButton,
  Paper,
  Chip,
  Divider,
  Avatar
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { getMatchById, getNewsById, getRelatedNews } from '../../utils/sportsAPI';
import './Sports.css';

const SportsDetails = ({ theme }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // Try to fetch as a match first
        let data = await getMatchById(id);
        if (!data) {
          // If not a match, try to fetch as news
          data = await getNewsById(id);
        }
        if (!data) {
          setError('Article not found');
          return;
        }
        setArticle(data);
        setRelatedArticles(await getRelatedNews(id));
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Navigation activePage="sports" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading article...</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Navigation activePage="sports" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
            <Button onClick={() => navigate('/sports')} sx={{ ml: 2 }}>
              Back to Sports
            </Button>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  if (!article) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Navigation activePage="sports" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Alert severity="warning" sx={{ mt: 4 }}>
            Article not found
            <Button onClick={() => navigate('/sports')} sx={{ ml: 2 }}>
              Back to Sports
            </Button>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      {/* Mobile Navigation Header */}
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 1,
          p: 1,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <IconButton onClick={() => navigate('/sports')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Article Details</Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Navigation */}
      {showMobileNav && (
        <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
          <Navigation activePage="sports" theme={theme} />
        </Box>
      )}

      {/* Desktop Navigation */}
      <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Navigation activePage="sports" theme={theme} />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} lg={6} className="w-full relative px-2 sm:px-4 md:px-5">
        <Box sx={{ mt: 4 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/sports')}
            sx={{ mb: 2 }}
          >
            Back to Sports
          </Button>
          
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {article.category} • {article.datePublished || article.matchDate}
            </Typography>
            
            <Box>
              <IconButton onClick={handleLike} size="small">
                {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <IconButton onClick={handleSave} size="small">
                {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
              </IconButton>
              <IconButton size="small" onClick={handleShare}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box 
            component="img" 
            src={article.image}
            alt={article.title}
            sx={{ 
              width: '100%', 
              height: { xs: 200, sm: 300, md: 400 }, 
              objectFit: 'cover',
              borderRadius: 1,
              mb: 3 
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop";
            }}
          />
          
          {article.matchDate && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Match Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Match Date
                  </Typography>
                  <Typography variant="body1">{article.matchDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Match Type
                  </Typography>
                  <Typography variant="body1">{article.type}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body1" paragraph>
            {article.description}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Chip 
              label={article.category} 
              color="primary" 
              sx={{ mr: 1 }} 
            />
          </Box>
        </Box>
      </Grid>
      
      {/* Related Articles */}
      <Grid item xs={12} lg={3} sx={{ 
        mt: { xs: 4, lg: 4 },
        pl: { xs: 2, lg: 2 },
        pr: { xs: 2, lg: 0 }
      }}>
        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Related Articles
          </Typography>
          {relatedArticles.map((related) => (
            <Box
              key={related.id}
              sx={{
                display: 'flex',
                mb: 2,
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/sports/details/${related.id}/sports`)}
            >
              <Box
                component="img"
                src={related.image}
                alt={related.title}
                sx={{
                  width: 100,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mr: 2
                }}
              />
              <Box>
                <Typography variant="subtitle2" noWrap>
                  {related.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {related.datePublished}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SportsDetails; 