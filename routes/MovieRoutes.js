const express = require("express");
const {
  addMovie,
  getMovies,
  getSingleMovie,
  getSeats,
  bookShow

} = require("../controller/MovieController");

const routes = express.Router();

routes.post("/add-movie", addMovie);
routes.get("/movies", getMovies);
routes.get("/movie/:id", getSingleMovie);

routes.get("/seats", getSeats);
routes.post("/book-show", bookShow);


module.exports = routes;
