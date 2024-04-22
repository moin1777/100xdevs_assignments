const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin} = require("../db/index");
const {Course} = require("../db/index")
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
  let username = req.body.username;
  let password = req.body.password;
  await Admin.create({
    username,
    password
  });
  res.json({
    msg: "Admin created successfully"
  });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
  let title = req.body.title;
  let description = req.body.description;
  let price = parseInt(req.body.price);

  let course = await Course.create({
    title,
    description,
    price
  });
  res.json({
    msg: "Course created successfully",
    courseId: course._id
  })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
  let courses = await Course.find({});
  res.json({
    courses
  })
});

module.exports = router;