/* Task 2 + Task 5
Use the Yargs library to build a script called addSong.js that accepts 
--title and --artist arguments, then saves the song details to a 
songs.json file as a new object in an array.

Task 5: Check if song with same title already exists using Array.find.
If yes print 'Song already exists', else add and print 'Song added successfully'. */

const fs = require('fs');
const yargs = require('yargs');

let argv = yargs
    .option('title', {
        describe: 'Song title',
        demandOption: true,
        type: 'string'
    })
    .option('artist', {
        describe: 'Song artist',
        demandOption: true,
        type: 'string'
    })
    .argv;

let title = argv.title;
let artist = argv.artist;

// read existing songs or start with empty array
let songs = [];
if (fs.existsSync("songs.json")) {
    let data = fs.readFileSync("songs.json", "utf8");
    songs = JSON.parse(data);
}

// check duplicate by title (Task 5)
let existing = songs.find((song) => song.title.toLowerCase() === title.toLowerCase());

if (existing) {
    console.log("Song already exists");
} else {
    songs.push({ title: title, artist: artist });
    fs.writeFileSync("songs.json", JSON.stringify(songs, null, 2));
    console.log("Song added successfully");
}

// To run : node addSong.js --title="Blinding Lights" --artist="The Weeknd"
// first run: npm install yargs
