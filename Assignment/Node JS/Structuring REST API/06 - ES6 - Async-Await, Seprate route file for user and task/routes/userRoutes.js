const express = require("express");

const router = express.Router();

// simple list so register and login have somewhere to save users
let users = [];
let nextUserId = 1;

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const alreadyExists = users.find((user) => user.email === email);

  if (alreadyExists) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  const user = {
    id: nextUserId,
    name: name,
    email: email,
    password: password,
  };

  nextUserId = nextUserId + 1;
  users.push(user);

  res.status(201).json({
    message: "User registered",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

module.exports = router;
