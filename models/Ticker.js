const mongoose = require('mongoose');

// Define Ticker schema
const TickerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last: { type: Number, required: true, min: 0 },
  buy: { type: Number, required: true, min: 0 },
  sell: { type: Number, required: true, min: 0 },
  volume: { type: Number, required: true, min: 0 },
  base_unit: { type: String, required: true }, // Changed to String
  low: { type: Number, required: true, min: 0 },
  high: { type: Number, required: true, min: 0 },
});

// Create the Ticker model
const Ticker = mongoose.model('Ticker', TickerSchema);

module.exports = Ticker;