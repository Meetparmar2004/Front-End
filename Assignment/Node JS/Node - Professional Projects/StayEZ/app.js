const express = require("express");
const Room = require("./room");

const app = express();

const rooms = [
  new Room("Sea-View Coconut Cottage", "Goa, India", 4200, [
    "Beach access",
    "Wi-Fi",
    "Air conditioning",
    "Balcony"
  ]),
  new Room("Heritage Haveli Suite", "Jaipur, India", 3600, [
    "Courtyard",
    "Breakfast",
    "Wi-Fi",
    "Air conditioning"
  ]),
  new Room("Pine Ridge Mountain Cabin", "Manali, India", 5100, [
    "Mountain view",
    "Fireplace",
    "Kitchen",
    "Parking"
  ]),
  new Room("Backwater Garden Villa", "Kochi, India", 3900, [
    "Garden",
    "Breakfast",
    "Wi-Fi",
    "Airport transfer"
  ]),
  new Room("Skyline Studio Apartment", "Mumbai, India", 4700, [
    "City view",
    "Kitchen",
    "Gym",
    "Wi-Fi"
  ])
];

app.get("/", (req, res) => {
  return res.send("Welcome to StayEZ");
});

app.get("/rooms/search", (req, res) => {
  const location = typeof req.query.location === "string"
    ? req.query.location.trim().toLowerCase()
    : "";
  const matchingRooms = rooms.filter((room) => room.location.toLowerCase().includes(location));

  return res.json(matchingRooms);
});

app.get("/rooms", (req, res) => {
  return res.json(rooms);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`StayEZ listening on port ${port}`);
  });
}

module.exports = app;
