const express = require("express");

const router = express.Router();

const allowedGenres = ["Action", "Drama", "Comedy", "Thriller"];

let movies = [
  { id: 1, title: "Inception", genre: "Thriller", releaseYear: 2010 },
];
let nextId = 2;

// add a new movie
router.post("/", (req, res) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const releaseYear = req.body.releaseYear;

  if (!title || title.length < 2) {
    return res.status(400).json({ message: "Title must be at least 2 characters" });
  }

  if (typeof releaseYear !== "number") {
    return res.status(400).json({ message: "Release year must be a number" });
  }

  if (!genre) {
    return res.status(400).json({ message: "Genre is required" });
  }

  const movie = {
    id: nextId,
    title: title,
    genre: genre,
    releaseYear: releaseYear,
  };

  nextId = nextId + 1;
  movies.push(movie);

  res.status(201).json({
    message: "Movie added",
    movie: movie,
  });
});

// update genre and release year
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const genre = req.body.genre;
  const releaseYear = req.body.releaseYear;
  const movie = movies.find((item) => item.id === id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  if (!allowedGenres.includes(genre)) {
    return res.status(400).json({
      message: "Genre must be Action, Drama, Comedy or Thriller",
    });
  }

  if (typeof releaseYear !== "number") {
    return res.status(400).json({ message: "Release year must be a number" });
  }

  movie.genre = genre;
  movie.releaseYear = releaseYear;

  res.status(200).json(movie);
});

// get one movie by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((item) => item.id === id);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json(movie);
});

module.exports = router;
