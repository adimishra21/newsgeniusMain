import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from 'react-router-dom';
import { getEntertainmentNews } from '../../utils/entertainmentAPI';
import './Entertainment.css';

const Entertainment = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { category, tag } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(category || "all");
  const [searchResults, setSearchResults] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    }
  }, [category]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getEntertainmentNews(currentCategory);
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching entertainment news:", err);
        setError("Failed to load entertainment news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentCategory]);

  const handleCategoryChange = (newCategory) => {
    setCurrentCategory(newCategory);
    if (newCategory !== "all") {
      navigate(`/entertainment/category/${newCategory}`);
    } else {
      navigate("/entertainment");
    }
    setSearchResults(null);
  };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleArticleClick = (articleId) => {
    navigate(`/entertainment/details/${articleId}/entertainment`);
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
        <Box mt={4} mb={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      );
    }

    const displayArticles = searchResults || articles;

    if (displayArticles.length === 0) {
      return (
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          <Alert severity="info">No articles found. Try a different category or search term.</Alert>
        </Box>
      );
    }

    // Display articles in a grid
    return (
      <Box mt={4}>
        <Grid container spacing={3}>
          {displayArticles.map((article) => (
            <Grid item xs={12} md={6} lg={4} key={article.id}>
              <Box
                className="article-card"
                onClick={() => handleArticleClick(article.id)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
                  boxShadow: 3,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: theme === "dark" ? "#2a2a2a" : "#f5f5f5",
                  }}
                >
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      {article.type === "movie" ? (
                        <MovieIcon sx={{ fontSize: 60, opacity: 0.5 }} />
                      ) : (
                        <LiveTvIcon sx={{ fontSize: 60, opacity: 0.5 }} />
                      )}
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "primary.main",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderTopLeftRadius: 4,
                    }}
                  >
                    <Typography variant="caption">
                      {article.category || "Entertainment"}
                    </Typography>
                  </Box>
                </Box>
                <Box p={2}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    noWrap
                    sx={{
                      fontWeight: "bold",
                      color: theme === "dark" ? "#fff" : "#333",
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mb: 2,
                      color: theme === "dark" ? "#cccccc" : "inherit",
                    }}
                  >
                    {article.description}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ color: theme === "dark" ? "#aaaaaa" : "inherit" }}
                    >
                      {article.date}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article.id);
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Grid container className={`px-5 lg:px-36 justify-between ${theme}`}>
      <Grid item xs={12} lg={2.5} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Navigation active="entertainment" theme={theme} />
      </Grid>

      <Grid item xs={12} lg={9.5} sx={{ px: { xs: 0, lg: 5 } }}>
        <Box className="mobile-header" sx={{ display: { lg: 'none' }, mb: 2 }}>
          <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Entertainment</Typography>
          <IconButton onClick={() => navigate('/')}>
            <HomeIcon />
          </IconButton>
        </Box>

        {showMobileNav && (
          <Box sx={{ mb: 2, display: { lg: 'none' } }}>
            <Navigation active="entertainment" theme={theme} mobile />
          </Box>
        )}

        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Entertainment News
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Stay updated with the latest in movies, TV shows, and celebrity news
          </Typography>
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} mb={4}>
          <Box flexGrow={1}>
            <SearchBar onSearch={handleSearch} theme={theme} />
          </Box>
          <CategoryFilter 
            currentCategory={currentCategory} 
            onCategoryChange={handleCategoryChange}
            theme={theme}
          />
        </Box>

        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default Entertainment;
