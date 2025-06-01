// Sports news API functions
import { fetchNews } from './newsAPI';

// Mock data for sports headlines
const mockHeadlines = [
  "India vs England Test Series: Latest Updates",
  "Premier League: Top Teams Battle for Championship",
  "Olympic Games 2024: Preparation Updates",
  "Tennis Grand Slam: Major Upsets in Recent Matches",
  "Hockey World Cup: Team India's Performance"
];

// Mock data for sports news
const mockSportsNews = [
  {
    id: 1,
    title: "2024 Olympics: India's Medal Prospects",
    description: "A comprehensive analysis of Indian athletes who have the potential to win medals at the upcoming 2024 Olympic Games in Paris.",
    image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?q=80&w=1000&auto=format&fit=crop",
    category: "Sports",
    date: new Date().toLocaleDateString()
  },
  {
    id: 2,
    title: "Major Sports Events Calendar for 2024",
    description: "Mark your calendars for these upcoming major sporting events including international tournaments, championships, and league matches.",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1000&auto=format&fit=crop",
    category: "Sports",
    date: new Date().toLocaleDateString()
  }
];

// Mock data for cricket
const mockCricketNews = [
  {
    id: 3,
    title: "Virat Kohli's Century Leads India to Victory",
    description: "Indian cricket team captain Virat Kohli scored a brilliant century in the final match of the series, securing a win against England.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
    category: "Cricket",
    date: new Date().toLocaleDateString()
  },
  {
    id: 4,
    title: "IPL 2024: Team Changes and Updates",
    description: "Latest updates about team compositions and player transfers for the upcoming IPL season. Several key players are changing franchises.",
    image: "https://images.unsplash.com/photo-1625401586060-67ab192e6d59?q=80&w=1000&auto=format&fit=crop",
    category: "Cricket",
    date: new Date().toLocaleDateString()
  }
];

// Mock data for football
const mockFootballNews = [
  {
    id: 5,
    title: "Premier League: Title Race Intensifies",
    description: "The race for the Premier League title heats up as top teams continue their battle with just five games remaining in the season.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
    category: "Football",
    date: new Date().toLocaleDateString()
  },
  {
    id: 6,
    title: "Champions League Quarter-Finals Draw",
    description: "The draw for the Champions League quarter-finals has been completed, setting up some exciting matchups between Europe's elite clubs.",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop",
    category: "Football",
    date: new Date().toLocaleDateString()
  }
];

// Mock data for tennis
const mockTennisNews = [
  {
    id: 7,
    title: "Wimbledon: Top Seeds Advance to Quarter Finals",
    description: "The favorites at Wimbledon have successfully made it through to the quarter-final stage, with some exciting matches coming up.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1000&auto=format&fit=crop",
    category: "Tennis",
    date: new Date().toLocaleDateString()
  },
  {
    id: 8,
    title: "French Open: New Champions Emerge",
    description: "This year's French Open has seen new talents rise to the top of the tennis world, challenging the dominance of established players.",
    image: "https://images.unsplash.com/photo-1595435934819-5704d86e29e1?q=80&w=1000&auto=format&fit=crop",
    category: "Tennis",
    date: new Date().toLocaleDateString()
  }
];

// Mock data for hockey
const mockHockeyNews = [
  {
    id: 9,
    title: "Hockey World Cup: India's Performance",
    description: "A detailed analysis of Team India's performance in the Hockey World Cup, highlighting strengths and areas for improvement.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
    category: "Hockey",
    date: new Date().toLocaleDateString()
  },
  {
    id: 10,
    title: "National Hockey League Updates",
    description: "Latest news and updates from the National Hockey League, including team standings, player performances, and upcoming matches.",
    image: "https://images.unsplash.com/photo-1580692475446-c2fabbbbf835?q=80&w=1000&auto=format&fit=crop",
    category: "Hockey",
    date: new Date().toLocaleDateString()
  }
];

