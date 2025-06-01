import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, Button, Link } from '@mui/material';
import { getPasswordResetLinks } from '../../utils/consoleCapture';

/**
 * Debug component to display password reset links captured from console
 * This component is only for development use
 */
const ResetLinkDebug = () => {
  const [resetLinks, setResetLinks] = useState([]);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Update links on mount and periodically
    const updateLinks = () => {
      const links = getPasswordResetLinks();
      setResetLinks(links);
    };

    // Initial update
    updateLinks();
    
    // Set up periodic updating
    const interval = setInterval(updateLinks, 2000);
    
    // Clean up
    return () => clearInterval(interval);
  }, []);

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Don't render if no links available and not explicitly showing
  if (resetLinks.length === 0 && !showDebug) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        bottom: 20, 
        right: 20, 
        zIndex: 9999,
        maxWidth: '400px',
        transition: 'all 0.3s ease'
      }}
    >
      {showDebug ? (
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Password Reset Debug</Typography>
            <Button 
              size="small" 
              variant="outlined" 
              color="primary"
              onClick={() => setShowDebug(false)}
            >
              Hide
            </Button>
          </Box>
          
          {resetLinks.length > 0 ? (
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Recent reset links (most recent at top):
              </Typography>
              <List>
                {resetLinks.slice().reverse().map((link, index) => (
                  <ListItem key={index} sx={{ display: 'block', wordBreak: 'break-all' }}>
                    <Link 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography variant="body2">
              No password reset links captured yet. Try requesting a password reset.
            </Typography>
          )}
          
          <Typography variant="caption" color="text.secondary">
            Note: This debug panel only appears in development mode.
          </Typography>
        </Paper>
      ) : (
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => setShowDebug(true)}
          sx={{ opacity: 0.8 }}
        >
          Show Reset Links {resetLinks.length > 0 && `(${resetLinks.length})`}
        </Button>
      )}
    </Box>
  );
};

export default ResetLinkDebug; 