const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllRegions = async (req, res) => {
  try {
    const regions = await prisma.region.findMany();
    res.status(200).json(regions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await prisma.region.findUnique({
      where: { id: id },
    });
    res.status(200).json(region);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRegion = async (req, res) => {
  try {
    const { name } = req.body;
    const region = await prisma.region.create({
      data: {
        name: name,
      },
    });
    res.status(201).json({ message: "Region Created!", region });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRegion = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const region = await prisma.region.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "Region Updated!", region });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await prisma.region.delete({
      where: { id }
    });
    res.status(204).json({ message: "Region Deleted!", region });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRegions,
  getOneRegion,
  createRegion,
  updateRegion,
  deleteRegion,
};
