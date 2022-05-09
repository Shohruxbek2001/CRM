const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllPrices = async (req, res) => {
  try {
    const prices = await prisma.price_list.findMany();
    res.status(200).json(prices);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOnePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await prisma.price_list.findUnique({
      where: { id: id },
    });
    res.status(200).json(price);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createPrice = async (req, res) => {
  try {
    const { price } = req.body;
    const price_ = await prisma.price_list.create({
      data: {
        price: parseFloat(price),
      },
    });
    res.status(201).json({ message: "Price Created!", price_ });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePrice = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const price = await prisma.price_list.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "Price Updated!", price });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await prisma.price_list.delete({
      where: { id }
    });
    res.status(204).json({ message: "Price Deleted!", price });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPrices,
  getOnePrice,
  createPrice,
  updatePrice,
  deletePrice,
};
