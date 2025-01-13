const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization header missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = { authMiddleware };
