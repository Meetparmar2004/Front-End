const mongoose = require("mongoose");

// Task 4: song belongs to a PlaylistCategory
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlaylistCategory",
  },
});

module.exports = mongoose.model("Song", songSchema);
