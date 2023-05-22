const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const movie = mongoose.model("Movies", movieSchema);
module.exports = movie;
