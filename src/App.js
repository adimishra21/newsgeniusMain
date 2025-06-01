import React, { useState, useMemo, createContext, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Button, CssBaseline, Box, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginSignup from "./Components/Authentication/LoginSignup";
import HomePage from "./Components/HomePage/HomePage";
import Profile from './Components/Profile/Profile';
import Explore from './Components/Explore/Explore';
import Signup from './Components/Authentication/Signup';
import ForgotPassword from './Components/Authentication/ForgotPassword';
import ResetPassword from './Components/Authentication/ResetPassword';
import Entertainment from './Components/Entertainment/Entertainment';
import EntertainmentDetails from './Components/Entertainment/EntertainmentDetails';
import Community from './Components/Community/Community';
import Sports from './Components/Sports/Sports';
import SportsDetails from './Components/Sports/SportsDetails';
import Astrology from './Components/Astrology/Astrology';
import Business from './Components/Business/Business';
import Technology from './Components/Technology/Technology';
import Education from './Components/Education/Education';
import BusinessDetails from './Components/Business/BusinessDetails';
import TechnologyDetails from './Components/Technology/TechnologyDetails';
import EducationDetails from './Components/Education/EducationDetails';
import Tessa from './Components/Chatbot/Tessa';
import NewsSearch from './Components/Search/NewsSearch';
import LanguageToggle from './Components/TopNavBar/LanguageToggle';
import RecentTranslations from './Components/TopNavBar/RecentTranslations';
import SearchIcon from '@mui/icons-material/Search';
import "./App.css";
import syncUserData from './utils/userDataSync';
import { DEFAULT_LANGUAGE } from './utils/translationUtils';
import { AuthContext, LanguageContext } from './utils/contexts';
import { createConsoleDisplay } from './utils/consoleCapture';

// Make sure head has base tag - will be added by React Helmet or similar in a real app
// This is just a note for the deployment, not actual code to implement

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const navigate = useNavigate();

  // Initialize console capture for development environment
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      createConsoleDisplay();
    }
  }, []);

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    
    if (token) {
      // Create a user object from localStorage data
      setUser({
        id: userId,
        role: userRole,
        name: localStorage.getItem('userName') || 'User',
      });
    }
  }, []);

  // Load language preference from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Store language preference in localStorage
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Use the syncUserData utility when the app first loads
  useEffect(() => {
    // Check if user is logged in and sync data if needed
    const userId = localStorage.getItem('userId');
    if (userId) {
      console.log('User is logged in, syncing data...');
      syncUserData();
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    
    // Save user name to localStorage for persistence
    if (userData.name) {
      localStorage.setItem('userName', userData.name);
    }
    
    navigate('/');
  };

  const logout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    
    setUser(null);
    navigate('/auth');
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
    },
  }), [theme]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
            <div className="App">
              <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 1100 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Language toggle */}
                  <LanguageToggle />
                  
                  {/* News Search button */}
                  <Button 
                    variant="outlined"
                    startIcon={<SearchIcon />}
                    onClick={() => navigate('/search')}
                    size="small"
                  >
                    News Search
                  </Button>
                  
                  {/* Login/Logout button */}
                  {user ? (
                    <Button 
                      variant="contained" 
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button 
                      variant="contained" 
                      onClick={() => navigate('/auth')}
                    >
                      Login/Signup
                    </Button>
                  )}
                </Stack>
              </div>
              
              {/* Recent translations popup */}
              <RecentTranslations />
              
              <Box component="main">
                <AuthContext.Provider value={{ user, login }}>
                  <Routes>
                    <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/search" element={<NewsSearch />} />
                    <Route path="/auth" element={<LoginSignup />} />
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                    <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/auth/reset-password" element={<ResetPassword />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/explore" element={<Explore theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/entertainment" element={<Entertainment theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/entertainment/details/:id/entertainment" element={<EntertainmentDetails theme={theme} />} />
                    <Route path="/entertainment/category/:category" element={<Entertainment theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/entertainment/tag/:tag" element={<Entertainment theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/sports" element={<Sports theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/sports/details/:id/sports" element={<SportsDetails theme={theme} />} />
                    <Route path="/sports/category/:category" element={<Sports theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/sports/tag/:tag" element={<Sports theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/community" element={<Community theme={theme} />} />
                    <Route path="/communities" element={<Community theme={theme} />} />
                    <Route path="/astrology" element={<Astrology theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/business" element={<Business theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/technology" element={<Technology theme={theme} toggleTheme={toggleTheme} />} />
                    <Route path="/education" element={<Education theme={theme} toggleTheme={toggleTheme} />} />
                    
                    <Route path="/business/details/:id/business" element={<BusinessDetails theme={theme} />} />
                    <Route path="/technology/details/:id/technology" element={<TechnologyDetails theme={theme} />} />
                    <Route path="/education/details/:id/education" element={<EducationDetails theme={theme} />} />
                    
                    {/* Keep these for backward compatibility */}
                    <Route path="/entertainment/article/:id" element={<Navigate to={location => {
                      const id = location.pathname.split('/').pop();
                      return `/entertainment/details/${id}/entertainment`;
                    }} replace />} />
                    <Route path="/entertainment/release/:id" element={<Navigate to={location => {
                      const id = location.pathname.split('/').pop();
                      return `/entertainment/details/${id}/entertainment`;
                    }} replace />} />
                    
                    {/* Add other routes here */}
                  </Routes>
                </AuthContext.Provider>
              </Box>
              
              {/* Tessa chatbot - globally accessible */}
              <Tessa />
            </div>
          </LanguageContext.Provider>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
