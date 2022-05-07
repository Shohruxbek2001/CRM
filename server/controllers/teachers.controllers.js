const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teachers.findMany();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teachers.findUnique({
      where: { id: id },
    });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createTeacher = async (req, res) => {
  try {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const teacher = await prisma.teachers.create({
      data: {
        ...body,
      },
    });
    res.status(201).json({ message: "Teacher Created!", teacher });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTeacher = async (req, res) => {
  try {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const { id } = req.params;
    const Teacher = await prisma.teachers.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "Teacher Updated!", Teacher });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teachers.delete({
      where: { id },
    });
    res.status(204).json({ message: "Teacher Deleted!", teacher });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTeachers,
  getOneTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};