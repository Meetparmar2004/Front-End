const crypto = require("node:crypto");
const express = require("express");
const multer = require("multer");
const path = require("node:path");

const app = express();
const uploadDirectory = path.join(__dirname, "..", "uploads");
const imageExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp"
};
let products = [
  {
    id: 1,
    title: "City Bicycle",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e"
  },
  {
    id: 2,
    title: "Wooden Study Desk",
    price: 240,
    imageUrl: "https://images.unsplash.com/photo-1499933374294-4584851497cc"
  },
  {
    id: 3,
    title: "Compact Camera",
    price: 320,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
  }
];
let nextProductId = products.reduce((highestId, product) => Math.max(highestId, product.id), 0) + 1;

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
      callback(null, `${crypto.randomUUID()}${imageExtensions[file.mimetype]}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, callback) => {
    callback(null, imageExtensions[file.mimetype] !== undefined);
  }
});

app.use(express.json());
app.use("/uploads", express.static(uploadDirectory));

app.get("/", (req, res) => {
  return res.send("OLX-style product API");
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.post("/add-product", (req, res) => {
  const { title, price, imageUrl } = req.body || {};

  if (typeof title !== "string" || !title.trim()
    || typeof price !== "number" || !Number.isFinite(price) || price <= 0
    || typeof imageUrl !== "string" || !imageUrl.trim()) {
    return res.status(400).json({
      error: "title, a positive numeric price, and imageUrl are required"
    });
  }

  products.push({
    id: nextProductId++,
    title: title.trim(),
    price,
    imageUrl: imageUrl.trim()
  });

  return res.status(201).json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!Number.isInteger(productId) || !product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const remainingProducts = products.filter((item) => item.id !== productId);

  if (!Number.isInteger(productId) || remainingProducts.length === products.length) {
    return res.status(404).json({ message: "Product not found" });
  }

  products = remainingProducts;
  return res.json(products);
});

app.post("/upload-image", (req, res) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      const status = error instanceof multer.MulterError
        ? error.code === "LIMIT_FILE_SIZE" ? 413 : 400
        : 500;
      return res.status(status).json({ error: error.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "A JPEG, PNG, or WebP image file is required" });
    }

    return res.status(201).json({ imageUrl: `/uploads/${req.file.filename}` });
  });
});

module.exports = app;
