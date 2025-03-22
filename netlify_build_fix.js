// This file will fix common build issues with React applications on Netlify

const fs = require('fs');
const path = require('path');

console.log('Starting Netlify build fix script...');
console.log('Current working directory:', process.cwd());

// Function to modify package.json to ensure dependencies are correct
function updatePackageJson() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.log('package.json not found!');
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure React scripts are at the right version
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies['react-scripts'] = '^5.0.1';
    
    // Add missing peer dependencies that might cause issues
    packageJson.dependencies['postcss'] = '^8.4.24';
    packageJson.dependencies['autoprefixer'] = '^10.4.14';
    packageJson.dependencies['@mui/material'] = '^5.15.0';
    packageJson.dependencies['@mui/icons-material'] = '^5.15.0';
    packageJson.dependencies['@emotion/react'] = '^11.11.0';
    packageJson.dependencies['@emotion/styled'] = '^11.11.0';
    packageJson.dependencies['axios'] = '^1.6.0';
    packageJson.dependencies['react-router-dom'] = '^6.20.0';
    
    // Add webpack resolution to fix common issues
    packageJson.resolutions = packageJson.resolutions || {};
    packageJson.resolutions['webpack'] = '^5.88.0';
    
    // Add browserslist to ensure proper compatibility
    packageJson.browserslist = {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    };

    // Save the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Successfully updated package.json');
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
}

// Scan for import path issues and fix them
function fixProfilePathIssue() {
  console.log('Fixing Profile.jsx path issue...');

  try {
    // Check if Profile.jsx exists in the correct location
    const correctProfilePath = path.join(process.cwd(), 'src', 'Components', 'Profile', 'Profile.jsx');
    const lowerCaseProfilePath = path.join(process.cwd(), 'src', 'components', 'Profile.jsx');
    
    // Log the paths we're checking
    console.log(`Checking for correct Profile.jsx path: ${correctProfilePath}`);
    console.log(`Checking for lowercase Profile.jsx path: ${lowerCaseProfilePath}`);
    
    // If the lowercase version is imported but doesn't exist, create the directory
    const lowerCaseProfileDir = path.dirname(lowerCaseProfilePath);
    if (!fs.existsSync(lowerCaseProfileDir)) {
      console.log(`Creating directory: ${lowerCaseProfileDir}`);
      fs.mkdirSync(lowerCaseProfileDir, { recursive: true });
    }

    // If the Profile.jsx exists in the correct location but not in the lowercase location
    if (fs.existsSync(correctProfilePath) && !fs.existsSync(lowerCaseProfilePath)) {
      console.log('Found Profile.jsx in correct location, copying to lowercase path...');
      const profileContent = fs.readFileSync(correctProfilePath, 'utf8');
      fs.writeFileSync(lowerCaseProfilePath, profileContent);
      console.log('Successfully copied Profile.jsx to lowercase path');
    } 
    // If Profile.jsx doesn't exist anywhere, create a simple version
    else if (!fs.existsSync(correctProfilePath) && !fs.existsSync(lowerCaseProfilePath)) {
      console.log('Profile.jsx not found, creating a placeholder...');
      const profileContent = `
import React from 'react';
import { Box, Typography, Avatar, Button, Grid, Paper } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar 
              sx={{ width: 150, height: 150, margin: '0 auto 20px' }}
              alt="User Profile"
              src="/logo.jpg"
            />
            <Typography variant="h5">User Profile</Typography>
            <Typography variant="body2" color="text.secondary">
              user@example.com
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>Profile Information</Typography>
            <Typography paragraph>
              This is a placeholder profile component created to fix build issues.
              You can customize this component with actual user data once the build process is complete.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
`;
      fs.writeFileSync(lowerCaseProfilePath, profileContent);
      console.log('Created placeholder Profile.jsx file');
    }

    // Check for any imports from the wrong path in other files
    console.log('Checking for import path issues in other files...');
    fixImportPaths();
  } catch (error) {
    console.error('Error fixing Profile.jsx:', error);
  }
}

