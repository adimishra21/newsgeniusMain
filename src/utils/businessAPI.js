// Business news API functions
import { fetchNews } from './newsAPI';

// Mock data for business news
const mockBusinessNews = [
  {
    id: 1,
    title: 'Indian Economy Shows Strong Growth in Q1',
    description: 'The Indian economy exhibited robust performance in the first quarter with a 7.8% GDP growth rate, surpassing analyst expectations.',
    category: 'business',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Reserve Bank of India Maintains Interest Rates',
    description: 'The RBI kept interest rates unchanged in its latest monetary policy meeting, focusing on managing inflation while supporting economic growth.',
    category: 'business',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1607944024060-0450380ddd33?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Major Corporate Mergers Reshape Industry Landscape',
    description: 'Several high-profile mergers and acquisitions announced this month are set to transform multiple sectors including technology and healthcare.',
    category: 'business',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for stock market
const mockStockMarket = [
  {
    id: 4,
    title: 'Sensex Crosses 80,000 Mark for First Time',
    description: 'Indian stock markets reached a historic milestone as the Sensex crossed 80,000 points, driven by strong foreign institutional investment and positive economic outlook.',
    category: 'stocks',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Top 5 Stocks to Watch This Week',
    description: 'Market analysts highlight key stocks that may show significant movement based on upcoming quarterly results and sector developments.',
    category: 'stocks',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Global Market Trends: Impact on Indian Equities',
    description: 'How international market movements and global economic indicators are influencing the direction of Indian stock markets.',
    category: 'stocks',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for cryptocurrency
const mockCryptocurrency = [
  {
    id: 7,
    title: 'Bitcoin Surges Past $75,000 Amid Institutional Adoption',
    description: 'The world\'s largest cryptocurrency continues its upward trajectory as more institutional investors add Bitcoin to their portfolios.',
    category: 'crypto',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Ethereum Upgrade: What Investors Need to Know',
    description: 'A comprehensive guide to the latest Ethereum network upgrade and its potential impact on transaction fees and network scalability.',
    category: 'crypto',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 9,
    title: 'Regulatory Developments in Cryptocurrency Markets',
    description: 'Recent regulatory announcements and their implications for cryptocurrency investors and exchanges operating in major economies.',
    category: 'crypto',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1629339942248-45d4b10d3c68?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for personal finance
const mockPersonalFinance = [
  {
    id: 10,
    title: 'Retirement Planning Strategies for Different Age Groups',
    description: 'Expert financial advisors share tailored retirement planning approaches for individuals in their 20s, 30s, 40s, and 50s.',
    category: 'finance',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 11,
    title: 'Maximizing Tax Savings: End of Financial Year Tips',
    description: 'Practical strategies to optimize your tax planning before the end of the financial year, including investment options and deductions.',
    category: 'finance',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 12,
    title: 'Building an Emergency Fund: How Much is Enough?',
    description: 'Financial experts discuss the optimal size of emergency funds for different life situations and strategies to build them efficiently.',
    category: 'finance',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1586034679970-cb7b5fc4928a?q=80&w=1000&auto=format&fit=crop'
  }
];

// API functions
export const getBusinessNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'business OR economy OR "corporate news" OR "economic growth" OR "business strategy"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Business News',
      description: item.description || 'Latest updates from the business world',
      category: 'business',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for business news due to API error:', error.message);
    return mockBusinessNews;
  }
};

export const getStockMarket = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"stock market" OR sensex OR nifty OR "market trends" OR "stock analysis" OR "equity markets"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Stock Market Update',
      description: item.description || 'Latest updates from the stock markets',
      category: 'stocks',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for stock market due to API error:', error.message);
    return mockStockMarket;
  }
};

export const getCryptocurrency = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'cryptocurrency OR bitcoin OR ethereum OR "crypto market" OR blockchain OR "digital currency"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Cryptocurrency News',
      description: item.description || 'Latest updates from the world of cryptocurrencies',
      category: 'crypto',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for cryptocurrency due to API error:', error.message);
    return mockCryptocurrency;
  }
};

export const getPersonalFinance = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"personal finance" OR "financial planning" OR "money management" OR "retirement planning" OR "tax planning" OR "investment advice"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Personal Finance Guide',
      description: item.description || 'Tips and advice for managing your personal finances',
      category: 'finance',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for personal finance due to API error:', error.message);
    return mockPersonalFinance;
  }
};

export const getFeaturedBusinessNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'business OR economy OR "stock market" OR "economic trends" OR "financial news"', 
      sortBy: 'relevancy', 
      language: 'en', 
      pageSize: 5 
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Featured Business News',
      description: item.description || 'Featured updates from the business world',
      image: item.urlToImage || 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for featured business news due to API error:', error.message);
    // Combine samples from different categories for featured content
    return [
      {
        id: 101,
        title: 'Global Economic Outlook 2024: Challenges and Opportunities',
        description: 'A comprehensive analysis of global economic trends, including inflation, growth projections, and trade relationships for the year ahead.',
        image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 102,
        title: 'The Future of Work: Remote Work and Digital Transformation',
        description: 'How businesses are adapting to permanent changes in work culture and leveraging technology for operational efficiency.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop'
      },
      mockBusinessNews[0],
      mockStockMarket[0],
      mockCryptocurrency[0]
    ];
  }
}; 