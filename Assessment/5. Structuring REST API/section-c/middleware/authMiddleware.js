const jwt = require("jsonwebtoken");

const SECRET = "fooddeliverysecret";

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: true, message: "Token is missing" });
  }

  const token = header.split(" ")[1];

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: true, message: "Token is invalid or expired" });
  }
}

module.exports = { authMiddleware, SECRET };
