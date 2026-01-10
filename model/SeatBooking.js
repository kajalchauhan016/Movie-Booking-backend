

const mongoose = require("mongoose");

const seatBookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  showDate: String,
  showTime: String,
  seats: [String],
  userName: String,
  totalAmount: Number
});

module.exports = mongoose.model("Booking", seatBookingSchema);
