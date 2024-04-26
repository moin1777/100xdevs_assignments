const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
  let username = req.body.username;
  let password = req.body.password;

  await User.create({
    username,
    password
  });
  res.json({
    msg: "User created successfully"
  })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
  let username = req.body.username;
  let password = req.body.password;

  let user = await User.findOne({
    username,
    password
  });

  if (!user) {
    return res.status(403).json({
      msg: "User doesn't exist"
    })
  }

  const token = jwt.sign({username}, JWT_SECRET);
  res.json({
    token
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
  let courseId = req.params.courseId;
  // let token = req.headers.authorization;
  // token = token.split(" ")[1];
  // let username = jwt.verify(token, JWT_SECRET).username;
  let username = req.username;
  let user = await User.findOne({username});

  if (user.purchasedCourses.includes(courseId)) {
    return res.status(400).json({
      msg: "Course already purchased"
    })
  }
  await User.updateOne({
    username
  }, {
    "$push": {
      purchasedCourses: courseId
    }
  })

  res.json({
    msg: "Course purchased successfully"
  })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
  // let token = req.headers.authorization;
  // token = token.split(" ")[1];
  // let username = jwt.verify(token, jwtPassword).username;
  let username = req.username;
  let user = await User.findOne({username});

  let purchasedCourses = await Course.find({
    _id: {
      "$in": user.purchasedCourses
    }
  })

  res.json({
    purchasedCourses
  })
});

module.exports = router