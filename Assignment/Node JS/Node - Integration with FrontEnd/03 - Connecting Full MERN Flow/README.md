# 03 - Connecting Full MERN Flow

This folder is my MERN assignment. The React page talks to the Node backend, and the backend saves data in MongoDB with Mongoose.

## How to run

MongoDB needs to be running first. I used this local address:

`mongodb://127.0.0.1:27017/mern-assignment`

If your MongoDB address is different, copy `backend/.env.example` to `backend/.env` and change `MONGO_URI`.

Terminal 1 (backend):

```
cd backend
npm install
npm start
```

Terminal 2 (frontend):

```
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000

## What each part does

- Playlist form: sends a POST with the playlist name. The backend saves it and sends back "Playlist saved successfully".
- Restaurant form: sends name, cuisine and rating. The backend saves it and returns the saved restaurant, which the page shows.
- Movies: GET `/movies` loads the movie documents and the page lists them. The backend adds 3 sample movies the first time the database is empty.
- If MongoDB is not connected, or a save fails, the backend sends an error message and the page shows it in an alert.
- All MongoDB calls in `backend/server.js` use async/await and try/catch.
