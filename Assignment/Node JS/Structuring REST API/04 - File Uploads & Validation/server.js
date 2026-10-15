const express = require("express");
const fs = require("fs");
const path = require("path");
const { uploadAvatar, uploadPostImage } = require("./upload");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// create folders if they are not there yet
fs.mkdirSync(path.join(__dirname, "avatars"), { recursive: true });
fs.mkdirSync(path.join(__dirname, "post-images"), { recursive: true });

// Task 1 and Task 2: upload one profile picture (field name: avatar)
app.post("/upload-avatar", uploadAvatar.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please choose a file to upload" });
  }

  res.json({
    message: "Avatar uploaded",
    filename: req.file.filename,
  });
});

// Task 3: upload one post image (field name: image)
app.post("/upload-post-image", uploadPostImage.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please choose an image to upload" });
  }

  res.json({
    filename: req.file.filename,
    fileSize: req.file.size,
  });
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
