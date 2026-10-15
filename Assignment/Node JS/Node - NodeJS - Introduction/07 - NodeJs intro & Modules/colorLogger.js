/* Task 5
Install the chalk npm module in your project and use it in a file called 
colorLogger.js to print 'Welcome to Node.js!' in green color in the terminal.

Hint: Use npm install chalk and require('chalk') in your code. */

const chalk = require('chalk');

console.log(chalk.green("Welcome to Node.js!"));

// To run : node colorLogger.js
// first run: npm install chalk@4
// (chalk v4 works with require, newer chalk needs import)
