const Movie = require("../model/MovieModel");
// const Show = require("../model/SeatModel");
// const createSeats = require("../utils/createSeats");

const Booking = require("../model/SeatBooking");
// const Movie = require("../models/MovieModel");


exports.addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      language,
      duration,
      releaseDate,
      posterUrl,
      rating,
      status,
    } = req.body;

    const movie = await Movie.create({
      title,
      description,
      genre,
      language,
      duration,
      releaseDate,
      posterUrl,
      rating,
      status,
    });

   res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: movie,
    });
  } catch (error) {
    console.error("Add Movie Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,   
      errors: error.errors || null,
    });
  }
};
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (!movies) {
      return res.status(4004).json({ mssg: "movies not found" });
    } else {
      return res
        .status(200)
        .json({ mssg: "All movies", data: movies, success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error getting movie",
    });
  }
};

exports.getSingleMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ mssg: "movies not found" });
    } else {
      return res
        .status(200)
        .json({ mssg: "movies", data: movie, success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error getting movie",
    });
  }
};

exports.getSeats = async (req, res) => {
  try {
    const { movieId, showDate, showTime } = req.query;

 
    const bookings = await Booking.find({
      movie: movieId,
      showDate,
      showTime
    });

    const bookedSeats = bookings.flatMap(b => b.seats);


    const rows = ["A","B","C","D","E","F","G"];
    const seats = [];

    rows.forEach(row => {
      for (let i = 1; i <= 9; i++) {
        seats.push({
          seatNumber: `${row}${i}`,
          isBooked: bookedSeats.includes(`${row}${i}`)
        });
      }
    });

    res.status(200).json({
      success: true,
      timings: ["06:30", "09:30", "12:00", "04:30", "08:00"],
      data: seats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching seats"
    });
  }
};

exports.bookShow = async (req, res) => {
  try {
    const { movieId, userName, showDate, showTime, seats } = req.body;

  
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

 
    const existing = await Booking.find({
      movie: movieId,
      showDate,
      showTime,
      seats: { $in: seats }
    });

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some seats are already booked"
      });
    }

    const ticketPrice = 200;
    const totalAmount = seats.length * ticketPrice;

    const booking = await Booking.create({
      movie: movieId,
      userName,
      showDate,
      showTime,
      seats,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: "Show booked successfully",
      data: booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking failed"
    });
  }
};




