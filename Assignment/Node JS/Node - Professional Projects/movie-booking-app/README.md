# Movie Booking App

A small Express API for browsing upcoming movies and booking seats. Movie
data and booked seats are stored in memory and reset when the server restarts.

## Run

```bash
npm install
npm start
```

The server listens on `http://localhost:3000` by default. Set `PORT` to use
another port.

## Endpoints

- `GET /movies` returns five upcoming movies.
- `GET /search-movies?q=metro` searches movie titles without regard to case.
- `POST /book-ticket` accepts JSON such as
  `{"movieId":1,"seatNumber":"A1","userEmail":"fan@example.com"}`.
  A seat can only be booked once for each movie.

Unexpected errors return JSON with an error message and status code `500`.
