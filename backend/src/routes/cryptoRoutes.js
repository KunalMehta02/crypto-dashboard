const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

// Market chart data
router.get('/market-chart/:coinId', cryptoController.getMarketChart);

// Top gainers
router.get('/top-gainers', cryptoController.getTopGainers);

// Top losers
router.get('/top-losers', cryptoController.getTopLosers);

// Coin list for dropdown
router.get('/coin-list', cryptoController.getCoinList);

// Current price
router.get('/current-price/:coinId', cryptoController.getCurrentPrice);

module.exports = router;