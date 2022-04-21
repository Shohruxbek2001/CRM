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
    const { name, email, password, role_id } = req.body;
    const admin = await prisma.admins.create({
      data: {
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role_id: role_id
      },
    });
    res.status(201).json({ message: "Admin Created!", admin });
  } catch (err) {
    res.status(500).json(err);
  }
};

// const updateAdmin = async (req, res) => {
//   try {
//     const body = req.body;
//     const { id } = req.params;
//     const Admin = await prisma.Admin.update({
//       where: { id },
//       data: {
//         ...body
//       },
//     });
//     res.status(200).json({ message: "Admin Updated!", Admin });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await prisma.admins.delete({
      where: { id }
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
  // updateAdmin,
  deleteAdmin,
};
