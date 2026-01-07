const Movie=require("../model/MovieModel")

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
      status
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
      status
    });

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: movie
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding movie"
    });
  }
};
