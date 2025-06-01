import axios from 'axios';

/**
 * Utility for fetching entertainment news data with fallback to mock data
 */

// Uses free NewsAPI for real data (you'll need to use your own API key in production)
const NEWS_API_KEY = '33b913e452b944178aeade1fdbbe1498'; // Backup key provided by user
const NEWS_API_URL = 'https://newsapi.org/v2';

/**
 * Fetch entertainment headlines from NewsAPI or use mock data if API fails
 */
export const getEntertainmentHeadlines = async () => {
  try {
    // Due to CORS issues or API limitations, we'll use mock data for now
    // In a production app, you would properly implement API calls
    throw new Error("Using mock data instead");
    
    // The response variable is never defined because we throw an error above
    // Let's comment out this line to fix the linting error
    // return response.data.articles.map(article => article.title);
  } catch (error) {
    console.warn('Using mock entertainment headlines:', error);
    
    // Return mock data as fallback
    return [
      "Avatar 3 production complete, release date announced for December 2025",
      "Rajinikanth announces new film with acclaimed director",
      "Scarlett Johansson to direct her first feature film in 2024",
      "Aamir Khan and Shah Rukh Khan to collaborate on new project",
      "Marvel announces next phase of superhero films at Comic-Con",
      "SS Rajamouli begins work on new epic following RRR success",
      "Christopher Nolan's next film to begin production in fall 2024",
      "Deepika Padukone signs three-film deal with international studio",
      "Tom Cruise confirms two more Mission Impossible sequels"
    ];
  }
};

/**
 * Fetch Bollywood news from NewsAPI or use mock data if API fails
 */
export const getBollywoodNews = async () => {
  try {
    // Attempt to fetch from NewsAPI
    const response = await axios.get(`${NEWS_API_URL}/everything`, {
      params: {
        q: 'bollywood OR hindi AND film NOT politics',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 8,
        apiKey: NEWS_API_KEY
      }
    });
    
    // Use API data if successful
    if (response.data.articles && response.data.articles.length > 0) {
      return response.data.articles.map((article, index) => ({
        id: `bollywood-${index}`,
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        date: new Date(article.publishedAt).toLocaleDateString(),
        category: 'Bollywood',
        type: 'movie'
      }));
    }
    
    // Fallback to mock if no articles
    throw new Error('No articles found from API');
  } catch (error) {
    console.warn('Using mock Bollywood news:', error);
    
    // Return mock data as fallback
    return [
      {
        id: 'bollywood-1',
        title: 'Shah Rukh Khan Announces New Film with Sanjay Leela Bhansali',
        description: 'Bollywood superstar Shah Rukh Khan has confirmed his collaboration with acclaimed director Sanjay Leela Bhansali for an upcoming period drama set in the Mughal era.',
        image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-15',
        category: 'Bollywood',
        type: 'movie'
      },
      {
        id: 'bollywood-2',
        title: 'Deepika Padukone and Ranveer Singh to Star in Romantic Comedy',
        description: 'Real-life couple Deepika Padukone and Ranveer Singh are set to share the screen in a new romantic comedy directed by Karan Johar, marking their first rom-com together.',
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-10',
        category: 'Bollywood',
        type: 'movie'
      },
      {
        id: 'bollywood-3',
        title: 'Aamir Khan Begins Filming for Biopic on Chess Grandmaster',
        description: 'Aamir Khan has started shooting for his next project, a biographical film based on the life of an Indian chess grandmaster, after extensive physical transformation for the role.',
        image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-08',
        category: 'Bollywood',
        type: 'movie'
      },
      {
        id: 'bollywood-4',
        title: '"Delhi Heights" Breaks Box Office Records in Opening Weekend',
        description: 'The new ensemble drama "Delhi Heights" has shattered box office records with its opening weekend collection, becoming the highest-grossing Bollywood film of the year.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-04',
        category: 'Bollywood',
        type: 'movie'
      }
    ];
  }
};

/**
 * Fetch Hollywood news from NewsAPI or use mock data if API fails
 */