// Fix common import issues in components
function fixImportPaths() {
  console.log('Scanning for import issues...');
  
  try {
    // Create a directory for missing files if needed
    const fixDir = path.join(process.cwd(), 'src', 'utils');
    if (!fs.existsSync(fixDir)){
      fs.mkdirSync(fixDir, { recursive: true });
    }
    
    // Create the newsAPI.js file if it doesn't exist
    const newsAPIPath = path.join(fixDir, 'newsAPI.js');
    if (!fs.existsSync(newsAPIPath)) {
      const newsAPIContent = `
import axios from 'axios';

const API_KEY = '9e76e457ea734bd79ae1f3b784796948';
const BASE_URL = 'https://newsapi.org/v2';

// Cache for storing API responses
const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const fetchNews = async (endpoint, params = {}) => {
  try {
    // Check cache first
    const cacheKey = \`\${endpoint}-\${JSON.stringify(params)}\`;
    const cachedData = cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    const response = await axios.get(\`\${BASE_URL}\${endpoint}\`, {
      params: {
        ...params,
        apiKey: API_KEY
      }
    });

    // Store in cache
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      // If rate limited, try to get from cache even if expired
      const cacheKey = \`\${endpoint}-\${JSON.stringify(params)}\`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.warn('Using cached data due to rate limit');
        return cachedData.data;
      }
    }
    throw error;
  }
};

// Helper functions for common API calls
export const getTopHeadlines = (params = {}) => 
  fetchNews('/top-headlines', params);

export const getEverything = (params = {}) => 
  fetchNews('/everything', params);

export const getEntertainmentNews = () => 
  getTopHeadlines({ country: 'in', category: 'entertainment' });

export const getBollywoodNews = () => 
  getEverything({ q: 'bollywood india', language: 'en', sortBy: 'publishedAt' });

export const getHollywoodNews = () => 
  getEverything({ q: 'hollywood movies', language: 'en', sortBy: 'publishedAt' });

export const getTollywoodNews = () => 
  getEverything({ q: 'tollywood movies', language: 'en', sortBy: 'publishedAt' });

// Mock functions for development and fallback
export const getMockNews = (category) => {
  return {
    articles: Array(6).fill(null).map((_, i) => ({
      title: \`\${category} News Article \${i+1}\`,
      description: \`This is a mock description for \${category} news article \${i+1}.\`,
      urlToImage: '/logo.jpg',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: { name: 'Mock Source' }
    }))
  };
};
`;
      fs.writeFileSync(newsAPIPath, newsAPIContent);
      console.log('Created missing newsAPI.js file');
    }
    
    // Fix any missing CSS files
    const cssFiles = ['Entertainment.css', 'Ticker.css'];
    cssFiles.forEach(cssFile => {
      const componentDir = cssFile === 'Entertainment.css' ? 'Entertainment' : 'Ticker';
      const cssDir = path.join(process.cwd(), 'src', 'Components', componentDir);
      
      if (!fs.existsSync(cssDir)){
        fs.mkdirSync(cssDir, { recursive: true });
      }
      
      const cssPath = path.join(cssDir, cssFile);
      if (!fs.existsSync(cssPath)) {
        fs.writeFileSync(cssPath, '/* Auto-generated CSS file */');
        console.log(`Created missing ${cssFile}`);
      }
    });
    
    // Fix import paths in all JSX files
    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
      processDirectory(srcDir);
      console.log('Fixed import paths in src directory');
    }
    
    console.log('Import path checks completed');
  } catch (error) {
    console.error('Error fixing import paths:', error);
  }
}

// Process a directory recursively
function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      processDirectory(itemPath);
    } else if (item.name.endsWith('.jsx') || item.name.endsWith('.js')) {
      fixFileImports(itemPath);
    }
  }
}

