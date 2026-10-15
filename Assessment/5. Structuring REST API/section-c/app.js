const express = require("express");
const authRoutes = require("./routes/auth");
const restaurantRoutes = require("./routes/restaurants");
const orderRoutes = require("./routes/orders");
const { authMiddleware } = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3004;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/restaurants", authMiddleware, restaurantRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);

// example route so the error middleware can be tested
app.get("/crash", (req, res, next) => {
  next(new Error("This is a test error"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Section C server running on http://localhost:" + PORT);
});
