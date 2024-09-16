const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No Authorization Header Found",
    });
  }

  const words = authHeader.split(" ");

  if (words[0] != "Bearer" || words.lenght !== 2) {
    return res.status(401).json({
      message: "Invalid Token Format",
    });
  }

  const token = words[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({
        message: "Invalid Token",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some Error Occured",
    });
  }
};

module.exports = authMiddleware;
