/* Task 4
Store a Spotify API token in your .env file and write a function to read 
and use this token for making a dummy API call (no real API call needed, 
just log the token use), ensuring the token is never hardcoded in your 
source files. */

require('dotenv').config();

function callSpotifyApi(endpoint) {
    let token = process.env.SPOTIFY_API_TOKEN;

    if (!token) {
        console.log("Error: Spotify token not found in .env");
        return;
    }

    // dummy api call - just logging, no real request
    console.log("Calling Spotify API...");
    console.log("Endpoint:", endpoint);
    console.log("Using token from .env (not hardcoded)");
    console.log("Authorization: Bearer", token);
    console.log("Dummy response: { status: 200, data: 'playlist loaded' }");
}

callSpotifyApi("/v1/me/playlists");

// To run code : node spotifyToken.js
