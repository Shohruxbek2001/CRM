const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllBranches = async (req, res) => {
  try {
    const branches = await prisma.branches.findMany();
    res.status(200).json(branches);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await prisma.branches.findUnique({
      where: { id: id },
    });
    res.status(200).json(branch);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createBranch = async (req, res) => {
  try {
    const { branch_name } = req.body;
    const branch = await prisma.branches.create({
      data: {
        name: branch_name,
      },
    });
    res.status(201).json({ message: "Branch Created!", branch });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateBranch = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const Branch = await prisma.branches.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "Branch Updated!", Branch });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await prisma.branches.delete({
      where: { id }
    });
    res.status(204).json({ message: "Branch Deleted!", branch });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllBranches,
  getOneBranch,
  createBranch,
  updateBranch,
  deleteBranch,
};
