const express = require("express");
const userRoutes = require("./routes/userRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();
app.use(express.json());

// Task 4: user routes under /users, playlist routes under /playlists
app.use("/users", userRoutes);
app.use("/playlists", playlistRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
