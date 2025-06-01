// Mock data for astrology
import { fetchNews } from './newsAPI';

// Mock data for astrology news
const mockAstrologyNews = [
  {
    id: 1,
    title: 'Mercury Retrograde: How It Affects Your Daily Life',
    description: 'Mercury retrograde can disrupt communication, travel, and technology. Learn how to navigate this challenging astrological period effectively.',
    category: 'astrology',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1532968952680-d64caf9ff0ee?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Solar Eclipse 2024: Astrological Significance',
    description: 'The upcoming solar eclipse brings powerful energy for transformation. Discover how different zodiac signs will be affected by this cosmic event.',
    category: 'astrology',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1539321908154-04927596764d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Planetary Alignments for the Month Ahead',
    description: 'Rare planetary configurations are occurring this month. Astrologers explain how these cosmic patterns may influence collective and personal energies.',
    category: 'astrology',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for horoscopes
const mockHoroscopes = [
  {
    id: 1,
    title: 'Aries Daily Horoscope',
    description: "Today brings energy and courage. Take initiative on projects you've been putting off. Your confidence will attract positive attention.",
    sign: 'Aries',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Taurus Daily Horoscope',
    description: 'Focus on stability and comfort today. Financial decisions may require extra attention. Trust your practical instincts.',
    sign: 'Taurus',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1496785373478-6b2ad7c4a7bc?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Gemini Daily Horoscope',
    description: 'Communication flows easily today. Express your ideas clearly and listen to others. Unexpected conversations may lead to opportunities.',
    sign: 'Gemini',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1574390353491-92705418df34?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Cancer Daily Horoscope',
    description: 'Your intuition is heightened today. Pay attention to your emotional needs and nurture important relationships. Home matters take priority.',
    sign: 'Cancer',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for zodiac signs
const mockZodiacSigns = [
  {
    id: 5,
    title: 'Understanding Zodiac Elements',
    description: 'The 12 zodiac signs are divided into four elements: fire, earth, air, and water. These elements influence personality traits and compatibility.',
    category: 'zodiac',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Zodiac Compatibility Guide',
    description: 'Discover which zodiac signs are most compatible with yours for friendships, romantic relationships, and professional partnerships.',
    category: 'zodiac',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for numerology
const mockNumerology = [
  {
    id: 7,
    title: 'Finding Your Life Path Number',
    description: 'Learn how to calculate your life path number and what it reveals about your personality, strengths, weaknesses, and life purpose.',
    category: 'numerology',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1589432249902-2dc656ddd481?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'The Significance of Master Numbers',
    description: 'Master numbers 11, 22, and 33 carry special spiritual significance in numerology. Discover what these powerful numbers mean in your life.',
    category: 'numerology',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1593085260707-5377ba37f868?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for tarot readings
const mockTarotReadings = [
  {
    id: 9,
    title: 'Understanding the Major Arcana',
    description: 'The 22 cards of the Major Arcana represent life lessons, karmic influences, and significant spiritual truths. Learn their meanings and how they appear in readings.',
    category: 'tarot',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1571425248272-b10703a0094d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 10,
    title: 'Daily Tarot Practices',
    description: 'Incorporate tarot into your daily routine with simple one-card pulls, journaling exercises, and meditation techniques to enhance intuition.',
    category: 'tarot',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1633224546947-20d26135b526?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for remedies
const mockRemedies = [
  {
    id: 11,
    title: 'Gemstone Remedies for Planets',
    description: 'Different gemstones correspond to planetary energies. Learn which stones can help balance challenging planetary influences in your birth chart.',
    category: 'remedies',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 12,
    title: 'Mantras for Spiritual Growth',
    description: 'Sacred sound vibrations can help overcome obstacles and enhance positive energies. Discover mantras for different planetary positions and challenges.',
    category: 'remedies',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1507409613952-518459ac866f?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for vedic astrology
const mockVedicAstrology = [
  {
    id: 13,
    title: 'Understanding Your Birth Chart (Kundli)',
    description: 'The Vedic birth chart maps the precise positions of planets at your birth time. Learn how to interpret the houses, signs, and planetary placements.',
    category: 'vedic',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 14,
    title: 'The Importance of Nakshatra',
    description: 'The 27 Nakshatras (lunar mansions) provide deeper insights than just your sun sign. Discover your birth Nakshatra and its influence on your personality.',
    category: 'vedic',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1000&auto=format&fit=crop'
  }
];

// API functions
export const getAstrologyNews = async () => {
  try {
    // More specific query for astrology news
    const response = await fetchNews('/everything', { 
      q: 'astrology OR "zodiac signs" OR horoscope OR "planetary alignment" OR "mercury retrograde"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Astrology News',
      description: item.description || 'Latest insights from the world of astrology',
      category: 'astrology',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1532968952680-d64caf9ff0ee?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for astrology news due to API error:', error.message);
    return mockAstrologyNews;
  }
};

export const getHoroscopes = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"daily horoscope" OR "zodiac prediction" OR "astrological forecast"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Daily Horoscope',
      description: item.description || 'Your daily astrological guidance',
      category: 'horoscopes',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for horoscopes due to API error:', error.message);
    return mockHoroscopes;
  }
};

export const getZodiacSigns = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"zodiac signs" OR "astrological signs" OR "birth chart" OR "sun sign" OR "moon sign"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Zodiac Signs',
      description: item.description || 'Insights about zodiac signs and their meanings',
      category: 'zodiac',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for zodiac signs due to API error:', error.message);
    return mockZodiacSigns;
  }
};

export const getNumerology = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'numerology OR "life path number" OR "birth number" OR "numerological prediction"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Numerology Insights',
      description: item.description || 'Understanding the mystical significance of numbers',
      category: 'numerology',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1589432249902-2dc656ddd481?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for numerology due to API error:', error.message);
    return mockNumerology;
  }
};

export const getTarotReadings = async () => {
  // Return mock data directly for tarot readings
  return mockTarotReadings;
};

export const getRemedies = async () => {
  // Return mock data directly for remedies
  return mockRemedies;
};

export const getVedicAstrology = async () => {
  // Return mock data directly for vedic astrology
  return mockVedicAstrology;
};

export const getFeaturedAstrologyNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'astrology OR horoscope OR "planetary alignment" OR "celestial event" OR "astrological forecast"', 
      sortBy: 'relevancy', 
      language: 'en', 
      pageSize: 5 
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Featured Astrology News',
      description: item.description || 'Featured insights from the world of astrology',
      image: item.urlToImage || 'https://images.unsplash.com/photo-1532968952680-d64caf9ff0ee?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for featured astrology news due to API error:', error.message);
    // Combine samples from different categories for featured content
    return [
      {
        id: 101,
        title: 'Full Moon in Scorpio: Transformation and Release',
        description: 'The upcoming full moon in Scorpio brings powerful energy for emotional healing and letting go of the past. Learn rituals to harness this intense lunar energy.',
        image: 'https://images.unsplash.com/photo-1523997596732-56d675f24376?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 102,
        title: 'Jupiter Enters Taurus: Abundance and Growth',
        description: 'Jupiter, the planet of expansion and good fortune, moves into Taurus. This transit brings opportunities for financial growth and material abundance.',
        image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1000&auto=format&fit=crop'
      },
      mockHoroscopes[0], 
      mockZodiacSigns[0], 
      mockVedicAstrology[0]
    ];
  }
}; 