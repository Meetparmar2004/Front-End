/* Task 3
Convert the following callback-based function to use async/await syntax: 
a function that fetches a playlist by name from an array, then adds a new 
song to it, both with simulated delays.

Hint: Use setTimeout to simulate the delay in both steps, and wrap them 
in Promises before using async/await. */

let playlists = [
    { name: "chill", songs: ["Blinding Lights", "Stay"] },
    { name: "workout", songs: ["Believer", "Stronger"] },
    { name: "party", songs: ["Levitating", "Peaches"] }
];

// wrap in promise - fetch playlist
function fetchPlaylist(playlistName) {
    return new Promise((resolve, reject) => {
        console.log("Fetching playlist...");
        setTimeout(() => {
            let playlist = playlists.find((p) => p.name === playlistName);

            if (playlist) {
                resolve(playlist);
            } else {
                reject("Playlist not found");
            }
        }, 1000);
    });
}

// wrap in promise - add song
function addSong(playlist, songName) {
    return new Promise((resolve) => {
        console.log("Adding song...");
        setTimeout(() => {
            playlist.songs.push(songName);
            resolve(playlist);
        }, 1000);
    });
}

// using async/await
async function updatePlaylist() {
    try {
        let playlist = await fetchPlaylist("chill");
        console.log("Playlist found:", playlist);

        let updated = await addSong(playlist, "Shape of You");
        console.log("Updated playlist:", updated);
    } catch (err) {
        console.log("Error:", err);
    }
}

updatePlaylist();

// To run code : node playlistAsync.js
