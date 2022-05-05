const { Router } = require("express");
const {
  getAllTeachers,
  getOneTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers.controllers.js");

const router = Router();

router.get("/", getAllTeachers);
router.get("/:id", getOneTeacher);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;
