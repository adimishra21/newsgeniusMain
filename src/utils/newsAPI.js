import axios from 'axios';

const API_KEY = '9e76e457ea734bd79ae1f3b784796948';
const BASE_URL = 'https://newsapi.org/v2';

// Cache for storing API responses
const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export const fetchNews = async (endpoint, params = {}) => {
  try {
    // Check cache first
    const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    const response = await axios.get(`${BASE_URL}${endpoint}`, {
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
      const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
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