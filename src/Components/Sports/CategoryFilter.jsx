import React from 'react';
import { Box, Chip, Stack } from '@mui/material';

const categories = [
  { id: 'all', label: 'All Sports' },
  { id: 'cricket', label: 'Cricket' },
  { id: 'football', label: 'Football' },
  { id: 'hockey', label: 'Hockey' },
  { id: 'tennis', label: 'Tennis' },
  { id: 'olympics', label: 'Olympics' }
];

const CategoryFilter = ({ currentCategory, onCategoryChange }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            onClick={() => onCategoryChange(category.id)}
            color={currentCategory === category.id ? 'primary' : 'default'}
            variant={currentCategory === category.id ? 'filled' : 'outlined'}
            sx={{
              '&:hover': {
                backgroundColor: currentCategory === category.id ? 'primary.main' : 'action.hover'
              }
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryFilter; 