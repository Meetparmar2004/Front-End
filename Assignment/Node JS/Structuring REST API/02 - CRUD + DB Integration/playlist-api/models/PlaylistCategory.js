const mongoose = require("mongoose");

// Task 2: category has a required name and an optional description
const playlistCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("PlaylistCategory", playlistCategorySchema);
