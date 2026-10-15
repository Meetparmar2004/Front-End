const express = require("express");
const mongoose = require("mongoose");
const PlaylistCategory = require("./models/PlaylistCategory");
const Song = require("./models/Song");

const app = express();
app.use(express.json());

// Task 1: connect to local MongoDB database named playlistdb
mongoose
  .connect("mongodb://127.0.0.1:27017/playlistdb")
  .then(() => {
    console.log("Connected to playlistdb");
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err);
  });

// Task 2: add a new category
app.post("/categories", async (req, res) => {
  try {
    const category = new PlaylistCategory({
      name: req.body.name,
      description: req.body.description,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Task 3: list all playlist categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await PlaylistCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Task 3: delete a category by its id
app.delete("/categories/:id", async (req, res) => {
  try {
    const deletedCategory = await PlaylistCategory.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Task 4: add a new song to a category
app.post("/songs", async (req, res) => {
  try {
    const song = new Song({
      title: req.body.title,
      artist: req.body.artist,
      category: req.body.category,
    });

    const savedSong = await song.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Task 5: get songs of one category and include the category name
app.get("/songs", async (req, res) => {
  try {
    const categoryId = req.query.category;

    const songs = await Song.find({ category: categoryId }).populate(
      "category",
      "name"
    );

    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
