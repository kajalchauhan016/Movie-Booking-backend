const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: [String],
      required: true,
    },

    language: {
      type: [String],
      required: true,
    },

    duration: {
      type: Number, 
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    posterUrl: {
      type: String,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
