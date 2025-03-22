// Mock data for sports news
const mockHeadlines = [
  "India vs England Test Series: Latest Updates",
  "Premier League: Top Teams Battle for Championship",
  "Olympic Games 2024: Preparation Updates",
  "Tennis Grand Slam: Major Upsets in Recent Matches",
  "Hockey World Cup: Team India's Performance"
];

const mockCricketNews = [
  {
    id: 1,
    title: "Virat Kohli's Century Leads India to Victory",
    description: "Indian cricket team captain Virat Kohli scored a brilliant century in the final match of the series.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
    category: "Cricket",
    datePublished: "2024-03-19"
  },
  {
    id: 2,
    title: "IPL 2024: Team Changes and Updates",
    description: "Latest updates about team compositions and player transfers for the upcoming IPL season.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
    category: "Cricket",
    datePublished: "2024-03-18"
  }
];

const mockFootballNews = [
  {
    id: 3,
    title: "Premier League: Title Race Intensifies",
    description: "The race for the Premier League title heats up as top teams continue their battle.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
    category: "Football",
    datePublished: "2024-03-19"
  },
  {
    id: 4,
    title: "Champions League Quarter-Finals Draw",
    description: "The draw for the Champions League quarter-finals has been completed.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
    category: "Football",
    datePublished: "2024-03-18"
  }
];

const mockHockeyNews = [
  {
    id: 5,
    title: "Hockey World Cup: India's Performance",
    description: "A detailed analysis of Team India's performance in the Hockey World Cup.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
    category: "Hockey",
    datePublished: "2024-03-19"
  },
  {
    id: 6,
    title: "National Hockey League Updates",
    description: "Latest news and updates from the National Hockey League.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
    category: "Hockey",
    datePublished: "2024-03-18"
  }
];

const mockUpcomingMatches = [
  {
    id: 7,
    title: "India vs Australia Test Series",
    description: "Upcoming test series between India and Australia with detailed schedule.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1000&auto=format&fit=crop",
    matchDate: "2024-04-01",
    type: "International"
  },
  {
    id: 8,
    title: "Premier League: Manchester Derby",
    description: "The highly anticipated Manchester derby in the Premier League.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
    matchDate: "2024-04-05",
    type: "Domestic"
  }
];

// API functions
export const getSportsHeadlines = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHeadlines;
};

export const getCricketNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCricketNews;
};

export const getFootballNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockFootballNews;
};

export const getHockeyNews = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHockeyNews;
};

export const getUpcomingMatches = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUpcomingMatches;
};

export const getMatchById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const match = mockUpcomingMatches.find(m => m.id === parseInt(id));
  if (!match) throw new Error('Match not found');
  return match;
};

export const getNewsById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const allNews = [...mockCricketNews, ...mockFootballNews, ...mockHockeyNews];
  const news = allNews.find(n => n.id === parseInt(id));
  if (!news) throw new Error('News not found');
  return news;
};

export const getRelatedNews = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const allNews = [...mockCricketNews, ...mockFootballNews, ...mockHockeyNews];
  const currentNews = allNews.find(n => n.id === parseInt(id));
  if (!currentNews) throw new Error('News not found');
  
  return allNews
    .filter(n => n.id !== parseInt(id) && n.category === currentNews.category)
    .slice(0, 3);
}; 