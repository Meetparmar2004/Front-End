const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authMiddleware, SECRET } = require("./middleware/authMiddleware");

const app = express();
const PORT = 3003;

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// simple user so login has something to check
const user = {
  id: 1,
  email: "owner@test.com",
  password: "pass123",
};

let restaurants = [
  { id: 1, name: "Spice Hub", cuisine: "indian", image: null },
];
let nextId = 2;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, "restaurant-" + req.params.id + "-" + Date.now() + ext);
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = ext === ".jpg" || ext === ".jpeg" || ext === ".png";
  if (!allowed) {
    return cb(new Error("Only .jpg and .png files are allowed"));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

app.use(express.json());

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: "Wrong email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

app.post("/api/restaurants", authMiddleware, (req, res) => {
  const { name, cuisine } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "name is required" });
  }

  const restaurant = {
    id: nextId,
    name: name.trim(),
    cuisine: cuisine || "",
    image: null,
  };
  nextId += 1;
  restaurants.push(restaurant);

  res.status(201).json(restaurant);
});

app.patch("/api/restaurants/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  if (req.body.name !== undefined) {
    restaurant.name = req.body.name;
  }
  if (req.body.cuisine !== undefined) {
    restaurant.cuisine = req.body.cuisine;
  }

  res.status(200).json(restaurant);
});

app.post("/api/restaurants/:id/image", authMiddleware, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File is too big. Max size is 2 MB" });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Please choose a jpg or png file" });
    }

    const id = Number(req.params.id);
    const restaurant = restaurants.find((item) => item.id === id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.image = req.file.filename;
    res.status(200).json({ message: "Image uploaded", file: req.file.filename });
  });
});

app.listen(PORT, () => {
  console.log("Task 4 server running on http://localhost:" + PORT);
});
