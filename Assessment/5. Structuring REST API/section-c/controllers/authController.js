const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/authMiddleware");

const users = [];
let nextUserId = 1;

function register(req, res) {
  const { name, email, password } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: true, message: "name is required" });
  }
  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: true, message: "email is required" });
  }
  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({ error: true, message: "password is required" });
  }

  const alreadyUsed = users.find((user) => user.email === email.trim());
  if (alreadyUsed) {
    return res.status(400).json({ error: true, message: "email is already registered" });
  }

  const user = {
    id: nextUserId,
    name: name.trim(),
    email: email.trim(),
    password,
  };
  nextUserId += 1;
  users.push(user);

  res.status(201).json({ id: user.id, name: user.name, email: user.email });
}

function login(req, res) {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ error: true, message: "Wrong email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
}

module.exports = { register, login };
