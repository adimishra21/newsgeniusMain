import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import TopStories from './TopStories';
import TrendingNews from './TrendingNews';
import TopReels from './TopReels';

const Explore = ({ theme, toggleTheme }) => {
  return (
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      <Grid item xs={12} lg={9} className="px-5 lg:px-9 hidden lg:block w-full relative">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Explore Page
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TopStories />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 4,
              mt: 4
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Trending News
              </Typography>
              <TrendingNews />
              <TopReels />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Explore;
