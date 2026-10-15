/* Task 1
Create a function getUserById(userId) that throws a custom Error object 
if the userId is not a positive number, and returns a fake user object otherwise.

Hint: Use 'throw new Error("Invalid userId")' for error handling. */

function getUserById(userId) {
    // check if userId is positive number
    if (typeof userId !== "number" || userId <= 0) {
        throw new Error("Invalid userId");
    }

    // fake user object
    return {
        id: userId,
        name: "Meet",
        email: "meet@gmail.com"
    };
}

// testing valid id
try {
    let user = getUserById(1);
    console.log("User found:", user);
} catch (err) {
    console.log("Error:", err.message);
}

// testing invalid id
try {
    let user2 = getUserById(-5);
    console.log("User found:", user2);
} catch (err) {
    console.log("Error:", err.message);
}

// testing with string (also invalid)
try {
    let user3 = getUserById("abc");
    console.log("User found:", user3);
} catch (err) {
    console.log("Error:", err.message);
}

// To run code : node getUserById.js
