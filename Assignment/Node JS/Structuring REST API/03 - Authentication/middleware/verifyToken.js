const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../auth");

// Task 2 and Task 4: check the token before a protected route runs
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Task 5: review suggestion I used.
    // Earlier I only checked if the header exists, then did split(" ")[1].
    // If someone sent "Bearer" with no token, jwt.verify got undefined and
    // the error was hard to understand. Now I also check that it starts
    // with "Bearer " and that the token part is actually there.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    // Task 4: expired token gets its own message
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired, please login again" });
    }

    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = verifyToken;
