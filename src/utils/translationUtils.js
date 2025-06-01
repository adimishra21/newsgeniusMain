// Translation utilities for NewsGenius

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' }
];

// Default language
export const DEFAULT_LANGUAGE = 'en';

/**
 * Translate text to the target language
 * In a production environment, this would use a translation API
 * For demo, we'll use mock translations for Hindi
 */
export const translateText = async (text, targetLanguage) => {
  if (!text) return '';
  if (targetLanguage === DEFAULT_LANGUAGE) return text;
  
  // In a real implementation, this would call a translation API
  // For demonstration purposes, we're using a simulated delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (targetLanguage === 'hi') {
        // For Hindi, provide a few sample translations for common words/phrases
        resolve(mockHindiTranslation(text));
      } else {
        // For other languages, just append a language indicator
        resolve(`[${targetLanguage.toUpperCase()}] ${text}`);
      }
    }, 300);
  });
};

/**
 * Translate article content to target language
 */
export const translateArticle = async (article, targetLanguage) => {
  if (!article) return null;
  if (targetLanguage === DEFAULT_LANGUAGE) return article;
  
  try {
    // Translate title and description
    const [translatedTitle, translatedDescription] = await Promise.all([
      translateText(article.title, targetLanguage),
      translateText(article.description, targetLanguage)
    ]);
    
    // Return a new object with translated content
    return {
      ...article,
      title: translatedTitle,
      description: translatedDescription,
      // Keep track of the translated language
      translatedLanguage: targetLanguage
    };
  } catch (error) {
    console.error('Translation error:', error);
    return article;
  }
};

/**
 * Simple mock Hindi translations for demo purposes
 */
const mockHindiTranslation = (text) => {
  // Common English words/phrases with Hindi translations
  const translations = {
    'news': 'समाचार',
    'india': 'भारत',
    'indian': 'भारतीय',
    'sports': 'खेल',
    'cricket': 'क्रिकेट',
    'technology': 'प्रौद्योगिकी',
    'business': 'व्यापार',
    'entertainment': 'मनोरंजन',
    'politics': 'राजनीति',
    'movie': 'फिल्म',
    'cinema': 'सिनेमा',
    'bollywood': 'बॉलीवुड',
    'economy': 'अर्थव्यवस्था',
    'government': 'सरकार',
    'prime minister': 'प्रधानमंत्री',
    'election': 'चुनाव',
    'weather': 'मौसम',
    'stock market': 'शेयर बाजार',
    'science': 'विज्ञान',
    'health': 'स्वास्थ्य',
    'education': 'शिक्षा',
    'report': 'रिपोर्ट',
    'latest': 'नवीनतम',
    'breaking': 'ताजा',
    'update': 'अपडेट',
    'world': 'विश्व',
    'international': 'अंतरराष्ट्रीय',
    'wins': 'जीतता है',
    'budget': 'बजट',
    'announced': 'घोषित',
    'team': 'टीम',
    'match': 'मैच',
    'series': 'श्रृंखला',
    'summit': 'शिखर सम्मेलन',
    'conference': 'सम्मेलन',
    'record': 'रिकॉर्ड',
    'film': 'फिल्म',
    'mission': 'मिशन',
    'research': 'अनुसंधान',
    'study': 'अध्ययन',
    'space': 'अंतरिक्ष',
    'ISRO': 'इसरो',
    'monsoon': 'मानसून',
    'rain': 'बारिश',
    'temperature': 'तापमान',
    'season': 'मौसम',
    'festival': 'त्योहार',
    'victory': 'जीत',
    'award': 'पुरस्कार',
    'achievement': 'उपलब्धि',
    'minister': 'मंत्री',
    'actor': 'अभिनेता',
    'actress': 'अभिनेत्री',
    'director': 'निर्देशक',
    'producer': 'निर्माता',
    'company': 'कंपनी',
    'industry': 'उद्योग',
    'CEO': 'सीईओ',
    'launch': 'लॉन्च',
    'develop': 'विकसित',
    'market': 'बाजार',
    'profit': 'लाभ',
    'loss': 'नुकसान',
    'rise': 'वृद्धि',
    'fall': 'गिरावट',
    'increase': 'बढ़ोतरी',
    'decrease': 'कमी',
    'growth': 'विकास',
    'recession': 'मंदी',
    'inflation': 'महंगाई',
    'investment': 'निवेश',
    'policy': 'नीति',
    'reform': 'सुधार',
    'tax': 'कर',
    'revenue': 'राजस्व',
    'expense': 'व्यय',
    'deficit': 'घाटा',
    'surplus': 'अधिशेष',
    'announcement': 'घोषणा',
    'ceremony': 'समारोह',
    'event': 'कार्यक्रम',
    'home': 'होम',
    'loading': 'लोड हो रहा है',
    'error': 'त्रुटि',
    'no articles found': 'कोई लेख नहीं मिला',
    'comments': 'टिप्पणियां',
    'delete': 'हटाएं',
    'cancel': 'रद्द करें',
    'add a comment': 'टिप्पणी जोड़ें',
    'unknown user': 'अज्ञात उपयोगकर्ता',
    'invalid article data': 'अमान्य लेख डेटा'
  };

  // Attempt to translate words based on the dictionary
  let translatedText = text;
  
  // Replace all occurrences of each word/phrase in the translations object
  Object.keys(translations).forEach(englishWord => {
    // Create a regex that matches the whole word with word boundaries
    const regex = new RegExp(`\\b${englishWord}\\b`, 'gi');
    translatedText = translatedText.replace(regex, translations[englishWord]);
  });
  
  return translatedText;
}; 