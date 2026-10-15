/* Task 2
Write a signup endpoint in Node that accepts a username and email, and 
validate the inputs to ensure the username is at least 4 characters and 
the email contains '@' and '.', returning an error message if validation fails.

Hint: Use express-validator or write custom validation logic before saving the data. */

const express = require('express');
const app = express();

app.use(express.json());

// custom validation (simple student way)
function validateSignup(username, email) {
    if (!username || username.length < 4) {
        return "Username must be at least 4 characters";
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
        return "Email must contain @ and .";
    }

    return null; // no error means valid
}

// signup endpoint
app.post('/signup', (req, res) => {
    let username = req.body.username;
    let email = req.body.email;

    let error = validateSignup(username, email);

    if (error) {
        return res.status(400).json({ error: error });
    }

    // if valid, "save" user (just fake for now)
    res.json({
        message: "Signup successful!",
        user: { username: username, email: email }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("Test with POST /signup");
});

// To run : node signup.js
// Test with:
// curl -X POST http://localhost:3000/signup -H "Content-Type: application/json" -d "{\"username\":\"meet\",\"email\":\"meet@gmail.com\"}"
