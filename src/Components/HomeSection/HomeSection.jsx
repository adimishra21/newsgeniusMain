import { Avatar, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState, useEffect, useContext } from 'react'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import PostCard from './PostCard';
import { articleAPI } from '../../config/api.config';
import Carousel from '../Carousel/Carousel';
import axios from 'axios';
import ArticleCreation from './ArticleCreation';
import AutoTranslatedText from '../Common/AutoTranslatedText';
import { Box, Typography, Chip } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { LanguageContext } from '../../utils/contexts';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../utils/translationUtils';

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Text is required")
});

const HomeSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headlines, setHeadlines] = useState([]);
  const { language } = useContext(LanguageContext);

  // Fetch news headlines
  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=33b913e452b944178aeade1fdbbe1498'
        );
        setHeadlines(response.data.articles.map((article) => article.title));
      } catch (err) {
        console.error('Error fetching headlines:', err);
      }
    };

    fetchHeadlines();
  }, []);

  // Fetch all articles (from localStorage in this implementation)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch articles from localStorage instead of API for demo
        let storedArticles = [];
        try {
          const articlesData = localStorage.getItem('articles');
          if (articlesData) {
            storedArticles = JSON.parse(articlesData);
          }
        } catch (err) {
          console.error('Error parsing stored articles:', err);
        }
        
        setArticles(storedArticles);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to fetch articles');
        setArticles([]);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Handle article creation
  const handleArticleCreated = (newArticle) => {
    setArticles([newArticle, ...articles]);
  };

  // Get the current language name
  const currentLanguageName = SUPPORTED_LANGUAGES.find(
    lang => lang.code === language
  )?.name || 'English';

  return (
    <div className="space-y-5">
      <section>
        <Box display="flex" alignItems="center" justifyContent="space-between" py={2}>
          <AutoTranslatedText 
            text="Home" 
            component="h1" 
            typographyProps={{ 
              className: "text-xl font-bold opacity-90",
              fontWeight: "bold"
            }} 
          />
          
          {language !== DEFAULT_LANGUAGE && (
            <Chip
              icon={<TranslateIcon fontSize="small" />}
              label={`Viewing in ${currentLanguageName}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
        
        {/* Scrolling headlines */}
        <div
          style={{
            backgroundColor: 'darkred',
            color: 'gold',
            padding: '5px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginBottom: '20px',
            fontSize: '20px',
          }}
        >
          <marquee behavior="scroll" direction="left">
            {headlines.length > 0
              ? headlines.map((headline, index) => (
                  <React.Fragment key={index}>
                    <span key={index}>
                      {language === DEFAULT_LANGUAGE ? 
                        headline : 
                        <AutoTranslatedText text={headline} component="span" showLoader={false} />
                      }
                    </span>
                    {index < headlines.length - 1 && ' | '}
                  </React.Fragment>
                ))
              : <AutoTranslatedText text="Loading headlines..." component="span" />}
          </marquee>
        </div>
      </section>

      <Carousel />

      {/* Article Creation Component */}
      <ArticleCreation onArticleCreated={handleArticleCreated} />

      {loading ? (
        <div className="text-center py-4">
          <AutoTranslatedText text="Loading articles..." />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          <AutoTranslatedText text={error} />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-4">
          <AutoTranslatedText text="No articles found" />
        </div>
      ) : (
        <div className="space-y-5">
          {articles.map((article) => (
            <PostCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeSection;
