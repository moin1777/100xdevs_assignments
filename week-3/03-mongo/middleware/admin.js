// Middleware for handling auth
const {Admin} = require("../db/index");
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  let username = req.headers.username;
  let password = req.headers.password;

  let admin = await Admin.findOne({username});
  if (!admin) {
    return res.status(411).json({
      msg: "admin doesn't exist."
    })
  }
  if (!admin.password === password) {
    return res.status(411).json({
      msg: "wrong password entered."
    })
  }
  next();
}

module.exports = adminMiddleware;