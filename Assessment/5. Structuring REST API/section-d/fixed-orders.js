const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET = "ordersecret";
const PORT = 3005;

app.use(express.json());

app.post("/api/orders", (req, res) => {
  const { customerId, restaurantId, menuItems } = req.body;
  const errors = [];

  if (typeof customerId !== "string" || customerId.trim() === "") {
    errors.push("customerId is required and must be a string");
  }
  if (typeof restaurantId !== "string" || restaurantId.trim() === "") {
    errors.push("restaurantId is required and must be a string");
  }
  if (!Array.isArray(menuItems) || menuItems.length === 0) {
    errors.push("menuItems must be an array with at least one item");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  const token = jwt.sign(
    {
      customerId: customerId.trim(),
      restaurantId: restaurantId.trim(),
      menuItems,
    },
    SECRET,
    { expiresIn: "15m" }
  );

  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log("Fixed orders server running on http://localhost:" + PORT);
});