export const getHollywoodNews = async () => {
  try {
    // Attempt to fetch from NewsAPI
    const response = await axios.get(`${NEWS_API_URL}/everything`, {
      params: {
        q: 'hollywood OR american AND film NOT politics',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 8,
        apiKey: NEWS_API_KEY
      }
    });
    
    // Use API data if successful
    if (response.data.articles && response.data.articles.length > 0) {
      return response.data.articles.map((article, index) => ({
        id: `hollywood-${index}`,
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        date: new Date(article.publishedAt).toLocaleDateString(),
        category: 'Hollywood',
        type: 'movie'
      }));
    }
    
    // Fallback to mock if no articles
    throw new Error('No articles found from API');
  } catch (error) {
    console.warn('Using mock Hollywood news:', error);
    
    // Return mock data as fallback
    return [
      {
        id: 'hollywood-1',
        title: 'Marvel Reveals Phase 6 Timeline and New Avengers Cast',
        description: 'Marvel Studios has officially announced the complete timeline for Phase 6 of the MCU, including a surprising new roster for the next Avengers team.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-18',
        category: 'Hollywood',
        type: 'movie'
      },
      {
        id: 'hollywood-2',
        title: 'Christopher Nolan Announces New Sci-Fi Project with A24',
        description: 'Director Christopher Nolan is partnering with A24 for his next sci-fi film, marking a departure from his long-standing relationship with Warner Bros.',
        image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-15',
        category: 'Hollywood',
        type: 'movie'
      },
      {
        id: 'hollywood-3',
        title: 'Tom Cruise Begins Training for First Film Set in Space',
        description: 'Tom Cruise has started his astronaut training program for the groundbreaking movie that will be partially filmed aboard the International Space Station.',
        image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-10',
        category: 'Hollywood',
        type: 'movie'
      },
      {
        id: 'hollywood-4',
        title: '"Dune: Part Two" Trailer Reveals New Characters and Settings',
        description: 'Warner Bros. has released the full trailer for "Dune: Part Two," showcasing new characters, settings, and the continuation of Paul Atreides\' journey on Arrakis.',
        image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-05',
        category: 'Hollywood',
        type: 'movie'
      }
    ];
  }
};

/**
 * Fetch Tollywood news from NewsAPI or use mock data if API fails
 */
export const getTollywoodNews = async () => {
  try {
    // Attempt to fetch from NewsAPI
    const response = await axios.get(`${NEWS_API_URL}/everything`, {
      params: {
        q: 'tollywood OR telugu OR tamil AND film NOT politics',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 8,
        apiKey: NEWS_API_KEY
      }
    });
    
    // Use API data if successful
    if (response.data.articles && response.data.articles.length > 0) {
      return response.data.articles.map((article, index) => ({
        id: `tollywood-${index}`,
      title: article.title,
        description: article.description,
        image: article.urlToImage,
        date: new Date(article.publishedAt).toLocaleDateString(),
        category: 'Tollywood',
        type: 'movie'
      }));
    }
    
    // Fallback to mock if no articles
    throw new Error('No articles found from API');
  } catch (error) {
    console.warn('Using mock Tollywood news:', error);
    
    // Return mock data as fallback
    return [
      {
        id: 'tollywood-1',
        title: 'SS Rajamouli Announces New Multi-Starrer with Pan-Indian Cast',
        description: 'Following the global success of RRR, director SS Rajamouli has announced his next project featuring stars from multiple Indian film industries.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-17',
        category: 'Tollywood',
        type: 'movie'
      },
      {
        id: 'tollywood-2',
        title: 'Allu Arjun\'s "Pushpa 2" Release Date Confirmed',
        description: 'The highly anticipated sequel to "Pushpa: The Rise" starring Allu Arjun has confirmed its theatrical release date with a new poster reveal.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-12',
        category: 'Tollywood',
        type: 'movie'
      },
      {
        id: 'tollywood-3',
        title: 'Prabhas and Deepika Padukone Starrer "Kalki" Begins Production',
        description: 'The mythological sci-fi film "Kalki" starring Prabhas and Deepika Padukone has officially begun production with a traditional ceremony.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-09',
        category: 'Tollywood',
        type: 'movie'
      },
      {
        id: 'tollywood-4',
        title: 'Nayanthara Signs Landmark Deal for Female-Led Action Franchise',
        description: 'Superstar Nayanthara has signed a groundbreaking deal to lead a new action franchise, becoming the first South Indian actress to headline such a project.',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        date: '2023-12-03',
        category: 'Tollywood',
        type: 'movie'
      }
    ];
  }
};

