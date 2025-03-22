// This file will fix common build issues with React applications on Netlify

const fs = require('fs');
const path = require('path');

console.log('Starting Netlify build fix script...');

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

// Fix Grid container issues in components
function fixGridContainerProps() {
  const componentsDir = path.join(process.cwd(), 'src', 'Components');
  if (!fs.existsSync(componentsDir)) {
    console.log('Components directory not found!');
    return;
  }

  // Get all directories in Components
  const dirs = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Process each directory
  dirs.forEach(dir => {
    const dirPath = path.join(componentsDir, dir);
    
    // Get all JSX files in the directory
    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.jsx'));
    
    // Process each JSX file
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix Grid container xs={12} -> container item xs={12}
      content = content.replace(/<Grid container xs={12}/g, '<Grid container item xs={12}');
      
      // Save the updated file
      fs.writeFileSync(filePath, content);
      console.log(`Fixed Grid props in ${file}`);
    });
  });
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
  
  // Create a _redirects file for SPA routing
  const redirectsContent = `
# Netlify SPA routing
/*    /index.html   200
`;
  
  fs.writeFileSync(redirectsPath, redirectsContent.trim());
  console.log('Created _redirects file for SPA routing');
}

// Run all fix functions
updatePackageJson();
fixGridContainerProps();
createNetlifyEnvFile();
createNetlifyRedirects();

console.log('Build fix script completed successfully.'); 