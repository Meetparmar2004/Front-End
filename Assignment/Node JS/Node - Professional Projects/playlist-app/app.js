const express = require("express");
const { Song, songs } = require("./song");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to Playlist App");
});

app.get("/songs", (req, res) => {
  return res.json(songs);
});

app.post("/songs", (req, res) => {
  const { title, artist, duration } = req.body || {};
  const errors = {};

  if (typeof title !== "string" || !title.trim()) {
    errors.title = "Title must not be empty";
  }

  if (typeof artist !== "string" || !artist.trim()) {
    errors.artist = "Artist must not be empty";
  }

  if (typeof duration !== "number" || !Number.isFinite(duration) || duration <= 0) {
    errors.duration = "Duration must be a positive number";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  songs.push(new Song(title.trim(), artist.trim(), duration));
  return res.status(201).json(songs);
});

module.exports = app;
