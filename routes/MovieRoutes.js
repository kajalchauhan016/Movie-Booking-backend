const express = require("express");
const { addMovie } = require("../controller/MovieController");

const routes = express.Router();

routes.post("/add-movie", addMovie);

module.exports = routes;
