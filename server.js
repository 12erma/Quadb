const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const Ticker = require('./models/Ticker');
const dataRoute = require('./routes/dataRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', dataRoute);

// MongoDB connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/hodlinfo';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Fetch top 10 data from the API and store it in MongoDB
const fetchAndStoreData = async () => {
  try {
    // Fetch data from WazirX API
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10); // Get top 10 results

    // Clear existing data in MongoDB
    await Ticker.deleteMany({});

    // Save new data to MongoDB
    await Ticker.insertMany(
      tickers.map((item) => ({
        name: item.name,
        last: item.last,
        buy: item.buy,
        sell: item.sell,
        volume: item.volume,
        base_unit: item.base_unit,
        low: item.low,
        high: item.high,
        
      }))
    );

    console.log('Top 10 ticker data stored in MongoDB successfully!');
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  }
};

// Start the server
const startServer = async () => {
  try {
    // Fetch and store data in MongoDB
    await fetchAndStoreData();

    // Start the server
    app.listen(3001, () => {
      console.log('Server running on http://localhost:3001');
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();
