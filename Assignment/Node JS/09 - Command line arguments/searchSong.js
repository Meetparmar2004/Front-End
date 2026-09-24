/* Task 3
Write a Node.js script called searchSong.js that reads songs.json and 
uses Array.filter to find all songs by a given artist (passed as a 
command line argument), then displays the matching song titles. */

const fs = require('fs');

let artist = process.argv.slice(2).join(" ");

if (!artist) {
    console.log("Please enter an artist name!");
    console.log("Example: node searchSong.js The Weeknd");
    process.exit();
}

if (!fs.existsSync("songs.json")) {
    console.log("songs.json not found. Add some songs first!");
    process.exit();
}

let data = fs.readFileSync("songs.json", "utf8");
let songs = JSON.parse(data);

// filter songs by artist (ignore case)
let matches = songs.filter((song) => song.artist.toLowerCase() === artist.toLowerCase());

if (matches.length === 0) {
    console.log("No songs found for artist:", artist);
} else {
    console.log("Songs by", artist + ":");
    for (let i = 0; i < matches.length; i++) {
        console.log("- " + matches[i].title);
    }
}

// To run : node searchSong.js The Weeknd
