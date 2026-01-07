const cryptoService = require('../services/cryptoService');

exports.getMarketChart = async (req, res) => {
  try {
    const { coinId } = req.params;
    const { days = 7, currency = 'usd' } = req.query;

    if (!coinId) {
      return res.status(400).json({ error: 'Coin ID is required' });
    }

    const data = await cryptoService.getMarketChart(coinId, days, currency);
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopGainers = async (req, res) => {
  try {
    const { limit = 1 } = req.query;
    const data = await cryptoService.getTopGainers(parseInt(limit));
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopLosers = async (req, res) => {
  try {
    const { limit = 1 } = req.query;
    const data = await cryptoService.getTopLosers(parseInt(limit));
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCoinList = async (req, res) => {
  try {
    const data = await cryptoService.getCoinList();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentPrice = async (req, res) => {
  try {
    const { coinId } = req.params;
    const { currency = 'usd' } = req.query;

    if (!coinId) {
      return res.status(400).json({ error: 'Coin ID is required' });
    }

    const data = await cryptoService.getCurrentPrice(coinId, currency);
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};