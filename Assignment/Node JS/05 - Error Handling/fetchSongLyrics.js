/* Task 2
Wrap a call to a function fetchSongLyrics(songName) inside a try/catch block 
and log a custom error message if an exception occurs, simulating an API call 
failure like Spotify's lyrics fetch. */

function fetchSongLyrics(songName) {
    // fake lyrics for some songs
    let lyrics = {
        "Blinding Lights": "I've been tryna call...",
        "Shape of You": "The club isn't the best place...",
        "Stay": "I do the same thing I told you..."
    };

    // simulate api failure if song not found
    if (!lyrics[songName]) {
        throw new Error("Lyrics not found for this song");
    }

    return lyrics[songName];
}

// testing with song that exists
try {
    let result = fetchSongLyrics("Blinding Lights");
    console.log("Lyrics:", result);
} catch (err) {
    console.log("Could not fetch lyrics from Spotify:", err.message);
}

// testing with song that doesn't exist (error case)
try {
    let result2 = fetchSongLyrics("Random Song");
    console.log("Lyrics:", result2);
} catch (err) {
    console.log("Could not fetch lyrics from Spotify:", err.message);
}

// To run code : node fetchSongLyrics.js
