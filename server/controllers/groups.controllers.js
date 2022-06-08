const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllGroups = async (req, res) => {
  try {
    const groups = await prisma.groups.findMany({
      include: {
        users: true,
        teachers: true,
      },
    });
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await prisma.groups.findUnique({
      where: { id: id },
    });
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createGroup = async (req, res) => {
  try {
    const { name, days, course_id, start_date, room_id, teacher_id } = req.body;
    const group = await prisma.groups.create({
      data: {
        name: name,
        days_in_week: days,
        course_id: course_id,
        start_date: new Date(start_date),
        room_id: room_id,
      },
    });
    res.status(201).json({ message: "Group Created!", group });
    if (teacher_id !== "" && group) {
      const teacher = await prisma.teachers.findUnique({
        where: {
          id: teacher_id,
        },
      });
      teacher.group_id = group.id;
      const updatedTeacher = await prisma.teachers.update({
        where: { id: teacher_id },
        data: {
          ...teacher,
        },
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateGroup = async (req, res) => {
  try {
    const { name, days_in_week, course_id, start_date, room_id } = req.body;
    const { id } = req.params;
    const group = await prisma.groups.update({
      where: { id },
      data: {
        name: name,
        days_in_week: days_in_week,
        course_id: course_id,
        start_date: new Date(start_date),
        room_id: room_id,
      },
    });
    res.status(200).json({ message: "Group Updated!", group });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await prisma.groups.delete({
      where: { id },
    });
    res.status(204).json({ message: "Group Deleted!", group });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllGroups,
  getOneGroup,
  createGroup,
  updateGroup,
  deleteGroup,
};
