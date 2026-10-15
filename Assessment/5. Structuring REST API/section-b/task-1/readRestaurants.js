const fs = require("fs").promises;
const path = require("path");

// Task 1: read restaurant json with async/await
async function loadRestaurants() {
  try {
    const filePath = path.join(__dirname, "restaurants.json");
    const raw = await fs.readFile(filePath, "utf8");
    const restaurants = JSON.parse(raw);

    restaurants.forEach((restaurant) => {
      console.log(restaurant.name + " - " + restaurant.cuisine);
    });

    console.log("Restaurant data loaded successfully");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Error: restaurants.json was not found");
    } else if (err instanceof SyntaxError) {
      console.log("Error: restaurants.json is not valid JSON");
    } else {
      console.log("Error: " + err.message);
    }
  }
}

loadRestaurants();
