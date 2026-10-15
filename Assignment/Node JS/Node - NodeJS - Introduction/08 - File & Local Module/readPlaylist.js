/* Task 1
Create a Node.js script named readPlaylist.js that uses the built-in 'fs' 
(File System) module to read and display the contents of a file called 
playlist.txt, which contains a list of your 5 favorite songs (one per line). */

const fs = require('fs');

fs.readFile("playlist.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
    } else {
        console.log("My favorite songs:");
        console.log(data);
    }
});

// To run : node readPlaylist.js
