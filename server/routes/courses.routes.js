const { Router } = require("express");
const {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controllers.js");

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getOneCourse);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
