const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  subTotal: {
    type: Number,
  },
});

const ticket = mongoose.model("Tickets", ticketSchema);
module.exports = ticket;
