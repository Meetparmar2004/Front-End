const express = require("express");
const { generateAuthToken } = require("./auth");
const verifyToken = require("./middleware/verifyToken");

const app = express();
app.use(express.json());

// small login so we can get a token and test /my-orders
app.post("/login", (req, res) => {
  const user = {
    id: 1,
    email: req.body.email || "student@gmail.com",
  };

  const token = generateAuthToken(user);
  res.json({ token });
});

// Task 3: this route works only when a valid JWT is sent
app.get("/my-orders", verifyToken, (req, res) => {
  const orders = [
    { orderId: "ORD101", itemName: "Veg Burger" },
    { orderId: "ORD102", itemName: "French Fries" },
  ];

  res.json(orders);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
