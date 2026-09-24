/* Task 1
Create a Node.js script called greet.js that takes your name as a 
command line argument and prints 'Hello, <your name>!' in the console 
using process.argv. */

let name = process.argv[2];

if (!name) {
    console.log("Please enter your name!");
    console.log("Example: node greet.js Meet");
} else {
    console.log("Hello, " + name + "!");
}

// To run : node greet.js Meet
