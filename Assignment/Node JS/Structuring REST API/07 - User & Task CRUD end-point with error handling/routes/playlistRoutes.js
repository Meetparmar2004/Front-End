const express = require("express");

const router = express.Router();

let playlists = [
  { id: 1, name: "Chill Vibes", description: "Slow songs for late night" },
];
let nextId = 2;

// add a new playlist
router.post("/", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  const playlist = {
    id: nextId,
    name: name,
    description: description,
  };

  nextId = nextId + 1;
  playlists.push(playlist);

  res.status(201).json({
    message: "Playlist created",
    playlist: playlist,
  });
});

// update name and description
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.name;
  const description = req.body.description;
  const playlist = playlists.find((item) => item.id === id);

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  playlist.name = name;
  playlist.description = description;

  res.status(200).json({
    message: "Playlist updated",
    playlist: playlist,
  });
});

// delete a playlist by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = playlists.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  playlists.splice(index, 1);
  res.status(200).json({ message: "Playlist deleted" });
});

module.exports = router;
