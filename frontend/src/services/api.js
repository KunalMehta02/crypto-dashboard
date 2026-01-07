import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// CoinGecko API service
export const cryptoAPI = {
  // Get market chart data
  getMarketChart: (coinId, days = 7) => 
    api.get(`/crypto/market-chart/${coinId}?days=${days}`),

  // Get top gainers
  getTopGainers: (limit = 1) => 
    api.get(`/crypto/top-gainers?limit=${limit}`),

  // Get top losers
  getTopLosers: (limit = 1) => 
    api.get(`/crypto/top-losers?limit=${limit}`),

  // Get coin list for dropdown
  getCoinList: () => 
    api.get('/crypto/coin-list'),

  // Get current price
  getCurrentPrice: (coinId) => 
    api.get(`/crypto/current-price/${coinId}`),
};

// Error handler
export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    throw new Error(error.response.data.error || 'API Error');
  } else if (error.request) {
    console.error('Network Error:', error.request);
    throw new Error('Network error. Please check your connection.');
  } else {
    console.error('Error:', error.message);
    throw new Error('An unexpected error occurred.');
  }
};