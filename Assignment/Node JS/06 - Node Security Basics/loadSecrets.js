/* Task 1
Create a .env file in your Node project to store a secret API key and 
database password, then load and print these values securely in your app 
using the dotenv package. */

require('dotenv').config();

let apiKey = process.env.API_KEY;
let dbPassword = process.env.DB_PASSWORD;

console.log("API Key loaded:", apiKey);
console.log("DB Password loaded:", dbPassword);

// secrets are in .env file, not hardcoded here
// To run code : node loadSecrets.js
// first run: npm install
