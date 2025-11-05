const jwt = require("jsonwebtoken");
const config = require("../configs/config");

/**
 * Middleware to authenticate JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token is required" });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      req.user = decoded; // Add user info to request object
      next();
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = { authenticateToken };

