const express = require("express");
const products = require("./data/products");
const { addToCart, getCart } = require("./cart");

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

app.get("/products/search", (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q.trim().toLowerCase() : "";
  const matches = products.filter((product) => product.name.toLowerCase().includes(query));
  return res.json(matches);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.post("/cart", (req, res) => {
  const { productId, quantity } = req.body || {};
  const numericProductId = Number(productId);

  if (!Number.isInteger(numericProductId) || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "productId and a positive integer quantity are required" });
  }

  const cartItem = addToCart(numericProductId, quantity);
  if (!cartItem) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(200).json({ item: cartItem, cart: getCart() });
});

app.get("/cart/total", (req, res) => {
  const items = getCart();
  const subtotalCents = items.reduce(
    (subtotal, item) => subtotal + Math.round(item.price * 100) * item.quantity,
    0
  );
  const deliveryChargeCents = Math.round(subtotalCents * 0.05);

  return res.json({
    items,
    subtotal: subtotalCents / 100,
    deliveryCharge: deliveryChargeCents / 100,
    total: (subtotalCents + deliveryChargeCents) / 100
  });
});

module.exports = app;
