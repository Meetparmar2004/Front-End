const express = require("express");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");

const app = express();

app.use(express.json());
app.use(profileRoutes);
app.use(postRoutes);

module.exports = app;
