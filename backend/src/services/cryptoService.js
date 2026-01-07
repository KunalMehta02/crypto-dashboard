const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const axiosInstance = axios.create({
  baseURL: COINGECKO_API,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

class CryptoService {
  // Get historical market data
  async getMarketChart(coinId, days = 7, currency = 'usd') {
    const cacheKey = `market_chart_${coinId}_${days}_${currency}`;
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axiosInstance.get(`/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: currency,
          days: days,
          interval: days <= 1 ? 'hourly' : 'daily'
        }
      });

      const data = {
        prices: response.data.prices,
        market_caps: response.data.market_caps,
        total_volumes: response.data.total_volumes
      };

      // Cache the response
      cache.set(cacheKey, data);
      return data;

    } catch (error) {
      console.error('Error fetching market chart:', error.message);
      throw new Error('Failed to fetch historical data');
    }
  }

  // Get top gainers
  async getTopGainers(limit = 1) {
    const cacheKey = `top_gainers_${limit}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axiosInstance.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'price_change_percentage_24h_desc',
          per_page: limit,
          page: 1,
          sparkline: false
        }
      });

      cache.set(cacheKey, response.data);
      return response.data;

    } catch (error) {
      console.error('Error fetching top gainers:', error.message);
      throw new Error('Failed to fetch top gainers');
    }
  }

  // Get top losers
  async getTopLosers(limit = 1) {
    const cacheKey = `top_losers_${limit}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axiosInstance.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'price_change_percentage_24h_asc',
          per_page: limit,
          page: 1,
          sparkline: false
        }
      });

      cache.set(cacheKey, response.data);
      return response.data;

    } catch (error) {
      console.error('Error fetching top losers:', error.message);
      throw new Error('Failed to fetch top losers');
    }
  }

  // Get list of cryptocurrencies for dropdown
  async getCoinList() {
    const cacheKey = 'coin_list';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axiosInstance.get('/coins/list', {
        params: {
          include_platform: false
        }
      });

      cache.set(cacheKey, response.data);
      return response.data;

    } catch (error) {
      console.error('Error fetching coin list:', error.message);
      throw new Error('Failed to fetch coin list');
    }
  }

  // Get current price for a specific coin
  async getCurrentPrice(coinId, currency = 'usd') {
    try {
      const response = await axiosInstance.get('/simple/price', {
        params: {
          ids: coinId,
          vs_currencies: currency,
          include_24h_change: true
        }
      });

      return response.data;

    } catch (error) {
      console.error('Error fetching current price:', error.message);
      throw new Error('Failed to fetch current price');
    }
  }
}

module.exports = new CryptoService();