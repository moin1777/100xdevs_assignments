const { Router, json} = require("express");
const router = Router();
const {User} = require("../db/index");
const {Course} = require("../db/index");
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
  let username = req.body.username;
  let password = req.body.password;
  await User.create({
    username,
    password
  })
  res.json({
    msg: "User created successfully"
  })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
  let courses = await Course.find({});
  res.json({
    courses
  })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
  let username = req.headers.username;
  let courseId = req.params.courseId;
  await User.findOneAndUpdate({username: username}, {
    "$push": {
      purchasedId: courseId
    }
  })
  res.json({
    msg: "Course purchased successfully"
  });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
  let username = req.headers.username;
  let user = await User.findOne({username});
  // console.log(user.purchasedId);
  let purchasedCourses = await Course.find({
    _id: {
      "$in": user.purchasedId
    }
  });

  res.json({
    purchasedCourses
  })
});

module.exports = router