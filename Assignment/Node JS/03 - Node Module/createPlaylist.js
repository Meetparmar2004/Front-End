/* Task 1
Use the Node.js FS module to create a script named createPlaylist.js 
that writes an array of 5 favorite song names into a file called playlist.txt. */

const fs = require('fs');

let songs = [
    "Blinding Lights",
    "Shape of You",
    "Levitating",
    "Stay",
    "Peaches"
];

// join songs with new line so each song is on separate line in file
let data = songs.join("\n");

fs.writeFile("playlist.txt", data, (err) => {
    if (err) {
        console.log("Error writing file:", err);
    } else {
        console.log("Playlist created successfully!");
        console.log("Songs saved in playlist.txt");
    }
});

// To run code : node createPlaylist.js
