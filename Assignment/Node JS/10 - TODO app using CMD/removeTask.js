/* Task 3
Write a Node.js script called removeTask.js that accepts a task number 
as a command line argument and removes the corresponding task from todo.txt, 
then displays the updated list.

Hint: Use the fs module to read and write files, and process.argv 
to access command line arguments. */

const fs = require('fs');

let taskNumber = process.argv[2];

if (!taskNumber) {
    console.log("Please enter a task number to remove!");
    console.log("Example: node removeTask.js 2");
    process.exit();
}

if (!fs.existsSync("todo.txt")) {
    console.log("No tasks found. todo.txt does not exist yet.");
    process.exit();
}

let data = fs.readFileSync("todo.txt", "utf8");
let tasks = data.split("\n").filter((t) => t.trim() !== "");

let index = parseInt(taskNumber) - 1; // convert to 0-based index

if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log("Invalid task number!");
    process.exit();
}

let removed = tasks[index];
tasks.splice(index, 1); // remove the task

fs.writeFileSync("todo.txt", tasks.join("\n"));
console.log("Removed:", removed);

// show updated list
console.log("\nUpdated TODO list:");
if (tasks.length === 0) {
    console.log("No tasks left.");
} else {
    for (let i = 0; i < tasks.length; i++) {
        console.log((i + 1) + ". " + tasks[i]);
    }
}

// To run : node removeTask.js 2
