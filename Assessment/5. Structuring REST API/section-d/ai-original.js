// This is the code the AI gave me. I kept it so I can show what I changed.
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET = "ordersecret";

app.use(express.json());

app.post("/api/orders", (req, res) => {
  const { customerId, restaurantId, menuItems } = req.body;

  // AI only checked if the values are truthy
  if (!customerId || !restaurantId || !menuItems) {
    return res.status(400).json({ message: "customerId, restaurantId and menuItems are required" });
  }

  const token = jwt.sign(
    { customerId, restaurantId, menuItems },
    SECRET,
    { expiresIn: 15 }
  );

  res.status(200).json({ token });
});

app.listen(3005, () => {
  console.log("AI version running on http://localhost:3005");
});
