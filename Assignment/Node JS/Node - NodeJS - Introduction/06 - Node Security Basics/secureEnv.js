/* Task 5
Use ChatGPT or GitHub Copilot to suggest improvements for securely handling 
environment variables in your Node app, then implement one of the suggestions 
and describe what you changed. */


// ========== MY PROMPT ==========
// How can I securely handle environment variables in a Node.js app?
// Suggest some improvements.


// ========== AI SUGGESTIONS (summary) ==========
// 1. Add .env to .gitignore so secrets dont go to github
// 2. Create a .env.example with dummy values for other students
// 3. Check if required env vars exist when app starts
// 4. Dont log full secrets in production


// ========== WHAT I IMPLEMENTED ==========
// I implemented suggestion #3 - check required env vars on startup.
// If any secret is missing, app shows error and stops instead of crashing later.
//
// Also did #1 and #2:
// - added .gitignore with .env
// - added .env.example with placeholder values


require('dotenv').config();

// check required env vars before using them
function checkEnvVars() {
    let required = ["API_KEY", "DB_PASSWORD", "SPOTIFY_API_TOKEN"];
    let missing = [];

    for (let i = 0; i < required.length; i++) {
        if (!process.env[required[i]]) {
            missing.push(required[i]);
        }
    }

    if (missing.length > 0) {
        console.log("Error: Missing env variables:", missing.join(", "));
        console.log("Copy .env.example to .env and fill in the values.");
        process.exit(1);
    }

    console.log("All required env variables are loaded securely.");
    console.log("API_KEY is set:", process.env.API_KEY ? "yes" : "no");
    console.log("DB_PASSWORD is set:", process.env.DB_PASSWORD ? "yes" : "no");
    console.log("SPOTIFY_API_TOKEN is set:", process.env.SPOTIFY_API_TOKEN ? "yes" : "no");
    // not printing actual values here - safer
}

checkEnvVars();

// To run code : node secureEnv.js
