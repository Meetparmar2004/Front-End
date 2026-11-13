const express = require("express");
const { profiles } = require("../data");

const router = express.Router();

router.get("/profile", (req, res) => {
  const username = req.query.username || profiles[0].username;
  const profile = profiles.find((user) => user.username === username);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  return res.json(profile);
});

module.exports = router;
