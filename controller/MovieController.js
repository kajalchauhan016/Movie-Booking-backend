const Movie = require("../model/MovieModel");

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
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding movie",
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
      return res.status(4004).json({ mssg: "movies not found" });
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
