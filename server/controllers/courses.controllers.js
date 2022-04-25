const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.courses.findMany();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.courses.findUnique({
      where: { id: id },
    });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createCourse = async (req, res) => {
  try {
    const {
      name,
      duration,
      price_list_id,
      per_of_lesson_time,
      date_of_start,
      branch_id,
    } = req.body;
    const course = await prisma.courses.create({
      data: {
        name: name,
        duration: duration,
        price_list_id: price_list_id,
        per_of_lesson_time: per_of_lesson_time,
        date_of_start: new Date(date_of_start),
        branch_id: branch_id,
      },
    });
    res.status(201).json({ message: "Course Created!", course });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCourse = async (req, res) => {
  try {
    const {
      name,
      duration,
      price_list_id,
      per_of_lesson_time,
      date_of_start,
      branch_id,
    } = req.body;
    const { id } = req.params;
    const course = await prisma.courses.update({
      where: { id },
      data: {
        name: name,
        duration: duration,
        price_list_id: price_list_id,
        per_of_lesson_time: per_of_lesson_time,
        date_of_start: new Date(date_of_start),
        branch_id: branch_id,
      },
    });
    res.status(200).json({ message: "Course Updated!", course });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.courses.delete({
      where: { id },
    });
    res.status(204).json({ message: "Course Deleted!", course });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllCourses,
  getOneCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
