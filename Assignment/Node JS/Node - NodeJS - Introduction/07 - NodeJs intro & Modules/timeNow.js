/* Task 3
Build a small script in timeNow.js that uses Node's built-in os and path 
core modules to print your operating system's platform and the current 
file's directory path. */

const os = require('os');
const path = require('path');

console.log("OS Platform:", os.platform());
console.log("Current file directory:", path.dirname(__filename));

// also showing a bit more info
console.log("Full file path:", __filename);

// To run : node timeNow.js
