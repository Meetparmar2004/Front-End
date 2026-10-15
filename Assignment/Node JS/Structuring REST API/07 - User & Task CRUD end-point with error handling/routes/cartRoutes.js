const express = require("express");

const router = express.Router();

let cart = [
  { id: 1, name: "Phone Case", price: 299 },
  { id: 2, name: "Earphones", price: 799 },
];

// remove one product from the cart
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  cart.splice(index, 1);
  res.status(200).json({ message: "Product removed from cart" });
});

module.exports = router;
