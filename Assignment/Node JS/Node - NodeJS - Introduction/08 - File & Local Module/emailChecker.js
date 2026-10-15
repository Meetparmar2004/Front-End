/* Task 3
Install the 'validator' npm library and use it in a script called 
emailChecker.js to check if a user-entered email is valid. 
Prompt for input using the readline module, then display 
'Valid Email' or 'Invalid Email' based on the result. */

const readline = require('readline');
const validator = require('validator');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your email: ", (email) => {
    if (validator.isEmail(email)) {
        console.log("Valid Email");
    } else {
        console.log("Invalid Email");
    }
    rl.close();
});

// To run : node emailChecker.js
// first run: npm install validator
