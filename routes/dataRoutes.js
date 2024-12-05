const express = require('express');
const Ticker = require('../models/Ticker');

const router = express.Router();

// Route to get all tickers
router.get('/tickers', async (req, res) => {
  try {
    const tickers = await Ticker.find(); // Fetch all tickers from MongoDB
    res.json(tickers);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch ticker data' });
  }
});

module.exports = router;
