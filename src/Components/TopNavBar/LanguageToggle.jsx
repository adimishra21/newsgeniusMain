import React, { useContext, useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Divider,
  Tooltip
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckIcon from '@mui/icons-material/Check';
import { LanguageContext } from '../../utils/contexts';
import { SUPPORTED_LANGUAGES } from '../../utils/translationUtils';

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLanguageSelect = (languageCode) => {
    setLanguage(languageCode);
    handleClose();
  };
  
  // Get current language name for tooltip
  const currentLanguageName = SUPPORTED_LANGUAGES.find(lang => lang.code === language)?.name || 'English';
  
  return (
    <>
      <Tooltip title={`Language: ${currentLanguageName}`}>
        <IconButton 
          onClick={handleClick}
          color="inherit"
          size="large"
          sx={{ 
            bgcolor: 'background.paper', 
            boxShadow: 1,
            '&:hover': { 
              bgcolor: 'background.default' 
            }
          }}
          aria-label="change language"
        >
          <TranslateIcon />
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
          Change Language
        </Typography>
        <Divider />
        {SUPPORTED_LANGUAGES.map((lang) => (
          <MenuItem 
            key={lang.code} 
            onClick={() => handleLanguageSelect(lang.code)}
            selected={lang.code === language}
          >
            <ListItemText primary={lang.name} />
            {lang.code === language && (
              <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                <CheckIcon fontSize="small" />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageToggle; 