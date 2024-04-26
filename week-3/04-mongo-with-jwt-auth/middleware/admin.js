// Middleware for handling auth
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  let token = req.headers.authorization;
  token = token.split(" ")[1];

  try {
    let decodedValue = jwt.verify(token, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      return res.status(403).json({
        msg: "admin is not authorized"
      });
    }
  } catch (e) {
    return res.status(403).json({
      msg: "admin doesn't exist"
    });
  }
}

module.exports = adminMiddleware;