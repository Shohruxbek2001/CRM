const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.admins.findMany();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await prisma.admins.findUnique({
      where: { id: id },
    });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const dbemail = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });
    if (dbemail) {
      res.status(500).json({
        message: "Bu email allaqachon bazada mavjud!",
      });
    } else {
      const admin = await prisma.admins.create({
        data: {
          name: name || "Admin",
          email: email,
          password: bcrypt.hashSync(password, 10),
          role: "admin",
        },
      });
      res.status(201).json({ message: "Admin Created!", admin });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const Admin = await prisma.admins.update({
      where: { id },
      data: {
        ...body,
      },
    });
    res.status(200).json({ message: "Admin Updated!", Admin });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await prisma.admins.delete({
      where: { id },
    });
    res.status(200).json({ message: "Admin Deleted!", admin });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllAdmins,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
