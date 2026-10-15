/* Task 3
Build a Node.js script called readBookList.js that reads the contents 
of a file named books.txt and displays each book name on a new line 
in the console.

Constraint: Use fs.readFile with a callback, not the synchronous method. */

const fs = require('fs');

fs.readFile("books.txt", "utf8", (err, data) => {
    if (err) {
        console.log("Error reading file:", err);
    } else {
        // split by new line and print each book
        let books = data.split("\n");

        for (let i = 0; i < books.length; i++) {
            if (books[i].trim() !== "") {
                console.log(books[i]);
            }
        }
    }
});

// To run code : node readBookList.js
