import React, { useContext, useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Paper,
  Collapse,
  IconButton,
  Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TranslateIcon from '@mui/icons-material/Translate';
import { LanguageContext } from '../../utils/contexts';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../utils/translationUtils';

const MAX_RECENT_LANGUAGES = 3;

const RecentTranslations = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [recentLanguages, setRecentLanguages] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  // Load recent languages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentLanguages');
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentLanguages(Array.isArray(parsed) ? parsed : []);
      }
    } catch (err) {
      console.error('Error loading recent languages:', err);
      setRecentLanguages([]);
    }
  }, []);
  
  // Update recent languages when language changes
  useEffect(() => {
    if (language === DEFAULT_LANGUAGE) return;
    
    // Add current language to the front of the list, remove duplicates
    const updated = [language, ...recentLanguages.filter(lang => lang !== language)]
      .slice(0, MAX_RECENT_LANGUAGES);
    
    setRecentLanguages(updated);
    
    // Save to localStorage
    try {
      localStorage.setItem('recentLanguages', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving recent languages:', err);
    }
  }, [language]);
  
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
  };
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Don't show if no recent languages or only using default
  if (recentLanguages.length === 0 || (recentLanguages.length === 1 && recentLanguages[0] === DEFAULT_LANGUAGE)) {
    return null;
  }
  
  return (
    <Paper
      elevation={2}
      sx={{
        position: 'fixed',
        top: 80,
        right: 20,
        zIndex: 1000,
        p: 1,
        borderRadius: 2,
        width: 'auto',
        maxWidth: 300,
        opacity: expanded ? 1 : 0.7,
        '&:hover': {
          opacity: 1
        }
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={expanded ? 1 : 0}>
        <Box display="flex" alignItems="center">
          <TranslateIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2" fontWeight="medium">
            Recent Languages
          </Typography>
        </Box>
        <Tooltip title={expanded ? "Hide languages" : "Show languages"}>
          <IconButton size="small" onClick={toggleExpanded}>
            {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      
      <Collapse in={expanded}>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {/* Always show English/Default */}
          <Chip
            label="English"
            size="small"
            color={language === DEFAULT_LANGUAGE ? "primary" : "default"}
            onClick={() => handleLanguageSelect(DEFAULT_LANGUAGE)}
            variant={language === DEFAULT_LANGUAGE ? "filled" : "outlined"}
          />
          
          {/* Show recent languages */}
          {recentLanguages
            .filter(lang => lang !== DEFAULT_LANGUAGE)
            .map(lang => {
              const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || lang;
              return (
                <Chip
                  key={lang}
                  label={langName}
                  size="small"
                  color={language === lang ? "primary" : "default"}
                  onClick={() => handleLanguageSelect(lang)}
                  variant={language === lang ? "filled" : "outlined"}
                />
              );
            })
          }
        </Box>
      </Collapse>
    </Paper>
  );
};

export default RecentTranslations; 