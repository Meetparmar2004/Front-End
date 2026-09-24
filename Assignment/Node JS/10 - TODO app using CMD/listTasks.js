/* Task 2
Build a Node.js script called listTasks.js that reads all tasks from 
todo.txt and displays them in a numbered list in the console. */

const fs = require('fs');

if (!fs.existsSync("todo.txt")) {
    console.log("No tasks found. todo.txt does not exist yet.");
    process.exit();
}

let data = fs.readFileSync("todo.txt", "utf8");
let tasks = data.split("\n").filter((t) => t.trim() !== "");

if (tasks.length === 0) {
    console.log("No tasks in the list.");
} else {
    console.log("Your TODO list:");
    for (let i = 0; i < tasks.length; i++) {
        console.log((i + 1) + ". " + tasks[i]);
    }
}

// To run : node listTasks.js
