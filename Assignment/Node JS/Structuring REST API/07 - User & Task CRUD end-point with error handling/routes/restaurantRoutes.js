const express = require("express");

const router = express.Router();

// change this to false if you want to see the database error
let databaseConnected = true;

const restaurants = [
  { id: 1, name: "Burger King", cuisine: "Fast Food", city: "Ahmedabad" },
  { id: 2, name: "Pizza Hut", cuisine: "Italian", city: "Surat" },
];

function getRestaurantsFromDb() {
  return new Promise((resolve, reject) => {
    if (!databaseConnected) {
      reject(new Error("Database connection failed"));
      return;
    }

    resolve(restaurants);
  });
}

// get all restaurants
router.get("/", async (req, res) => {
  try {
    const list = await getRestaurantsFromDb();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch restaurants. " + err.message });
  }
});

module.exports = router;
