const express = require("express");

const router = express.Router();

const movies = [
  { movieId: 1, title: "Midnight Metro", language: "English", releaseDate: "2026-12-04" },
  { movieId: 2, title: "The Last Monsoon", language: "Hindi", releaseDate: "2026-12-18" },
  { movieId: 3, title: "Paper Moons", language: "English", releaseDate: "2027-01-15" },
  { movieId: 4, title: "A Summer in Seville", language: "Spanish", releaseDate: "2027-02-12" },
  { movieId: 5, title: "River of Stars", language: "Japanese", releaseDate: "2027-03-05" }
];

const bookedSeats = new Map(movies.map((movie) => [movie.movieId, []]));

// AI assistance helped catch duplicate bookings by normalizing seat labels before comparison.
function isSeatBooked(bookedSeatNumbers, newSeatNumber) {
  const requestedSeat = String(newSeatNumber).trim().toUpperCase();
  return bookedSeatNumbers.some(
    (seatNumber) => String(seatNumber).trim().toUpperCase() === requestedSeat
  );
}

router.get("/movies", (req, res) => {
  return res.json(movies);
});

router.get("/search-movies", (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : "";
  const matchingMovies = movies.filter((movie) => movie.title.toLowerCase().includes(query));
  return res.json(matchingMovies);
});

router.post("/book-ticket", (req, res) => {
  const { movieId, seatNumber, userEmail } = req.body || {};
  const numericMovieId = Number(movieId);
  const normalizedSeatNumber = typeof seatNumber === "string"
    ? seatNumber.trim().toUpperCase()
    : Number.isInteger(seatNumber) ? String(seatNumber) : "";
  const normalizedEmail = typeof userEmail === "string" ? userEmail.trim() : "";

  if (!Number.isInteger(numericMovieId) || !normalizedSeatNumber || !normalizedEmail) {
    return res.status(400).json({
      error: "movieId, seatNumber, and userEmail are required"
    });
  }

  const movie = movies.find((item) => item.movieId === numericMovieId);
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const movieBookedSeats = bookedSeats.get(numericMovieId);
  if (isSeatBooked(movieBookedSeats, normalizedSeatNumber)) {
    return res.status(409).json({ error: `Seat ${normalizedSeatNumber} is already booked` });
  }

  movieBookedSeats.push(normalizedSeatNumber);

  return res.status(201).json({
    message: `Booking confirmed for movie ${numericMovieId}, seat ${normalizedSeatNumber}, email ${normalizedEmail}`,
    movieId: numericMovieId,
    seatNumber: normalizedSeatNumber,
    userEmail: normalizedEmail
  });
});

module.exports = { router, movies, isSeatBooked };
