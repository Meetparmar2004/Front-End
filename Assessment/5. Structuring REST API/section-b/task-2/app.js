const express = require("express");

const app = express();
const PORT = 3001;

const restaurants = [
  { id: 1, name: "Spice Hub", cuisine: "indian" },
  { id: 2, name: "Pasta Corner", cuisine: "italian" },
  { id: 3, name: "Sushi Bar", cuisine: "japanese" },
];

// logs every request before the route runs
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(req.method + " " + req.url + " at " + timestamp);
  next();
}

app.use(requestLogger);

app.get("/restaurants", (req, res) => {
  const cuisine = req.query.cuisine;
  let result = restaurants;

  if (cuisine) {
    result = restaurants.filter(
      (restaurant) => restaurant.cuisine.toLowerCase() === String(cuisine).toLowerCase()
    );
  }

  res.status(200).json(result);
});

app.get("/restaurants/:id", (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  res.status(200).json(restaurant);
});

app.listen(PORT, () => {
  console.log("Task 2 server running on http://localhost:" + PORT);
});
