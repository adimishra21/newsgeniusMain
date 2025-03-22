// API configuration
const RAPIDAPI_KEY = '8da6ce4041msh9e68d2bca239741p1b0193jsn011b2b2aaa95';
const RAPIDAPI_HOST = 'fuel-price-api-india-diesel-petrol-price-api-free.p.rapidapi.com';

// Function to fetch fuel prices from the API
export const getFuelPrices = async () => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch('https://fuel-price-api-india-diesel-petrol-price-api-free.p.rapidapi.com/nixinfo.in/daily-fuel-price-api-india', {
      ...options,
      body: JSON.stringify({
        key1: 'value',
        key2: 'value'
      })
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    // Transform API response to match our app's data structure
    const transformedData = {};
    
    // The structure of the real API response may differ
    // Adjust the parsing logic based on the actual response
    if (data && data.fuelPrices) {
      data.fuelPrices.forEach(item => {
        transformedData[item.state] = {
          petrol: parseFloat(item.petrol) || 0,
          diesel: parseFloat(item.diesel) || 0,
          lastUpdated: item.lastUpdated || new Date().toLocaleString('en-IN')
        };
      });
    }

    // If no valid data is found, use fallback data
    if (Object.keys(transformedData).length === 0) {
      return getFallbackData();
    }

    return transformedData;
  } catch (error) {
    console.error('Error fetching fuel prices:', error);
    return getFallbackData();
  }
};

// Fallback data in case the API fails
const getFallbackData = () => {
  return {
    Maharashtra: {
      petrol: 106.31,
      diesel: 94.27,
      lastUpdated: new Date().toLocaleString('en-IN')
    },
    Delhi: {
      petrol: 96.72,
      diesel: 89.62,
      lastUpdated: new Date().toLocaleString('en-IN')
    },
    Karnataka: {
      petrol: 101.94,
      diesel: 87.89,
      lastUpdated: new Date().toLocaleString('en-IN')
    },
    'Tamil Nadu': {
      petrol: 102.63,
      diesel: 94.24,
      lastUpdated: new Date().toLocaleString('en-IN')
    },
    Gujarat: {
      petrol: 96.63,
      diesel: 92.38,
      lastUpdated: new Date().toLocaleString('en-IN')
    }
  };
};

// Function to get fuel price for a specific state
export const getStateFuelPrice = async (state) => {
  try {
    const allPrices = await getFuelPrices();
    return allPrices[state] || null;
  } catch (error) {
    throw new Error(`Failed to fetch fuel price for ${state}`);
  }
}; 