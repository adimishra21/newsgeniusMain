import axios from 'axios';

const API_KEY = '33b913e452b944178aeade1fdbbe1498';
const BASE_URL = 'https://newsapi.org/v2';

// Categories supported by the NewsAPI
export const CATEGORIES = [
  'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
];

// Keywords related to each category for better matching
export const CATEGORY_KEYWORDS = {
  business: ['finance', 'economy', 'market', 'stock', 'trade', 'investment', 'company', 'startup', 'entrepreneur', 'banking', 'corporate', 'industry', 'economic', 'commercial', 'GDP', 'recession', 'growth'],
  entertainment: ['movie', 'film', 'celebrity', 'actor', 'actress', 'hollywood', 'bollywood', 'music', 'concert', 'award', 'star', 'cinema', 'theater', 'show', 'tv', 'television', 'streaming', 'series'],
  health: ['medical', 'hospital', 'doctor', 'patient', 'disease', 'treatment', 'medicine', 'healthcare', 'wellness', 'fitness', 'mental health', 'diet', 'nutrition', 'virus', 'vaccine', 'pandemic', 'research'],
  science: ['research', 'discovery', 'study', 'scientist', 'laboratory', 'experiment', 'innovation', 'space', 'nasa', 'physics', 'chemistry', 'biology', 'genetics', 'climate', 'environment', 'technology'],
  sports: ['game', 'player', 'team', 'match', 'tournament', 'championship', 'league', 'football', 'cricket', 'basketball', 'tennis', 'soccer', 'baseball', 'golf', 'olympics', 'world cup', 'athlete'],
  technology: ['tech', 'software', 'hardware', 'app', 'application', 'device', 'gadget', 'smartphone', 'computer', 'internet', 'AI', 'artificial intelligence', 'machine learning', 'robot', 'programming', 'code'],
  politics: ['government', 'president', 'minister', 'election', 'vote', 'party', 'parliament', 'senate', 'congress', 'democracy', 'policy', 'diplomatic', 'international', 'national', 'leader', 'campaign']
};

// Countries supported by the NewsAPI
export const COUNTRIES = {
  'us': 'United States', 
  'in': 'India', 
  'gb': 'United Kingdom', 
  'ca': 'Canada',
  'au': 'Australia'
};

// Common stopwords to filter out
const STOPWORDS = [
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 
  'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'did', 'do', 'does', 'doing', 'down', 'during', 
  'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself', 
  'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 
  'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 
  'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 
  'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your', 'yours', 'yourself', 
  'yourselves', 'latest', 'news', 'tell', 'me', 'please', 'want', 'know', 'information', 'articles', 'read', 'show'
];

// Cache for storing API responses
const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// Mock data to use when API fails (rate limited)
const mockData = {
  articles: [
    {
      source: { id: 'mock-source', name: 'Mock News' },
      author: 'Mock Author',
      title: 'Sample News Article',
      description: 'This is a sample news article provided when the API is unavailable.',
      url: 'https://example.com/news',
      urlToImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop',
      publishedAt: new Date().toISOString(),
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      source: { id: 'mock-source-2', name: 'Mock News Network' },
      author: 'Another Author',
      title: 'Breaking News Story',
      description: 'This is another sample news article for when the API is unavailable.',
      url: 'https://example.com/breaking-news',
      urlToImage: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000&auto=format&fit=crop',
      publishedAt: new Date().toISOString(),
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    }
  ],
  status: 'ok',
  totalResults: 2
};

/**
 * Extract keywords from user text input using NLP techniques
 * @param {string} text - The user input text to analyze
 * @param {number} maxKeywords - Maximum number of keywords to return
 * @returns {Object} - Object containing keywords, detected category, and query string
 */
