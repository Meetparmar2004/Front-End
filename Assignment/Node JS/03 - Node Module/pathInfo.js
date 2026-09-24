/* Task 2
Write a script using the PATH module that takes a file path like 
'/user/music/playlist.txt' and prints the directory name, base name, 
and file extension separately in the console.

Hint: Use path.dirname(), path.basename(), and path.extname(). */

const path = require('path');

let filePath = '/user/music/playlist.txt';

console.log("Directory name:", path.dirname(filePath));
console.log("Base name:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));

// To run code : node pathInfo.js
