const {User} = require("../db/index");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  let username = req.headers.username;
  let password = req.headers.password;

  let user = await User.findOne({username});
  if (!user) {
    return res.status(411).json({
      msg: "user doesn't exist."
    })
  }
  if (!user.password === password) {
    return res.status(411).json({
      msg: "wrong password entered."
    })
  }
  next();
}

module.exports = userMiddleware;