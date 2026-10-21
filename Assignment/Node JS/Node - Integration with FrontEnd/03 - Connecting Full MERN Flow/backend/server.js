// Task 5: MongoDB calls use async/await and try/catch, not .then()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-assignment';

app.use(cors());
app.use(express.json());

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: Number
});

const Playlist = mongoose.model('Playlist', playlistSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Movie = mongoose.model('Movie', movieSchema);

// Task 4: if the database is not connected, tell the frontend
function sendDbError(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(500).json({ message: 'Failed to connect to MongoDB' });
    return true;
  }

  return false;
}

// Task 1: save a new playlist name
app.post('/playlists', async (req, res) => {
  try {
    if (sendDbError(res)) {
      return;
    }

    const name = req.body.name;

    if (!name) {
      return res.status(400).json({ message: 'Playlist name is required' });
    }

    const playlist = new Playlist({ name: name });
    await playlist.save();

    res.json({ message: 'Playlist saved successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not save the playlist' });
  }
});

// Task 2: save a restaurant and return the saved object
app.post('/restaurants', async (req, res) => {
  try {
    if (sendDbError(res)) {
      return;
    }

    const name = req.body.name;
    const cuisine = req.body.cuisine;
    const rating = req.body.rating;

    if (!name || !cuisine || rating === undefined || rating === '') {
      return res.status(400).json({ message: 'Name, cuisine and rating are required' });
    }

    const restaurant = new Restaurant({
      name: name,
      cuisine: cuisine,
      rating: Number(rating)
    });

    const savedRestaurant = await restaurant.save();
    res.json(savedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not save the restaurant' });
  }
});

// Task 3: send all movies as JSON
app.get('/movies', async (req, res) => {
  try {
    if (sendDbError(res)) {
      return;
    }

    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not load movies' });
  }
});

// A few movies so the list is not empty the first time I open the page
async function addSampleMovies() {
  const count = await Movie.countDocuments();

  if (count === 0) {
    await Movie.insertMany([
      { title: 'Inception', year: 2010 },
      { title: 'The Matrix', year: 1999 },
      { title: 'Interstellar', year: 2014 }
    ]);
    console.log('Added sample movies');
  }
}

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected');
    await addSampleMovies();
  } catch (error) {
    // server still starts so the frontend can show the error
    console.log('MongoDB connection failed:', error.message);
  }

  app.listen(PORT, function () {
    console.log('Backend running at http://localhost:' + PORT);
  });
}

start();
