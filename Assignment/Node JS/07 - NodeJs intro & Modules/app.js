/* Task 4 continued
Import and display the playlist array from playlist.js */

const songs = require('./playlist');

console.log("My favorite Spotify playlist:");
for (let i = 0; i < songs.length; i++) {
    console.log((i + 1) + ". " + songs[i]);
}

// To run : node app.js
// Task 6: use nodemon app.js so it auto restarts on changes