export const extractKeywords = (text, maxKeywords = 5) => {
  // Convert to lowercase and remove punctuation
  const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
  
  // Tokenize into words
  const words = cleanText.split(/\s+/).filter(word => word.length > 2);
  
  // Remove stopwords
  const filteredWords = words.filter(word => !STOPWORDS.includes(word));
  
  // Count word frequency
  const wordFrequency = {};
  filteredWords.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });
  
  // Find keywords by frequency and length
  const sortedWords = Object.keys(wordFrequency).sort((a, b) => {
    // Prioritize longer words and higher frequency
    const scoreA = wordFrequency[a] + (a.length > 5 ? 1 : 0);
    const scoreB = wordFrequency[b] + (b.length > 5 ? 1 : 0);
    return scoreB - scoreA;
  });
  
  // Get top keywords
  const keywords = sortedWords.slice(0, maxKeywords);
  
  // Try to detect a category from keywords
  let detectedCategory = null;
  for (const [category, relatedKeywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const matchCount = keywords.filter(keyword => 
      relatedKeywords.some(related => related.includes(keyword) || keyword.includes(related))
    ).length;
    
    if (matchCount > 0) {
      detectedCategory = category;
      break;
    }
  }
  
  // Build a query string for search
  const queryString = keywords.slice(0, 3).join(' ');
  
  return {
    keywords,
    detectedCategory,
    queryString
  };
};

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
    console.warn('Error fetching news:', error.message);
    
    // Check for rate limiting (429) or any other error
    if (error.response?.status === 429 || error.code === 'ERR_NETWORK') {
      // If rate limited or network error, try to get from cache even if expired
      const cacheKey = `${endpoint}-${JSON.stringify(params)}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.warn('Using cached data due to API error');
        return cachedData.data;
      }
      
      // If no cache available, return mock data
      console.warn('Using mock data due to API error');
      return mockData;
    }
    
    // For other errors, return mock data
    console.warn('Using mock data due to API error');
    return mockData;
  }
};

// Helper functions for common API calls
export const getTopHeadlines = (params = {}) => 
  fetchNews('/top-headlines', params);

export const getEverything = (params = {}) => 
  fetchNews('/everything', params);

// Fetch news by specific category (compatible with NewsAPI categories)
export const getNewsByCategory = (category, country = 'us', pageSize = 10) => 
  getTopHeadlines({ 
    country, 
    category, 
    pageSize 
  });

// Fetch news by specific search term (more flexible)
export const getNewsBySearchTerm = (searchTerm, pageSize = 10, language = 'en') => 
  getEverything({ 
    q: searchTerm, 
    language, 
    sortBy: 'publishedAt', 
    pageSize 
  });

// Smart news search that analyzes text first
export const getSmartNews = async (text, pageSize = 10) => {
  const { keywords, detectedCategory, queryString } = extractKeywords(text);
  console.log(`Smart search: Keywords: ${keywords.join(', ')}, Category: ${detectedCategory}, Query: ${queryString}`);
  
  // If we detected a specific category, use that
  if (detectedCategory && CATEGORIES.includes(detectedCategory)) {
    try {
      const categoryNews = await getNewsByCategory(detectedCategory, 'us', pageSize);
      // If we got good results, return them
      if (categoryNews?.articles?.length > 0) {
        return categoryNews;
      }
    } catch (error) {
      console.warn('Error fetching category news, falling back to search', error);
    }
  }
  
  // Otherwise use the extracted keywords as a search query
  return getNewsBySearchTerm(queryString || keywords[0] || text, pageSize);
};

// Fetch general/world news
export const getGeneralNews = (country = 'us', pageSize = 10) => 
  getTopHeadlines({ 
    country, 
    category: 'general', 
    pageSize 
  });

// Fetch trending topics (based on top headlines)
export const getTrendingNews = (pageSize = 10) => 
  getTopHeadlines({ pageSize });

// Category-specific functions
export const getEntertainmentNews = () => 
  getNewsByCategory('entertainment', 'in');

export const getBollywoodNews = () => 
  getNewsBySearchTerm('bollywood india');

export const getHollywoodNews = () => 
  getNewsBySearchTerm('hollywood movies');

export const getTollywoodNews = () => 
  getNewsBySearchTerm('tollywood movies');

// Additional category-specific functions
export const getPoliticsNews = (country = 'us') => 
  getNewsBySearchTerm(`politics ${COUNTRIES[country] || ''}`);

export const getTechnologyNews = (country = 'us') => 
  getNewsByCategory('technology', country);

export const getHealthNews = (country = 'us') => 
  getNewsByCategory('health', country);

export const getScienceNews = (country = 'us') => 
  getNewsByCategory('science', country); 