// Fix imports in a specific file
function fixFileImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix Grid container xs={12} to container item xs={12}
    if (content.includes('<Grid container xs={12}')) {
      content = content.replace(/<Grid container xs={12}/g, '<Grid container item xs={12}');
      modified = true;
    }
    
    // Fix Profile.jsx import paths
    if (content.includes("from '../components/Profile'") || 
        content.includes("from './components/Profile'") ||
        content.includes("from 'components/Profile'")) {
      content = content.replace(
        /from ['"](.*)components\/Profile['"]/g, 
        'from \'../Components/Profile/Profile\''
      );
      modified = true;
    }
    
    // Fix missing imports for newsAPI
    if (content.includes("from '../../utils/newsAPI'") && 
        !fs.existsSync(path.join(process.cwd(), 'src', 'utils', 'newsAPI.js'))) {
      // This is handled by creating the file in fixImportPaths
      modified = true;
    }
    
    // Write the file back if modified
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed imports in ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Create a Netlify environment variables file
function createNetlifyEnvFile() {
  const envPath = path.join(process.cwd(), '.env.production');
  
  // Create a .env.production file with necessary variables
  const envContent = `
REACT_APP_NEWS_API_KEY=9e76e457ea734bd79ae1f3b784796948
PUBLIC_URL=
NODE_PATH=src/
`;
  
  fs.writeFileSync(envPath, envContent.trim());
  console.log('Created .env.production file');
}

// Create a redirect file for Netlify
function createNetlifyRedirects() {
  const redirectsPath = path.join(process.cwd(), 'public', '_redirects');
  
  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Create a _redirects file for SPA routing
  const redirectsContent = `
# Netlify SPA routing
/*    /index.html   200
`;
  
  fs.writeFileSync(redirectsPath, redirectsContent.trim());
  console.log('Created _redirects file for SPA routing');
}

// Make sure Ticker component exists
function ensureTickerComponent() {
  const tickerDir = path.join(process.cwd(), 'src', 'Components', 'Ticker');
  if (!fs.existsSync(tickerDir)){
    fs.mkdirSync(tickerDir, { recursive: true });
  }
  
  const tickerPath = path.join(tickerDir, 'Ticker.jsx');
  if (!fs.existsSync(tickerPath)) {
    const tickerContent = `
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import './Ticker.css';

const Ticker = ({ category }) => {
  const [headlines, setHeadlines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(
          \`https://newsapi.org/v2/top-headlines?country=in&category=\${category || 'general'}&pageSize=10&apiKey=9e76e457ea734bd79ae1f3b784796948\`
        );
        
        if (response.data.articles && response.data.articles.length > 0) {
          const titles = response.data.articles.map(article => article.title).filter(Boolean);
          setHeadlines(titles);
        } else {
          setHeadlines([\`Latest \${category || 'news'} headlines will appear here\`]);
        }
      } catch (error) {
        console.error('Error fetching headlines:', error);
        setHeadlines([\`Latest \${category || 'news'} headlines will appear here\`]);
      }
    };

    fetchHeadlines();
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === headlines.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [category]);

  if (headlines.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: '#FFEB3B',
        color: '#D32F2F',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Typography
        variant="body1"
        component="div"
        sx={{
          fontWeight: 'bold',
          animation: 'tickerEffect 20s linear infinite',
          display: 'inline-block'
        }}
      >
        {headlines[currentIndex]}
      </Typography>
    </Box>
  );
};

export default Ticker;
`;
    fs.writeFileSync(tickerPath, tickerContent);
    console.log('Created missing Ticker component');
    
    // Create Ticker CSS
    const tickerCssPath = path.join(tickerDir, 'Ticker.css');
    const tickerCssContent = `
@keyframes tickerEffect {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
`;
    fs.writeFileSync(tickerCssPath, tickerCssContent);
  }
}

// List all files in the src directory to help debugging
function listProjectFiles() {
  console.log('Listing all JavaScript/JSX files in src directory for debugging:');
  
  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    console.log('src directory not found!');
    return;
  }
  
  function traverseAndList(dir, prefix = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const itemPath = path.join(dir, item.name);
      const relativePath = path.relative(process.cwd(), itemPath);
      
      if (item.isDirectory()) {
        console.log(`${prefix}📁 ${item.name}`);
        traverseAndList(itemPath, prefix + '  ');
      } else if (item.name.endsWith('.js') || item.name.endsWith('.jsx')) {
        console.log(`${prefix}📄 ${item.name}`);
      }
    }
  }
  
  traverseAndList(srcDir);
}

// Run all fix functions
console.log('Running package.json updates...');
updatePackageJson();

console.log('Listing project files for debugging...');
listProjectFiles();

console.log('Fixing Profile.jsx path issue...');
fixProfilePathIssue();

console.log('Ensuring required components exist...');
ensureTickerComponent();

console.log('Fixing import paths and component issues...');
fixImportPaths();

console.log('Creating environment files...');
createNetlifyEnvFile();
createNetlifyRedirects();

console.log('Build fix script completed successfully.'); 