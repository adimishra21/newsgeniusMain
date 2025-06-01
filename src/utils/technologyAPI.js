// Technology news API functions
import { fetchNews } from './newsAPI';

// Mock data for technology news
const mockTechNews = [
  {
    id: 1,
    title: 'Next-Gen AI Models Set New Benchmarks in Natural Language Processing',
    description: 'Recent advancements in artificial intelligence have led to models that demonstrate unprecedented capabilities in understanding and generating human language.',
    category: 'tech',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'The Future of Quantum Computing: Practical Applications on the Horizon',
    description: 'Quantum computing technology is transitioning from theoretical research to practical applications, with several industries preparing for the quantum revolution.',
    category: 'tech',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Web3 Technologies Reshape Online Interactions and Digital Ownership',
    description: 'The emerging web3 ecosystem is transforming how users interact with digital content and establishing new paradigms for digital ownership and identity.',
    category: 'tech',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for AI news
const mockAiNews = [
  {
    id: 4,
    title: 'AI Ethics Frameworks Gaining Traction Among Tech Giants',
    description: 'Major technology companies are implementing comprehensive ethical frameworks to guide the development and deployment of artificial intelligence systems.',
    category: 'ai',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Healthcare Transformed: AI Diagnostic Tools Receive Regulatory Approval',
    description: 'Several AI-powered diagnostic tools have received regulatory clearance, promising to enhance medical imaging analysis and early disease detection.',
    category: 'ai',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'AI Research Breakthrough: Models Demonstrate Reasoning Capabilities',
    description: 'New research demonstrates AI systems that can perform complex reasoning tasks, bridging the gap between pattern recognition and logical thinking.',
    category: 'ai',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for gadgets
const mockGadgets = [
  {
    id: 7,
    title: 'Revolutionary Foldable Smartphones: Next Generation Unveiled',
    description: 'The latest generation of foldable smartphones features significant improvements in durability, display technology, and performance.',
    category: 'gadgets',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Next-Gen Gaming Consoles: Enhanced Performance and Exclusive Titles',
    description: 'The newest gaming consoles offer unprecedented graphics capabilities, faster load times, and an impressive lineup of exclusive games.',
    category: 'gadgets',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 9,
    title: 'Wearable Tech Evolution: Health Monitoring Goes Mainstream',
    description: 'Advanced wearable devices now offer comprehensive health monitoring features, from ECG readings to blood oxygen levels and sleep analysis.',
    category: 'gadgets',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for startups
const mockStartups = [
  {
    id: 10,
    title: 'Climate Tech Startups Secure Record Funding for Carbon Capture Solutions',
    description: 'Innovative startups focused on climate technology have attracted unprecedented levels of investment for developing efficient carbon capture and utilization solutions.',
    category: 'startups',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1607859913341-610451a4e9cb?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 11,
    title: 'Fintech Revolution: Blockchain Startups Disrupt Traditional Banking',
    description: 'A new wave of blockchain-powered financial technology startups is challenging conventional banking systems with innovative solutions for payments, lending, and investment.',
    category: 'startups',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 12,
    title: 'Healthcare Innovation: Biotech Startups Pioneering Personalized Medicine',
    description: 'Emerging biotechnology startups are leveraging genetic data and AI to develop highly personalized medical treatments and preventative health solutions.',
    category: 'startups',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?q=80&w=1000&auto=format&fit=crop'
  }
];

// API functions
export const getTechNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'technology OR "tech innovation" OR "digital transformation" OR cybersecurity OR "emerging tech"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Technology News',
      description: item.description || 'Latest updates from the technology sector',
      category: 'tech',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for technology news due to API error:', error.message);
    return mockTechNews;
  }
};

export const getAiNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"artificial intelligence" OR "machine learning" OR "deep learning" OR "neural networks" OR "AI ethics" OR "generative AI"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'AI News',
      description: item.description || 'Latest developments in artificial intelligence',
      category: 'ai',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for AI news due to API error:', error.message);
    return mockAiNews;
  }
};

export const getGadgetsNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'gadgets OR smartphones OR "wearable technology" OR "smart devices" OR "consumer electronics" OR "tech review"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Gadgets News',
      description: item.description || 'Latest updates on technological gadgets and devices',
      category: 'gadgets',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for gadgets news due to API error:', error.message);
    return mockGadgets;
  }
};

export const getStartupsNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"tech startups" OR "startup funding" OR "venture capital" OR "tech entrepreneurs" OR "innovation hubs" OR "startup ecosystem"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Startups News',
      description: item.description || 'Latest updates from the tech startup ecosystem',
      category: 'startups',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1607859913341-610451a4e9cb?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for startups news due to API error:', error.message);
    return mockStartups;
  }
};

export const getFeaturedTechNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'technology OR innovation OR "artificial intelligence" OR "future tech" OR "breakthrough technology"', 
      sortBy: 'relevancy', 
      language: 'en', 
      pageSize: 5 
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Featured Technology News',
      description: item.description || 'Featured updates from the technology sector',
      image: item.urlToImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for featured technology news due to API error:', error.message);
    // Combine samples from different categories for featured content
    return [
      {
        id: 101,
        title: 'Breakthrough in Quantum Computing: Practical Applications Within Reach',
        description: 'Scientists have achieved a significant milestone in quantum computing that brings this revolutionary technology closer to solving real-world problems.',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 102,
        title: 'The Metaverse Evolution: From Concept to Reality',
        description: 'How the concept of the metaverse is rapidly transforming from a theoretical idea to a tangible digital ecosystem with real economic and social implications.',
        image: 'https://images.unsplash.com/photo-1614729375293-d531b0fe1d9f?q=80&w=1000&auto=format&fit=crop'
      },
      mockTechNews[0],
      mockAiNews[0],
      mockGadgets[0]
    ];
  }
}; 