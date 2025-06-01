import { createContext } from 'react';
import { DEFAULT_LANGUAGE } from './translationUtils';

// Language context for translation functionality
export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {}
});

// Auth context for user authentication
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
}); 