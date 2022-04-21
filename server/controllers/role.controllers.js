const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllRoles = async (req, res) => {
  try {
    const roles = await prisma.roles.findMany();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await prisma.roles.findUnique({
      where: { id: id },
    });
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await prisma.roles.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ message: "Role Created!", role });
  } catch (err) {
    res.status(500).json(err);
  }
};

// const updateRole = async (req, res) => {
//   try {
//     const body = req.body;
//     const { id } = req.params;
//     const Role = await prisma.Role.update({
//       where: { id },
//       data: {
//         ...body
//       },
//     });
//     res.status(200).json({ message: "Role Updated!", Role });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await prisma.roles.delete({
      where: { id }
    });
    res.status(204).json({ message: "Role Deleted!", role });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRoles,
  getOneRole,
  createRole,
  // updateRole,
  deleteRole,
};
