/* Task 1 + Task 4
Create a Node.js script called addTask.js that takes a task description 
as a command line argument and saves it to a file named todo.txt.

Task 4: Refactor to prevent adding duplicate tasks (case-insensitive). */

const fs = require('fs');

// get task from command line (everything after node addTask.js)
let task = process.argv.slice(2).join(" ");

if (!task) {
    console.log("Please enter a task!");
    console.log("Example: node addTask.js Buy milk");
    process.exit();
}

let tasks = [];

// read existing tasks if file exists
if (fs.existsSync("todo.txt")) {
    let data = fs.readFileSync("todo.txt", "utf8");
    if (data.trim() !== "") {
        tasks = data.split("\n").filter((t) => t.trim() !== "");
    }
}

// check duplicate (ignore case)
let alreadyExists = tasks.some((t) => t.toLowerCase() === task.toLowerCase());

if (alreadyExists) {
    console.log("Task already exists! Not adding duplicate.");
} else {
    tasks.push(task);
    fs.writeFileSync("todo.txt", tasks.join("\n"));
    console.log("Task added:", task);
}

// To run : node addTask.js Buy milk
