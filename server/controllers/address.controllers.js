const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllAddress = async (req, res) => {
  try {
    const address = await prisma.address.findMany();
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await prisma.address.findUnique({
      where: { id: id },
    });
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createAddress = async (req, res) => {
  try {
    const { name } = req.body;
    const address = await prisma.address.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ message: "Address Created!", address });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAddress = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const address = await prisma.address.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "Address Updated!", address });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await prisma.address.delete({
      where: { id }
    });
    res.status(204).json({ message: "Address Deleted!", address });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllAddress,
  getOneAddress,
  createAddress,
  updateAddress,
  deleteAddress,
};