// Mock live scores
const mockLiveScores = [
  {
    id: 11,
    teams: "India vs England",
    score: "267/3 (45.2)",
    status: "Live",
    category: "Cricket",
    venue: "Eden Gardens, Kolkata"
  },
  {
    id: 12,
    teams: "Manchester City vs Liverpool",
    score: "2-1",
    status: "Live - 75'",
    category: "Football",
    venue: "Etihad Stadium"
  },
  {
    id: 13,
    teams: "Djokovic vs Nadal",
    score: "6-4, 4-6, 3-2",
    status: "Live - 3rd Set",
    category: "Tennis",
    venue: "Roland Garros"
  },
  {
    id: 14,
    teams: "India vs Australia",
    score: "2-1",
    status: "Live - Q3",
    category: "Hockey",
    venue: "National Stadium"
  }
];

// Mock upcoming matches
const mockUpcomingMatches = [
  {
    id: 15,
    title: "India vs Australia Test Series",
    description: "Upcoming test series between India and Australia with detailed schedule and venue information.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
    matchDate: new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString(),
    type: "International",
    category: "Cricket"
  },
  {
    id: 16,
    title: "Premier League: Manchester Derby",
    description: "The highly anticipated Manchester derby in the Premier League. Both teams are fighting for top positions.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
    matchDate: new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString(),
    type: "Domestic",
    category: "Football"
  }
];

// API functions
export const getSportsHeadlines = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHeadlines;
};

export const getCricketNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'cricket OR "ipl" OR "test match" OR "t20" OR "one day international"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Cricket News',
      description: item.description || 'Latest cricket updates and match results',
      category: 'Cricket',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for cricket news due to API error:', error.message);
    return mockCricketNews;
  }
};

export const getFootballNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'football OR "premier league" OR "champions league" OR "world cup" OR "fifa"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Football News',
      description: item.description || 'Latest football updates and match results',
      category: 'Football',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for football news due to API error:', error.message);
    return mockFootballNews;
  }
};

export const getTennisNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'tennis OR "grand slam" OR "wimbledon" OR "us open" OR "french open" OR "australian open"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Tennis News',
      description: item.description || 'Latest tennis updates and match results',
      category: 'Tennis',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for tennis news due to API error:', error.message);
    return mockTennisNews;
  }
};

export const getHockeyNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'hockey OR "field hockey" OR "ice hockey" OR "nhl" OR "hockey league"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Hockey News',
      description: item.description || 'Latest hockey updates and match results',
      category: 'Hockey',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for hockey news due to API error:', error.message);
    return mockHockeyNews;
  }
};

export const getLiveScores = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLiveScores;
};

export const getUpcomingMatches = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"upcoming matches" OR "match schedule" OR "sports calendar" OR "fixtures"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Upcoming Match',
      description: item.description || 'Information about upcoming sports events',
      image: item.urlToImage || 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=1000&auto=format&fit=crop',
      matchDate: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 14))).toLocaleDateString(),
      type: Math.random() > 0.5 ? 'International' : 'Domestic',
      category: ['Cricket', 'Football', 'Tennis', 'Hockey'][Math.floor(Math.random() * 4)]
    }));
  } catch (error) {
    console.warn('Using mock data for upcoming matches due to API error:', error.message);
    return mockUpcomingMatches;
  }
};

export const getMatchById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const match = mockUpcomingMatches.find(m => m.id === parseInt(id));
  if (!match) throw new Error('Match not found');
  return match;
};

export const getNewsById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const allNews = [...mockCricketNews, ...mockFootballNews, ...mockHockeyNews, ...mockTennisNews];
  const news = allNews.find(n => n.id === parseInt(id));
  if (!news) throw new Error('News not found');
  return news;
};

export const getRelatedNews = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const allNews = [...mockCricketNews, ...mockFootballNews, ...mockHockeyNews, ...mockTennisNews];
  const currentNews = allNews.find(n => n.id === parseInt(id));
  if (!currentNews) throw new Error('News not found');
  
  return allNews
    .filter(n => n.id !== parseInt(id) && n.category === currentNews.category)
    .slice(0, 3);
}; 