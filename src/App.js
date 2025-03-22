import React, { useState, useMemo, createContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Button, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginSignup from "./Components/Authentication/LoginSignup";
import HomePage from "./Components/HomePage/HomePage";
import Profile from './Components/Profile/Profile';
import Explore from './Components/Explore/Explore';
import Signup from './Components/Authentication/Signup';
import Entertainment from './Components/Entertainment/Entertainment';
import EntertainmentDetails from './Components/Entertainment/EntertainmentDetails';
import Community from './Components/Community/Community';
import Sports from './Components/Sports/Sports';
import Astrology from './Components/Astrology/Astrology';
import Business from './Components/Business/Business';
import Technology from './Components/Technology/Technology';
import Education from './Components/Education/Education';
import "./App.css";
import syncUserData from './utils/userDataSync';

export const AuthContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      <div className="App">
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
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
        </div>
        
        <Box component="main">
          <AuthContext.Provider value={{ user, login }}>
            <Routes>
              <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/auth" element={<LoginSignup />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/explore" element={<Explore theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/entertainment" element={<Entertainment theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/entertainment/article/:id" element={<EntertainmentDetails theme={theme} />} />
              <Route path="/entertainment/release/:id" element={<EntertainmentDetails theme={theme} />} />
              <Route path="/entertainment/category/:category" element={<Entertainment theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/entertainment/tag/:tag" element={<Entertainment theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/communities" element={<Community theme={theme} />} />
              <Route path="/sports" element={<Sports theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/astrology" element={<Astrology theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/business" element={<Business theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/technology" element={<Technology theme={theme} toggleTheme={toggleTheme} />} />
              <Route path="/education" element={<Education theme={theme} toggleTheme={toggleTheme} />} />
              {/* Add other routes here */}
            </Routes>
          </AuthContext.Provider>
        </Box>
          </div>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}


export default App;