/**
 * Get upcoming movie and show releases
 */
export const getUpcomingReleases = async () => {
  try {
    // In a real app, this would fetch from a dedicated API
    throw new Error("Using mock data for upcoming releases");
  } catch (error) {
    console.warn('Using mock upcoming releases:', error);
    
    // Return mock data
    return [
      {
        id: 'upcoming-1',
        title: 'Takht',
        releaseDate: '2024-04-12',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        category: 'Bollywood',
        type: 'Movie'
      },
      {
        id: 'upcoming-2',
        title: 'Avengers: Secret Wars',
        releaseDate: '2024-05-03',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        category: 'Hollywood',
        type: 'Movie'
      },
      {
        id: 'upcoming-3',
        title: 'The Last of Us - Season 2',
        releaseDate: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        category: 'TV',
        type: 'Series'
      },
      {
        id: 'upcoming-4',
        title: 'Pushpa 2: The Rule',
        releaseDate: '2024-08-15',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        category: 'Tollywood',
        type: 'Movie'
      },
      {
        id: 'upcoming-5',
        title: 'Stranger Things - Final Season',
        releaseDate: '2024-07-04',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        category: 'TV',
        type: 'Series'
      },
      {
        id: 'upcoming-6',
        title: 'Fighter',
        releaseDate: '2024-01-25',
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop',
        category: 'Bollywood',
        type: 'Movie'
      }
    ];
  }
};

/**
 * Get entertainment news by category
 */
export const getEntertainmentNews = async (category = 'all') => {
  const query = category === 'all' 
    ? 'entertainment OR movies OR cinema'
    : `entertainment AND ${category}`;
    
  try {
    const response = await axios.get(`${NEWS_API_URL}/everything`, {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 15,
        apiKey: NEWS_API_KEY
      }
    });
    
    if (response.data.articles && response.data.articles.length > 0) {
      return response.data.articles.map((article, index) => ({
        id: `entertainment-${category}-${index}`,
        title: article.title || 'Untitled',
        description: article.description || 'No description available',
        content: article.content || article.description || 'No content available',
        source: article.source?.name || 'Unknown Source',
        author: article.author || 'Unknown Author',
        date: new Date(article.publishedAt).toLocaleDateString(),
        image: article.urlToImage,
        url: article.url,
        category: category === 'all' ? 'Entertainment' : category
      }));
    }
    
    throw new Error('No articles found from API');
  } catch (error) {
    console.warn(`Using mock entertainment news for ${category}:`, error);
    
    // Generate mock data based on category
    return getMockEntertainmentNews(category);
  }
};

/**
 * Get mock entertainment news data
 */
