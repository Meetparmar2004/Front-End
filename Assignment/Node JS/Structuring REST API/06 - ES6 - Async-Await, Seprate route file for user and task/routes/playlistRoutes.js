const express = require("express");

const router = express.Router();

// Task 1: starting list of playlists (name and number of songs)
let playlists = [
  { id: 1, name: "Today's Top Hits", numberOfSongs: 50 },
  { id: 2, name: "Chill Vibes", numberOfSongs: 20 },
  { id: 3, name: "Workout", numberOfSongs: 15 },
];

// Task 2: fake delay so the update feels like a database call
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

router.get("/", (req, res) => {
  res.status(200).json(playlists);
});

// Task 2 and Task 5: update playlist name, and catch bad input
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const newName = req.body.name;

    if (!newName) {
      throw new Error("Playlist name is missing");
    }

    if (Number.isNaN(id)) {
      throw new Error("Invalid id");
    }

    await wait(300);

    const playlist = playlists.find((item) => item.id === id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.name = newName;
    res.status(200).json({ message: "Playlist updated", playlist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Task 3: delete a playlist by id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const index = playlists.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  playlists.splice(index, 1);
  res.status(200).json({ message: "Playlist deleted" });
});

module.exports = router;
