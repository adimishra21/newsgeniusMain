// Education news API functions
import { fetchNews } from './newsAPI';

// Mock data for education news
const mockEducationNews = [
  {
    id: 1,
    title: 'New National Education Policy Implementation Updates',
    description: 'The government has released new timelines for the implementation of the National Education Policy across schools and universities.',
    category: 'education',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'CBSE Announces Exam Schedule for 2025',
    description: 'The Central Board of Secondary Education has released the complete exam schedule for class 10 and 12 board examinations for the academic year 2024-25.',
    category: 'education',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Education Budget Allocation Increased by 15%',
    description: 'The government has announced a significant increase in the education budget, focusing on infrastructure development and digital learning initiatives.',
    category: 'education',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for universities
const mockUniversities = [
  {
    id: 4,
    title: 'IIT Delhi Launches New AI Research Center',
    description: 'The Indian Institute of Technology Delhi has established a state-of-the-art Artificial Intelligence and Machine Learning research center in collaboration with industry partners.',
    category: 'universities',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Delhi University Introduces New Undergraduate Courses',
    description: 'Delhi University is expanding its curriculum with new courses focused on emerging technologies and interdisciplinary studies for the upcoming academic session.',
    category: 'universities',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'International Universities Establish Indian Campuses',
    description: 'Several prestigious international universities are opening campuses in India following new regulations allowing foreign educational institutions to operate in the country.',
    category: 'universities',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for schools
const mockSchools = [
  {
    id: 7,
    title: 'Digital Transformation in Primary Education',
    description: 'Primary schools across the country are adopting digital learning tools and interactive teaching methods to enhance student engagement and learning outcomes.',
    category: 'schools',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'New Assessment Framework for School Students',
    description: 'Education boards are implementing a comprehensive assessment framework that focuses on conceptual understanding rather than rote learning.',
    category: 'schools',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 9,
    title: 'Mental Health Programs in Schools: A Growing Focus',
    description: 'Schools are increasingly incorporating mental health awareness programs and counseling services to support student wellbeing.',
    category: 'schools',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1000&auto=format&fit=crop'
  }
];

// Mock data for job market
const mockJobMarket = [
  {
    id: 10,
    title: 'Skills Gap Analysis: What Employers Are Looking For',
    description: 'A comprehensive study reveals the critical skills gap between education output and industry requirements, highlighting areas for improvement in curriculum design.',
    category: 'jobs',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 11,
    title: 'Emerging Career Paths for Recent Graduates',
    description: 'New industries and roles are creating exciting career opportunities for graduates, particularly in fields like sustainable technology and digital content.',
    category: 'jobs',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1571805529673-0f56b922b359?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 12,
    title: 'Industry-Academia Partnerships Boost Employability',
    description: 'Collaborative programs between educational institutions and industry leaders are enhancing graduate employability through practical training and internships.',
    category: 'jobs',
    date: new Date().toLocaleDateString(),
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop'
  }
];

// API functions
export const getEducationNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'education OR "education policy" OR "learning methods" OR "education reform" OR "academic development"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Education News',
      description: item.description || 'Latest updates from the education sector',
      category: 'education',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for education news due to API error:', error.message);
    return mockEducationNews;
  }
};

export const getUniversitiesNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"universities" OR "higher education" OR "college education" OR "university research" OR "academic institutions" OR "campus life"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'University Updates',
      description: item.description || 'Latest news from universities and colleges',
      category: 'universities',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for universities news due to API error:', error.message);
    return mockUniversities;
  }
};

export const getSchoolsNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"schools" OR "primary education" OR "secondary education" OR "K-12" OR "school curriculum" OR "classroom innovation"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'School Education Updates',
      description: item.description || 'Latest developments in school education',
      category: 'schools',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for schools news due to API error:', error.message);
    return mockSchools;
  }
};

export const getJobMarketNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: '"job market" OR "employment trends" OR "career development" OR "graduate employment" OR "workforce skills" OR "job opportunities"', 
      sortBy: 'publishedAt', 
      language: 'en',
      pageSize: 10
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Job Market Insights',
      description: item.description || 'Trends and opportunities in the employment market',
      category: 'jobs',
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      image: item.urlToImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for job market news due to API error:', error.message);
    return mockJobMarket;
  }
};

export const getFeaturedEducationNews = async () => {
  try {
    const response = await fetchNews('/everything', { 
      q: 'education OR "academic excellence" OR "educational innovation" OR "learning transformation" OR "educational technology"', 
      sortBy: 'relevancy', 
      language: 'en', 
      pageSize: 5 
    });
    
    return response.articles.map(item => ({
      id: item.url || Math.random().toString(),
      title: item.title || 'Featured Education News',
      description: item.description || 'Featured updates from the education sector',
      image: item.urlToImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop'
    }));
  } catch (error) {
    console.warn('Using mock data for featured education news due to API error:', error.message);
    // Combine samples from different categories for featured content
    return [
      {
        id: 101,
        title: 'The Future of Learning: AI-Powered Personalized Education',
        description: 'How artificial intelligence is revolutionizing education by enabling truly personalized learning experiences adapted to individual student needs.',
        image: 'https://images.unsplash.com/photo-1581089778245-3ce67677f718?q=80&w=1000&auto=format&fit=crop'
      },
      {
        id: 102,
        title: 'Global Education Summit Highlights Innovation in Teaching',
        description: 'Educational leaders from around the world gathered to share breakthrough approaches to teaching and learning in the digital age.',
        image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=1000&auto=format&fit=crop'
      },
      mockEducationNews[0],
      mockUniversities[0],
      mockSchools[0]
    ];
  }
}; 