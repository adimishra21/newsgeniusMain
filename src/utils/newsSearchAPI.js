import axios from 'axios';

// GNews API key
const GNEWS_API_KEY = "57073565c8b4943e825c0ce6e256e7f0";
const GNEWS_BASE_URL = "https://gnews.io/api/v4";

// Rate limiting configuration
const RATE_LIMIT = {
  MAX_REQUESTS: 10,    // GNews free tier allows more requests
  WINDOW_MS: 60000,    // 1 minute window
  RETRY_DELAY: 5000,   // 5 seconds between retries
  MAX_RETRIES: 1       // Only 1 retry attempt
};

// Request tracking
let requestCount = 0;
let lastRequestTime = 0;
let isRateLimited = false;
let rateLimitResetTime = 0;

// Reset request count periodically
setInterval(() => {
  requestCount = 0;
  lastRequestTime = 0;
  isRateLimited = false;
  rateLimitResetTime = 0;
}, RATE_LIMIT.WINDOW_MS);

/**
 * Makes an API request with rate limiting and retry logic
 * @param {Function} apiCall - The API call function to execute
 * @returns {Promise<any>} - API response
 */
const makeApiRequest = async (apiCall) => {
  try {
    // Check if we're rate limited
    if (isRateLimited) {
      const now = Date.now();
      if (now < rateLimitResetTime) {
        throw new Error('RATE_LIMITED');
      }
      isRateLimited = false;
      rateLimitResetTime = 0;
    }

    // Check rate limit
    const now = Date.now();
    if (requestCount >= RATE_LIMIT.MAX_REQUESTS) {
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < RATE_LIMIT.WINDOW_MS) {
        throw new Error('RATE_LIMITED');
      }
      requestCount = 0;
    }

    // Make the API call
    const response = await apiCall();
    requestCount++;
    lastRequestTime = now;
    return response;
  } catch (error) {
    if (error.message === 'RATE_LIMITED' || error.response?.status === 429) {
      isRateLimited = true;
      rateLimitResetTime = Date.now() + RATE_LIMIT.WINDOW_MS;
      throw new Error('RATE_LIMITED');
    }
    throw error;
  }
};

/**
 * Searches for news articles based on the provided tag using GNews API
 * @param {string} query - The search query or tag
 * @param {number} limit - Maximum number of results to return (default: 10)
 * @returns {Promise<Array>} - Array of news articles
 */
export const searchNewsByTag = async (query, limit = 10) => {
  try {
    if (!query) {
      throw new Error('Search query is required');
    }

    // Check if we're rate limited
    if (isRateLimited) {
      return getFallbackArticles(query, 'Rate Limit Active');
    }

    const apiCall = () => axios.get(`${GNEWS_BASE_URL}/search`, {
      params: {
        q: query,
        token: GNEWS_API_KEY,
        lang: 'en',
        max: limit,
        expand: 'content' // Include full content to get image URLs
      },
      timeout: 10000
    });

    try {
      const response = await makeApiRequest(apiCall);
      const articles = response.data.articles || [];
      
      if (articles.length === 0) {
        return [
          {
            title: 'No Results Found',
            description: `No news articles found for "${query}". Try a different search term.`,
            source: { name: 'System' },
            url: '#',
            publishedAt: new Date().toISOString(),
            image: '/placeholder-news.jpg', // Default placeholder image
            isFallback: true
          }
        ];
      }
      
      return articles.map(article => ({
        ...article,
        image: article.image || article.urlToImage || '/placeholder-news.jpg', // Fallback to placeholder if no image
        isFallback: false
      }));
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return getFallbackArticles(query, 'Rate Limit Active');
      }
      throw error;
    }
  } catch (error) {
    console.error('Error searching news by tag:', error);
    return getFallbackArticles(query, 'Search Error');
  }
};

/**
 * Gets trending news based on top headlines
 * @param {string} category - News category (default: 'general')
 * @param {number} limit - Maximum number of results to return (default: 10)
 * @returns {Promise<Array>} - Array of trending news articles
 */
export const getTrendingNews = async (category = 'general', limit = 10) => {
  try {
    // Check if we're rate limited
    if (isRateLimited) {
      return getDefaultNews(category);
    }

    const apiCall = () => axios.get(`${GNEWS_BASE_URL}/top-headlines`, {
      params: {
        category: category,
        token: GNEWS_API_KEY,
        lang: 'en',
        max: limit,
        expand: 'content' // Include full content to get image URLs
      },
      timeout: 10000
    });

    try {
      const response = await makeApiRequest(apiCall);
      const articles = response.data.articles || [];
      return articles.map(article => ({
        ...article,
        image: article.image || article.urlToImage || '/placeholder-news.jpg', // Fallback to placeholder if no image
        isFallback: false
      }));
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        return getDefaultNews(category);
      }
      throw error;
    }
  } catch (error) {
    console.error('Error getting trending news:', error);
    return getDefaultNews(category);
  }
};

/**
 * Returns fallback articles when API calls fail
 * @param {string} query - The search query
 * @param {string} errorType - Type of error that occurred
 * @returns {Array} - Array of fallback articles
 */
const getFallbackArticles = (query, errorType) => {
  return [
    {
      title: `${errorType}`,
      description: `There was an error searching for "${query}". Please try again in a minute.`,
      source: { name: 'System' },
      url: '#',
      publishedAt: new Date().toISOString(),
      image: '/placeholder-news.jpg',
      isFallback: true
    }
  ];
};

/**
 * Returns default news articles
 * @param {string} category - News category
 * @returns {Array} - Array of default news articles
 */
const getDefaultNews = (category) => {
  return [
    {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} News Unavailable`,
      description: 'Unable to fetch the latest news at this time. Please try again later.',
      source: { name: 'System' },
      url: '#',
      publishedAt: new Date().toISOString(),
      image: '/placeholder-news.jpg',
      isFallback: true
    }
  ];
};

export default {
  searchNewsByTag,
  getTrendingNews
}; 