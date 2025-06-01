import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar,
  Chip,
  Tooltip,
  Drawer,
  Fab,
  Divider,
  Button,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { 
  Send as SendIcon, 
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  PauseCircle as PauseIcon,
  PlayCircle as PlayIcon,
  Info as InfoIcon,
  Article as ArticleIcon,
  Notifications as NotificationsIcon,
  Mic as MicIcon
} from '@mui/icons-material';
import { getBusinessNews, getStockMarket, getCryptocurrency, getPersonalFinance } from '../../utils/businessAPI';
import { 
  getTopHeadlines, 
  getEverything, 
  getNewsByCategory,
  getNewsBySearchTerm,
  getGeneralNews,
  getTrendingNews,
  getPoliticsNews,
  getTechnologyNews,
  getHealthNews,
  getScienceNews,
  getSmartNews,
  extractKeywords,
  CATEGORIES,
  COUNTRIES,
  CATEGORY_KEYWORDS
} from '../../utils/newsAPI';
import { getSportsHeadlines } from '../../utils/sportsAPI';

// Get time-appropriate greeting
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Initial greeting messages from Tessa
const getInitialMessages = () => {
  const timeGreeting = getTimeBasedGreeting();
  return [
    {
      sender: 'tessa',
      text: `${timeGreeting}! I'm Tessa, your personal news assistant.`,
      timestamp: new Date()
    },
    {
      sender: 'tessa',
      text: 'I can help you find and read news articles on any topic. Just ask me about business, sports, politics, technology, health, science, or any other topic you\'re interested in!',
      timestamp: new Date()
    },
    {
      sender: 'tessa',
      text: 'Try saying "Show me the latest news", "What\'s happening in technology?", or "Find news about climate change"',
      timestamp: new Date() 
    }
  ];
};

// Voice pulse animation component for listening state
const VoicePulse = ({ isListening }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 120,
        mt: 2,
        mb: 2
      }}
    >
      {isListening && (
        <Box sx={{ position: 'relative', width: 120, height: 120 }}>
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 40 + i * 30,
                height: 40 + i * 30,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                opacity: 0.3 - i * 0.1,
                animation: `pulse ${1 + i * 0.2}s infinite ease-in-out`
              }}
            />
          ))}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              zIndex: 1
            }}
          >
            <MicIcon fontSize="large" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

// Define keyframes for pulse animation in a style tag
const PulseAnimation = () => (
  <style>{`
    @keyframes pulse {
      0% {
        transform: translate(-50%, -50%) scale(0.95);
        opacity: 0.5;
      }
      50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.3;
      }
      100% {
        transform: translate(-50%, -50%) scale(0.95);
        opacity: 0.5;
      }
    }
  `}</style>
);

