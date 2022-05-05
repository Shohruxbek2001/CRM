const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: { id: id },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    console.log(body)
    const user = await prisma.users.create({
      data: {
        ...body,
      },
    });
    res.status(201).json({ message: "User Created!", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    let body = req.body;
    body.password = bcrypt.hashSync(body.password, 10);
    const { id } = req.params;
    const User = await prisma.users.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "User Updated!", User });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.delete({
      where: { id },
    });
    res.status(204).json({ message: "User Deleted!", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
