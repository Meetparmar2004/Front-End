const jwt = require("jsonwebtoken");

// same secret is used while creating and checking the token
const SECRET_KEY = "mysecretkey";

// Task 1: create a JWT with the user's id and email
function generateAuthToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return token;
}

module.exports = {
  SECRET_KEY,
  generateAuthToken,
};