const ArticleCard = ({ article, onClick }) => {
  return (
    <Paper 
      elevation={2}
      sx={{
        p: 1.5,
        mb: 1.5,
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3
        }
      }}
      onClick={() => onClick(article)}
    >
      <Box sx={{ display: 'flex', mb: 1 }}>
        {article.image && (
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              mr: 1.5, 
              flexShrink: 0,
              backgroundImage: `url(${article.image || '/placeholder-news.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 1
            }}
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5, lineHeight: 1.2 }}>
            {article.title}
          </Typography>
          {article.source && (
            <Chip 
              label={article.source} 
              size="small" 
              sx={{ mb: 0.5, maxWidth: '100%', height: 20, fontSize: '0.7rem' }}
            />
          )}
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ 
        display: '-webkit-box', 
        WebkitLineClamp: 2, 
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxHeight: '2.6em'
      }}>
        {article.description}
      </Typography>
    </Paper>
  );
};

// Function to track and store previously shown articles to avoid repetition
const Tessa = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(getInitialMessages());
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [newsFeed, setNewsFeed] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [shownArticles, setShownArticles] = useState(new Set()); // Track shown articles
  const messagesEndRef = useRef(null);
  const speechSynthesisRef = useRef(null);
  const recognitionRef = useRef(null);
  
  // Check for speech synthesis support
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      console.warn('Your browser does not support speech synthesis');
      setSpeechEnabled(false);
    }
    
    // Initialize speech recognition if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
        // Submit message after a short delay
        setTimeout(() => {
          handleVoiceSubmit(transcript);
        }, 500);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }
    
    // Clean up any ongoing speech when component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Auto scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Fetch initial news feed
  useEffect(() => {
    const fetchInitialNews = async () => {
      try {
        const headlines = await getTopHeadlines({ country: 'us', pageSize: 5 });
        if (headlines && headlines.articles) {
          setNewsFeed(headlines.articles.map((article, index) => ({
            id: index,
            title: article.title,
            source: article.source?.name || 'News Source',
            description: article.description,
            url: article.url,
            category: 'headlines'
          })));
        }
      } catch (error) {
        console.error('Failed to fetch initial news:', error);
      }
    };
    
    fetchInitialNews();
  }, []);

  // Helper function to speak text
  const speakText = (text) => {
    if (!speechEnabled || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Force voice selection to happen after voices are loaded
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a female voice with more specific criteria
      let femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Victoria') ||
        voice.name.includes('Zira') ||
        voice.name.includes('Google UK English Female') ||
        voice.name.includes('Microsoft Zira')
      );
      
      // If no female voice found by name, try by checking voice.gender property if available
      if (!femaleVoice) {
        femaleVoice = voices.find(voice => voice.gender === 'female');
      }
      
      // If still no female voice, look for any voice with 'en-US', 'en-GB' locale and not containing 'male'
      if (!femaleVoice) {
        femaleVoice = voices.find(voice => 
          (voice.lang === 'en-US' || voice.lang === 'en-GB') && 
          !voice.name.toLowerCase().includes('male')
        );
      }
      
      if (femaleVoice) {
        console.log('Using female voice:', femaleVoice.name);
        utterance.voice = femaleVoice;
      } else if (voices.length > 0) {
        // Last resort: just use the first available voice
        console.log('No female voice found, using:', voices[0].name);
        utterance.voice = voices[0];
      }
      
      // Enhance female characteristics
      utterance.pitch = 1.2;  // Slightly higher pitch for female voice
      utterance.rate = 1.0;   // Normal speed
      utterance.volume = 1.0; // Full volume
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
    };
    
    // If voices are already loaded, set voice immediately
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoice();
    } else {
      // Otherwise wait for voices to be loaded
      window.speechSynthesis.onvoiceschanged = setVoice;
    }
    
    // Event handlers
    utterance.onstart = () => {
      setSpeaking(true);
      speechSynthesisRef.current = utterance;
    };
    
    utterance.onend = () => {
      setSpeaking(false);
      speechSynthesisRef.current = null;
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setSpeaking(false);
      speechSynthesisRef.current = null;
    };
  };
  
  // Stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      speechSynthesisRef.current = null;
    }
  };

  // Toggle speaking on/off
  const toggleSpeechEnabled = () => {
    if (speaking) {
      stopSpeaking();
    }
    setSpeechEnabled(!speechEnabled);
  };
  
  // Start listening for voice input
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        setListening(true);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setListening(false);
      }
    }
  };
  
  // Handle voice submitted message
  const handleVoiceSubmit = (transcript) => {
    if (!transcript.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      sender: 'user',
      text: transcript,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Process the message and generate a response
    processUserMessage(transcript);
  };
  
  // Function to filter out previously shown articles to ensure diversity
  const getFilteredArticles = (articles = []) => {
    if (!articles || articles.length === 0) return [];
    
    // Filter out articles we've already shown before
    const filteredArticles = articles.filter(article => {
      // Create a unique identifier for the article
      const articleId = article.url || `${article.title}-${article.description?.substring(0, 20)}`;
      return !shownArticles.has(articleId);
    });
    
    // If we have new articles, return those
    if (filteredArticles.length > 0) {
      // Update shown articles set with the new articles we're going to show
      const newShownArticles = new Set(shownArticles);
      filteredArticles.forEach(article => {
        const articleId = article.url || `${article.title}-${article.description?.substring(0, 20)}`;
        newShownArticles.add(articleId);
      });
      
      // Limit the set size to prevent memory issues (keep last 100 shown articles)
      if (newShownArticles.size > 100) {
        const entries = Array.from(newShownArticles);
        const newSet = new Set(entries.slice(entries.length - 100));
        setShownArticles(newSet);
      } else {
        setShownArticles(newShownArticles);
      }
      
      return filteredArticles;
    }
    
    // If all articles have been shown before, return the original list
    // but still track them to avoid the same ones in the future
    articles.forEach(article => {
      const articleId = article.url || `${article.title}-${article.description?.substring(0, 20)}`;
      shownArticles.add(articleId);
    });
    
    return articles;
  };
  
  // Process user messages and generate responses
  const processUserMessage = async (userMessage) => {
    setLoading(true);
    let botResponse = '';
    let articlesToShow = [];
    
    // Convert message to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Check for different intent patterns
    if (message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
      const timeGreeting = getTimeBasedGreeting();
      botResponse = `${timeGreeting}! How can I help you with news today?`;
    }
    else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const timeGreeting = getTimeBasedGreeting();
      botResponse = `${timeGreeting}! How can I help you with news today?`;
    } 
    else if (message.includes('what time is it') || message.includes('what is the time') || message.includes('current time')) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      botResponse = `The current time is ${timeString}. Would you like to hear the latest news?`;
    }
    else if (message.includes('what day is it') || message.includes('what is the date') || message.includes('current date') || message.includes('today\'s date')) {
      const now = new Date();
      const dateString = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      botResponse = `Today is ${dateString}. Would you like to hear today's top stories?`;
    }
    else if (message.includes('help') || message.includes('what can you do')) {
      botResponse = "I can help you find and read news articles. Try asking for news by category like 'business news', 'sports news', etc. You can also ask me to read an article for you.";
    }
    // Handle generic news request
    else if ((message.includes('news') || message.includes('headlines') || message.includes('latest')) && 
            !message.includes('business') && !message.includes('sports') && 
            !message.includes('technology') && !message.includes('entertainment') && 
            !message.includes('politics') && !message.includes('health') && 
            !message.includes('science')) {
      try {
        const generalNews = await getGeneralNews('us', 8);
        articlesToShow = generalNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'general',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest news headlines. Is there any specific category you'd like to explore further?";
      } catch (error) {
        console.error('Error fetching general news:', error);
        botResponse = "I'm sorry, I couldn't fetch the latest news at the moment. Please try again later.";
      }
    }
    else if (message.includes('business') || message.includes('economy') || message.includes('market')) {
      try {
        const businessNews = await getNewsByCategory('business', 'us', 8);
        articlesToShow = businessNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'business',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest business news articles. Click on any article to read more, or ask me to read it for you.";
      } catch (error) {
        console.error('Error fetching business news:', error);
        botResponse = "I'm sorry, I couldn't fetch business news at the moment. Please try again later.";
      }
    }
    else if (message.includes('stock') || message.includes('market')) {
      try {
        const stockNews = await getNewsBySearchTerm('stock market finance', 8);
        articlesToShow = stockNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'stocks',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest stock market updates. Would you like me to read any of these articles for you?";
      } catch (error) {
        console.error('Error fetching stock market news:', error);
        botResponse = "I'm sorry, I couldn't fetch stock market news at the moment. Please try again later.";
      }
    }
    else if (message.includes('crypto') || message.includes('bitcoin') || message.includes('cryptocurrency')) {
      try {
        const cryptoNews = await getNewsBySearchTerm('cryptocurrency bitcoin', 8);
        articlesToShow = cryptoNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'crypto',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest cryptocurrency news. Anything specific you'd like to know about?";
      } catch (error) {
        console.error('Error fetching crypto news:', error);
        botResponse = "I'm sorry, I couldn't fetch cryptocurrency news at the moment. Please try again later.";
      }
    }
    else if (message.includes('sports') || message.includes('game') || message.includes('match')) {
      try {
        const sportsNews = await getNewsByCategory('sports', 'us', 8);
        articlesToShow = sportsNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'sports',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest sports news. Would you like me to read any of these for you?";
      } catch (error) {
        console.error('Error fetching sports news:', error);
        botResponse = "I'm sorry, I couldn't fetch sports news at the moment. Please try again later.";
      }
    }
    else if (message.includes('technology') || message.includes('tech') || message.includes('gadget')) {
      try {
        const techNews = await getTechnologyNews('us');
        articlesToShow = techNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'technology',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest technology news articles. Anything specific you'd like to know about?";
      } catch (error) {
        console.error('Error fetching technology news:', error);
        botResponse = "I'm sorry, I couldn't fetch technology news at the moment. Please try again later.";
      }
    }
    else if (message.includes('politics') || message.includes('government') || message.includes('election')) {
      try {
        const politicsNews = await getPoliticsNews('us');
        articlesToShow = politicsNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'politics',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest political news stories. Would you like me to read any of these for you?";
      } catch (error) {
        console.error('Error fetching politics news:', error);
        botResponse = "I'm sorry, I couldn't fetch politics news at the moment. Please try again later.";
      }
    }
    else if (message.includes('health') || message.includes('medical') || message.includes('healthcare')) {
      try {
        const healthNews = await getHealthNews('us');
        articlesToShow = healthNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'health',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest health news stories. Would you like me to read any of these for you?";
      } catch (error) {
        console.error('Error fetching health news:', error);
        botResponse = "I'm sorry, I couldn't fetch health news at the moment. Please try again later.";
      }
    }
    else if (message.includes('science') || message.includes('research') || message.includes('discovery')) {
      try {
        const scienceNews = await getScienceNews('us');
        articlesToShow = scienceNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'science',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        botResponse = "Here are the latest science news stories. Would you like me to read any of these for you?";
      } catch (error) {
        console.error('Error fetching science news:', error);
        botResponse = "I'm sorry, I couldn't fetch science news at the moment. Please try again later.";
      }
    }
    // Handle specific search terms
    else if (message.includes('search for') || message.includes('find news about') || message.includes('articles about')) {
      try {
        // Extract search query
        let searchQuery = message;
        if (message.includes('search for')) {
          searchQuery = message.split('search for')[1].trim();
        } else if (message.includes('find news about')) {
          searchQuery = message.split('find news about')[1].trim();
        } else if (message.includes('articles about')) {
          searchQuery = message.split('articles about')[1].trim();
        }
        
        // Get news by search term
        const searchNews = await getNewsBySearchTerm(searchQuery, 8);
        articlesToShow = searchNews.articles.map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description || 'No description available',
          category: 'search',
          url: article.url,
          source: article.source?.name,
          image: article.urlToImage
        }));
        
        botResponse = `Here are news articles about "${searchQuery}". Would you like me to read any of these for you?`;
      } catch (error) {
        console.error('Error fetching search news:', error);
        botResponse = "I'm sorry, I couldn't find news about that topic at the moment. Please try another search term.";
      }
    }
    else if (message.includes('read') && (message.includes('article') || message.includes('news'))) {
      if (currentArticle) {
        botResponse = `Reading: ${currentArticle.title}. ${currentArticle.description || ''}`;
        // We'll speak this later after adding the message
      } else if (newsFeed.length > 0) {
        setCurrentArticle(newsFeed[0]);
        botResponse = `Reading: ${newsFeed[0].title}. ${newsFeed[0].description || ''}`;
        // We'll speak this later after adding the message
      } else {
        botResponse = "I don't have any articles to read at the moment. Try asking for some news first.";
      }
    }
    else if (message.includes('stop') && message.includes('read')) {
      stopSpeaking();
      botResponse = "I've stopped reading.";
    }
    else {
      // Try smart news search for unrecognized queries
      try {
        // Extract keywords and analyze user query
        const { keywords, detectedCategory, queryString } = extractKeywords(message);
        
        // If we found meaningful keywords, use them
        if (keywords.length > 0) {
          const smartResults = await getSmartNews(message, 8);
          
          if (smartResults && smartResults.articles && smartResults.articles.length > 0) {
            articlesToShow = smartResults.articles.map((article, index) => ({
              id: index,
              title: article.title,
              description: article.description || 'No description available',
              category: detectedCategory || 'general',
              url: article.url,
              source: article.source?.name,
              image: article.urlToImage
            }));
            
            // Create more personalized response based on the detected keywords
            const topKeyword = keywords[0] ? `"${keywords[0]}"` : "this topic";
            
            if (detectedCategory) {
              botResponse = `I found some ${detectedCategory} news related to ${topKeyword}. Would you like me to read any of these articles?`;
            } else {
              botResponse = `Here are some news articles about ${topKeyword}. Would you like me to read any of these for you?`;
            }
          } else {
            botResponse = `I couldn't find any recent news about ${keywords.slice(0, 2).join(' and ')}. Would you like to try another topic?`;
          }
        } else {
          // No meaningful keywords found
          botResponse = "I'm not sure what you're looking for. Try asking about specific news categories like business, sports, or technology. Or ask me to search for a particular topic.";
        }
      } catch (error) {
        console.error('Error processing query:', error);
        botResponse = "I'm not sure how to respond to that. Try asking me about news categories like business, sports, or technology. Or ask me to read an article for you.";
      }
    }
    
    // Filter articles to ensure diversity before displaying them
    if (articlesToShow.length > 0) {
      const filteredArticles = getFilteredArticles(articlesToShow);
      
      // If filtering reduced our results too much, get more articles
      if (filteredArticles.length < 3 && articlesToShow.length >= 5) {
        try {
          // Try to fetch more related articles
          const { keywords } = extractKeywords(message);
          if (keywords.length > 0) {
            const additionalResults = await getSmartNews(keywords.join(' '), 5);
            if (additionalResults?.articles?.length > 0) {
              const additionalArticles = additionalResults.articles.map((article, index) => ({
                id: index + 1000, // Ensure unique IDs
                title: article.title,
                description: article.description || 'No description available',
                category: articlesToShow[0]?.category || 'general',
                url: article.url,
                source: article.source?.name,
                image: article.urlToImage
              }));
              
              // Add new articles to our filtered list
              filteredArticles.push(...getFilteredArticles(additionalArticles));
            }
          }
        } catch (error) {
          console.warn('Error fetching additional articles:', error);
        }
      }
      
      // Update articlesToShow with our filtered list
      articlesToShow = filteredArticles;
    }
    
    // Add bot response to messages
    const botMessage = {
      sender: 'tessa',
      text: botResponse,
      timestamp: new Date(),
      articles: articlesToShow.length > 0 ? articlesToShow : undefined
    };
    
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
    
    // If we have new articles to show, update the news feed
    if (articlesToShow.length > 0) {
      setNewsFeed(articlesToShow);
    }
    
    // Speak the response if speech is enabled
    if (speechEnabled && botResponse && !botResponse.includes("Here are")) {
      speakText(botResponse);
    }
    
    // If this is a read request and we have a current article, speak the article
    if (message.includes('read') && (currentArticle || (newsFeed.length > 0 && articlesToShow.length === 0))) {
      const articleToRead = currentArticle || newsFeed[0];
      if (articleToRead && speechEnabled) {
        speakText(`${articleToRead.title}. ${articleToRead.description || ''}`);
      }
    }
  };

  // Handle user sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Process the message and generate a response
    processUserMessage(input);
  };

  // Handle user clicking on an article
  const handleArticleClick = (article) => {
    setCurrentArticle(article);
    
    // If the article has a URL, open it in a new tab
    if (article.url) {
      window.open(article.url, '_blank');
      
      // Add a message about opening the article
      const botMessage = {
        sender: 'tessa',
        text: `I've opened the article "${article.title}" in a new tab for you. Would you like me to summarize it or find more articles on this topic?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Speak the message if speech is enabled
      if (speechEnabled) {
        speakText(botMessage.text);
      }
      
      return;
    }
    
    // If no URL (e.g. for older format articles), just read the article
    if (speechEnabled) {
      const textToRead = `${article.title}. ${article.description || 'No further details available.'}`;
      speakText(textToRead);
      
      // Add a message about reading the article
      const botMessage = {
        sender: 'tessa',
        text: `Reading article: ${article.title}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } else {
      // If speech is not enabled, prompt to enable it
      const botMessage = {
        sender: 'tessa',
        text: `I can read this article to you if you enable text-to-speech. Would you like me to enable it?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }
  };

  // Toggle the chatbot drawer
  const toggleDrawer = () => {
    setOpen(!open);
    if (!open && messages.length === 3 && speechEnabled) {
      // If opening for the first time, speak the greeting with time-sensitive message
      const timeGreeting = getTimeBasedGreeting();
      setTimeout(() => {
        speakText(`${timeGreeting}! I'm Tessa, your virtual chatbot to guide you with the latest news updates. How may I help you today?`);
      }, 300);
    }
  };

  // Replace the renderMessage function with this improved version
  const renderMessage = (message) => {
    return (
      <ListItem 
        key={message.timestamp.getTime()} 
        alignItems="flex-start"
        sx={{ 
          flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
          mb: 2
        }}
      >
        <ListItemAvatar>
          <Avatar 
            sx={{ 
              bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main'
            }}
          >
            {message.sender === 'user' ? 'U' : 'T'}
          </Avatar>
        </ListItemAvatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%'
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.100',
              color: message.sender === 'user' ? 'white' : 'text.primary'
            }}
          >
            <Typography variant="body1">{message.text}</Typography>
          </Paper>
          
          {message.articles && message.articles.length > 0 && (
            <Box sx={{ mt: 1, width: '100%' }}>
              {message.articles.slice(0, 5).map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  onClick={handleArticleClick}
                />
              ))}
              {message.articles.length > 5 && (
                <Button 
                  variant="text" 
                  size="small" 
                  sx={{ mt: 1 }} 
                  onClick={() => setNewsFeed(message.articles)}
                >
                  View {message.articles.length - 5} more articles
                </Button>
              )}
            </Box>
          )}
          
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              mt: 0.5,
              alignSelf: message.sender === 'user' ? 'flex-start' : 'flex-end'
            }}
          >
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
      </ListItem>
    );
  };

  return (
    <>
      {/* Animation keyframes */}
      <PulseAnimation />
      
      {/* Translucent backdrop when listening */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
        open={listening}
      />
      
      {/* Floating action button to open chatbot */}
      <Fab 
        color="primary" 
        aria-label="chat with assistant"
        onClick={toggleDrawer}
        sx={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20,
          zIndex: 1000,
          width: 65,
          height: 65,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Avatar
          alt="Tessa"
          sx={{ 
            width: 60, 
            height: 60,
            animation: open ? 'none' : 'pulse 2s infinite',
            bgcolor: 'secondary.main'
          }}
        >
          T
        </Avatar>
      </Fab>
      
      {/* Chatbot drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { 
            width: { xs: '100%', sm: 400 },
            maxWidth: '100%'
          }
        }}
      >
        {/* Chat header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid #eeeeee'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              alt="Tessa" 
              sx={{ mr: 2, bgcolor: 'secondary.main' }}
            >
              T
            </Avatar>
            <Box>
              <Typography variant="h6">Tessa</Typography>
              <Typography variant="caption" color="text.secondary">
                Your News Assistant
              </Typography>
            </Box>
          </Box>
          <Box>
            <Tooltip title={speechEnabled ? "Mute" : "Unmute"}>
              <IconButton onClick={toggleSpeechEnabled} color={speechEnabled ? "primary" : "default"}>
                {speechEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
              </IconButton>
            </Tooltip>
            {speaking && (
              <Tooltip title="Stop Reading">
                <IconButton onClick={stopSpeaking} color="secondary">
                  <PauseIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Close">
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        {/* Listening animation */}
        {listening && <VoicePulse isListening={listening} />}
        
        {/* Chat messages */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            p: 2, 
            bgcolor: '#f5f5f5', 
            display: 'flex', 
            flexDirection: 'column',
            height: listening ? 'calc(100vh - 300px)' : 'calc(100vh - 140px)'
          }}
        >
          <List>
            {messages.map((message) => renderMessage(message))}
            {loading && (
              <ListItem>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ mr: 2 }} />
                  <Typography variant="body2">Tessa is thinking...</Typography>
                </Box>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        
        {/* Input area */}
        <Box 
          component="form" 
          onSubmit={handleSendMessage} 
          sx={{ 
            p: 2, 
            borderTop: '1px solid #eeeeee',
            display: 'flex'
          }}
        >
          <TextField
            fullWidth
            placeholder="Ask me about the news..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            autoComplete="off"
            disabled={loading || listening}
            size="small"
          />
          <IconButton 
            color="primary"
            disabled={listening}
            onClick={startListening}
            sx={{ ml: 1 }}
          >
            <MicIcon />
          </IconButton>
          <IconButton 
            type="submit" 
            color="primary" 
            disabled={!input.trim() || loading || listening}
            sx={{ ml: 1 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
};

export default Tessa; 