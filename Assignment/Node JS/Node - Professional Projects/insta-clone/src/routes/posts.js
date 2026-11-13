const express = require("express");
const { profiles, posts } = require("../data");

const router = express.Router();

let nextPostId = posts.reduce((highestId, post) => Math.max(highestId, post.postId), 0) + 1;

router.post("/post", (req, res) => {
  const { imageUrl, caption } = req.body || {};
  const username = req.body && req.body.username
    ? req.body.username
    : profiles[0].username;

  if (typeof imageUrl !== "string" || !imageUrl.trim()
    || typeof caption !== "string" || !caption.trim()) {
    return res.status(400).json({ error: "imageUrl and caption are required" });
  }

  if (!profiles.some((profile) => profile.username === username)) {
    return res.status(400).json({ error: "username must match an existing profile" });
  }

  const post = {
    postId: nextPostId++,
    username,
    imageUrl: imageUrl.trim(),
    caption: caption.trim(),
    likes: 0
  };

  posts.push(post);
  return res.status(201).json(post);
});

router.get("/feed", (req, res) => {
  return res.json(posts.slice().reverse().map(({ postId, username, caption, imageUrl, likes }) => ({
    postId,
    username,
    caption,
    imageUrl,
    likes
  })));
});

router.post("/like", (req, res) => {
  const postId = req.body && Number(req.body.postId);
  const post = posts.find((item) => item.postId === postId);

  if (!Number.isInteger(postId) || !post) {
    return res.status(404).json({ error: "Post not found" });
  }

  post.likes += 1;
  return res.json({ postId: post.postId, likes: post.likes });
});

module.exports = router;