const getMockEntertainmentNews = (category) => {
  // Base set of news items
  const baseNews = [
    {
      id: 'entertainment-1',
      title: 'New Marvel Film Breaks Box Office Records',
      description: 'The latest Marvel superhero film has broken opening weekend box office records worldwide.',
      content: 'The latest Marvel superhero film has broken opening weekend box office records worldwide, surpassing all expectations. Industry experts attribute this success to the film\'s star-studded cast and connection to the broader Marvel Cinematic Universe.',
      source: 'Entertainment Weekly',
      author: 'John Smith',
      date: '2023-12-20',
      image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'movies'
    },
    {
      id: 'entertainment-2',
      title: 'Streaming Platform Announces New Original Series',
      description: 'A major streaming platform has announced a new sci-fi series set to premiere next month.',
      content: 'A major streaming platform has announced a new sci-fi series set to premiere next month, directed by an acclaimed filmmaker known for blockbuster movies. The big-budget production features several A-list actors in their first streaming series roles.',
      source: 'Variety',
      author: 'Jane Doe',
      date: '2023-12-18',
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'tv'
    },
    {
      id: 'entertainment-3',
      title: 'Bollywood Star Signs International Film Deal',
      description: 'A prominent Bollywood actor has signed a three-film deal with a major international studio.',
      content: 'A prominent Bollywood actor has signed a three-film deal with a major international studio, marking their expansion into global cinema. The collaboration aims to create content that appeals to both Indian and international audiences.',
      source: 'Filmfare',
      author: 'Rahul Sharma',
      date: '2023-12-15',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'bollywood'
    },
    {
      id: 'entertainment-4',
      title: 'Award-Winning Director Announces Retirement',
      description: 'A legendary director has announced their retirement after a fifty-year career in filmmaking.',
      content: 'A legendary director has announced their retirement after a fifty-year career in filmmaking. The announcement came during the premiere of what will now be their final film, which has already received critical acclaim at film festivals.',
      source: 'The Hollywood Reporter',
      author: 'Michael Johnson',
      date: '2023-12-12',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'movies'
    },
    {
      id: 'entertainment-5',
      title: 'Music Biopic Leads Oscar Nominations',
      description: 'A biographical film about a famous musician has received the most Oscar nominations this year.',
      content: 'A biographical film about a famous musician has received the most Oscar nominations this year, including Best Picture, Best Director, and Best Actor. The film has been praised for its authentic portrayal of the music industry in the 1970s.',
      source: 'Rolling Stone',
      author: 'Sarah Williams',
      date: '2023-12-10',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'movies'
    },
    {
      id: 'entertainment-6',
      title: 'South Korean Drama Sets New Streaming Record',
      description: 'A new South Korean drama has become the most-watched non-English series on a major streaming platform.',
      content: 'A new South Korean drama has become the most-watched non-English series on a major streaming platform, continuing the global popularity of Korean entertainment. The show has been praised for its compelling storyline and high production values.',
      source: 'Deadline',
      author: 'Min-Ji Kim',
      date: '2023-12-08',
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'tv'
    },
    {
      id: 'entertainment-7',
      title: 'Famous Actor To Make Broadway Debut',
      description: 'A Hollywood A-lister is set to make their Broadway debut in a revival of a classic play.',
      content: 'A Hollywood A-lister is set to make their Broadway debut in a revival of a classic play, directed by a Tony Award winner. Theater critics and film fans alike are eagerly anticipating this crossover into live performance.',
      source: 'Playbill',
      author: 'Robert Thompson',
      date: '2023-12-05',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'theater'
    },
    {
      id: 'entertainment-8',
      title: 'Hollywood Studio Announces New Theme Park Attraction',
      description: 'A major Hollywood studio has revealed plans for a new immersive attraction based on a popular film franchise.',
      content: 'A major Hollywood studio has revealed plans for a new immersive attraction based on a popular film franchise, scheduled to open next summer. The attraction will feature cutting-edge technology to create an interactive experience for visitors.',
      source: 'Theme Park Insider',
      author: 'David Miller',
      date: '2023-12-03',
      image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1000&auto=format&fit=crop',
      url: '#',
      category: 'movies'
    }
  ];
  
  // Filter by category if specified
  if (category === 'all') {
    return baseNews;
  } else {
    return baseNews.filter(item => 
      item.category.toLowerCase() === category.toLowerCase() ||
      item.title.toLowerCase().includes(category.toLowerCase()) ||
      item.description.toLowerCase().includes(category.toLowerCase())
    );
  }
};

/**
 * Get fuel prices for various states
 */
export const getFuelPrices = async () => {
  try {
    // In a real app, this would fetch from a dedicated API
    throw new Error("Using mock data for fuel prices");
  } catch (error) {
    console.warn('Using mock fuel prices data:', error);
    
    // Return mock data
    return {
      "Maharashtra": {
        petrol: 106.31,
        diesel: 94.27,
        lastUpdated: "2023-12-20"
      },
      "Delhi": {
        petrol: 96.72,
        diesel: 89.62,
        lastUpdated: "2023-12-20"
      },
      "Karnataka": {
        petrol: 101.94,
        diesel: 87.89,
        lastUpdated: "2023-12-20"
      },
      "Tamil Nadu": {
        petrol: 102.63,
        diesel: 94.24,
        lastUpdated: "2023-12-20"
      },
      "Gujarat": {
        petrol: 96.63,
        diesel: 92.38,
        lastUpdated: "2023-12-20"
      }
    };
  }
}; 