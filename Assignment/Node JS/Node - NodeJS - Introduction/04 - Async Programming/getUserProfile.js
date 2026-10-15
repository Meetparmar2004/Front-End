/* Task 1
Write a Node.js function getUserProfile(username, callback) that simulates 
fetching a user profile from an array after 2 seconds using setTimeout, 
then calls the callback with the result. */

let users = [
    { username: "meet", age: 22, city: "Surat" },
    { username: "rahul", age: 25, city: "Mumbai" },
    { username: "priya", age: 21, city: "Delhi" }
];

function getUserProfile(username, callback) {
    console.log("Fetching profile for " + username + "...");

    setTimeout(() => {
        let user = users.find((u) => u.username === username);

        if (user) {
            callback(null, user);
        } else {
            callback("User not found", null);
        }
    }, 2000);
}

getUserProfile("meet", (err, result) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("User profile:", result);
    }
});

// To run code : node getUserProfile.js
