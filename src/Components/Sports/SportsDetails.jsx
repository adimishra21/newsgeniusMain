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
  Avatar,
  Container,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { 
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  ThumbDown as ThumbDownIcon,
  ThumbDownOutlined as ThumbDownOutlinedIcon,
  Comment as CommentIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import './Sports.css';
import { styled } from '@mui/material/styles';
import { ArrowBack as ArrowBackIconMUI } from '@mui/icons-material';

// Since we're missing some dependencies, let's create mock data inline
const sportsMockData = [
  {
    id: 1,
    title: "India Defeats Australia in Thrilling Cricket Match",
    content: "In a nail-biting finish, India defeated Australia by 3 wickets in the final over of the match. Virat Kohli scored a magnificent century, leading India to victory with his unbeaten 112 runs off 98 balls. The match, played at the iconic MCG, saw several momentum shifts with Australia initially dominating with the ball before India's middle order stabilized the innings.",
    category: "cricket",
    author: "Rahul Sharma",
    date: "May 30, 2023",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageCredit: "Unsplash/Sports Gallery"
  },
  {
    id: 2,
    title: "Manchester United Signs New Striker for Record Fee",
    content: "Manchester United has announced the signing of a new striker for a club record fee of £85 million. The 23-year-old forward has been in tremendous form, scoring 34 goals in all competitions last season. The transfer marks one of the biggest moves in football this year and significantly strengthens United's attacking options for the upcoming season.",
    category: "football",
    author: "James Wilson",
    date: "June 2, 2023",
    image: "https://images.unsplash.com/photo-1508098682722-e99c643a7635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageCredit: "Unsplash/Football Images"
  },
  {
    id: 3,
    title: "Nadal Wins Record-Breaking 15th French Open Title",
    content: "Rafael Nadal has extended his dominance on clay by winning his 15th French Open title, defeating his long-time rival in straight sets. The Spanish tennis legend continues to defy age and injuries, showing remarkable form throughout the tournament. This victory further cements his legacy as the greatest clay-court player in the history of tennis.",
    category: "tennis",
    author: "Maria Rodriguez",
    date: "June 10, 2023",
    image: "https://images.unsplash.com/photo-1618355776464-8666794d2520?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageCredit: "Unsplash/Tennis Photography"
  },
  {
    id: 4,
    title: "Canada Surprises with Gold Medal in Hockey World Championship",
    content: "In an unexpected turn of events, Canada has won the gold medal at the Hockey World Championship, defeating defending champions Finland in a thrilling final. The Canadian team, comprised mostly of young NHL talents, showed exceptional teamwork and resilience throughout the tournament, especially in the final where they came back from a two-goal deficit.",
    category: "hockey",
    author: "Michael Thompson",
    date: "May 28, 2023",
    image: "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    imageCredit: "Unsplash/Hockey Elite"
  }
];

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Box p={4}><Typography color="error">Something went wrong.</Typography></Box>;
    }
    return this.props.children;
  }
}

// Simple footer component
const Footer = () => (
  <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.paper', mt: 'auto' }}>
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} NewsGenius. All rights reserved.
    </Typography>
  </Box>
);

const SportsDetails = ({ theme }) => {
  const navigate = useNavigate();
  const { id, category } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        // Check if the ID is a number or a URL
        const isExternalUrl = id && (id.startsWith('http') || id.includes('://'));
        
        if (isExternalUrl) {
          setError("Invalid article ID. Please use a valid numeric ID.");
          setLoading(false);
          return;
        }
        
        // In a real app, fetch from API using the id
        // For now, use mock data
        setTimeout(() => {
          // Ensure ID is parsed as a number
          const parsedId = parseInt(id);
          
          // Check if ID is a valid number
          if (isNaN(parsedId)) {
            setError("Invalid article ID. Please use a valid numeric ID.");
            setLoading(false);
            return;
          }
          
          const foundArticle = sportsMockData.find(article => article.id === parsedId);
          
          if (foundArticle) {
            setArticle(foundArticle);
            
            // Get related articles (excluding current article)
            const related = sportsMockData
              .filter(item => item.id !== parsedId)
              .slice(0, 3);
            
            setRelatedArticles(related);
          } else {
            setError("Article not found. Please check the article ID.");
          }
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch article. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // In a real app, save to user's bookmarks
  };

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes(likes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes(dislikes - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserReaction('dislike');
    }
  };

  const handleShare = () => {
    // In a real app, open share dialog
    alert("Share functionality would open here");
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Try accessing a valid article with a numeric ID, for example:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {sportsMockData.map(article => (
            <Button 
              key={article.id}
              variant="outlined" 
              onClick={() => navigate(`/sports/details/${article.id}/sports`)}
            >
              {article.title}
            </Button>
          ))}
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/sports')}
          sx={{ mt: 3 }}
        >
          Back to Sports
        </Button>
      </Box>
    );
  }

  if (!article) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Article not found</Typography>
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          <Button 
            startIcon={<ArrowBackIconMUI />} 
            onClick={() => navigate('/sports')}
            sx={{ mb: 3 }}
          >
            Back to Sports
          </Button>

          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {article.title}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={article.category || "Sports"} color="primary" size="small" />
              <Typography variant="body2" color="text.secondary">
                {article.date || "May 25, 2023"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By {article.author || "Sports Reporter"}
              </Typography>
            </Box>

            {article.image && (
              <Box sx={{ position: 'relative', mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{ width: '100%', maxHeight: 500, objectFit: 'cover' }}
                />
                {article.imageCredit && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      p: 0.5,
                    }}
                  >
                    Credit: {article.imageCredit}
                  </Typography>
                )}
              </Box>
            )}

            <Typography variant="body1" paragraph>
              {article.content || "No content available for this article."}
            </Typography>

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={handleLike} color={userReaction === 'like' ? 'primary' : 'default'}>
                  {userReaction === 'like' ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <Typography>{likes}</Typography>
                
                <IconButton onClick={handleDislike} color={userReaction === 'dislike' ? 'error' : 'default'}>
                  {userReaction === 'dislike' ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                </IconButton>
                <Typography>{dislikes}</Typography>
                
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </Box>
              
              <Box>
                <IconButton onClick={handleBookmark}>
                  {bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton onClick={handleShare}>
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>

          {relatedArticles.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
                Related Articles
              </Typography>
              <Grid container spacing={3}>
                {relatedArticles.map((relatedArticle) => (
                  <Grid item xs={12} sm={6} md={4} key={relatedArticle.id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        },
                      }}
                      onClick={() => {
                        navigate(`/sports/details/${relatedArticle.id}/sports`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={relatedArticle.image}
                        alt={relatedArticle.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom noWrap>
                          {relatedArticle.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}>
                          {relatedArticle.summary || relatedArticle.content?.substring(0, 100) + '...' || "No content available."}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Container>
        <Footer />
      </Box>
    </ErrorBoundary>
  );
};

export default SportsDetails; 