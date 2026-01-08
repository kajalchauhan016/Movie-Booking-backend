const express = require("express");
const {
  addMovie,
  getMovies,
  getSingleMovie,
} = require("../controller/MovieController");

const routes = express.Router();

routes.post("/add-movie", addMovie);
routes.get("/movies", getMovies);
routes.get("/movie/:id", getSingleMovie);

module.exports = routes;
