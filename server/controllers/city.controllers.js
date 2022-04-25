const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllCities = async (req, res) => {
  try {
    const cities = await prisma.city.findMany();
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await prisma.city.findUnique({
      where: { id: id },
    });
    res.status(200).json(city);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createCity = async (req, res) => {
  try {
    const { name, region_id } = req.body;
    const city = await prisma.city.create({
      data: {
        name: name,
        region_id: region_id
      },
    });
    res.status(201).json({ message: "City Created!", city });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCity = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const city = await prisma.city.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "City Updated!", city });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city = await prisma.city.delete({
      where: { id }
    });
    res.status(204).json({ message: "City Deleted!", city });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllCities,
  getOneCity,
  createCity,
  updateCity,
  deleteCity,
};
