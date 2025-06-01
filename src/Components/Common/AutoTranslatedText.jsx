import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { LanguageContext } from '../../utils/contexts';
import { translateText, DEFAULT_LANGUAGE } from '../../utils/translationUtils';
import TranslateIcon from '@mui/icons-material/Translate';

/**
 * AutoTranslatedText component automatically translates text based on the app's language context
 * 
 * @param {Object} props
 * @param {string} props.text - The original text to be translated
 * @param {string} props.component - The MUI component to render the text in (e.g., 'h1', 'body1')
 * @param {Object} props.typographyProps - Additional props to pass to the Typography component
 * @param {boolean} props.showIndicator - Whether to show a translation indicator icon
 * @param {boolean} props.showLoader - Whether to show a loading indicator during translation
 */
const AutoTranslatedText = ({
  text,
  component = 'body1',
  typographyProps = {},
  showIndicator = false,
  showLoader = true
}) => {
  const { language } = useContext(LanguageContext);
  const [translatedText, setTranslatedText] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset to original text when the input text changes
    setTranslatedText(text);
  }, [text]);
  
  useEffect(() => {
    const performTranslation = async () => {
      // Don't translate if the content is empty or language is the default
      if (!text || language === DEFAULT_LANGUAGE) {
        setTranslatedText(text);
        return;
      }
      
      try {
        setIsTranslating(true);
        setError(null);
        
        const translated = await translateText(text, language);
        setTranslatedText(translated);
      } catch (err) {
        console.error('Translation error:', err);
        setError(err.message);
        // Fall back to original text on error
        setTranslatedText(text);
      } finally {
        setIsTranslating(false);
      }
    };
    
    performTranslation();
  }, [text, language]);
  
  if (isTranslating && showLoader) {
    return (
      <Box display="flex" alignItems="center">
        <CircularProgress size={16} sx={{ mr: 1 }} />
        <Typography variant={component} {...typographyProps}>
          {text}
        </Typography>
      </Box>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <Typography variant={component} {...typographyProps} color="error">
        {text} (Translation error)
      </Typography>
    );
  }
  
  // Show translated text with optional indicator
  return (
    <Box display="flex" alignItems="center">
      <Typography variant={component} {...typographyProps}>
        {translatedText}
      </Typography>
      
      {showIndicator && language !== DEFAULT_LANGUAGE && (
        <TranslateIcon 
          fontSize="small" 
          color="action" 
          sx={{ ml: 0.5, opacity: 0.6, fontSize: '0.8rem' }} 
        />
      )}
    </Box>
  );
};

export default AutoTranslatedText; 