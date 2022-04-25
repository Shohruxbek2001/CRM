const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllForecasts = async (req, res) => {
  try {
    const forecasts = await prisma.forecast.findMany();
    res.status(200).json(forecasts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneForecast = async (req, res) => {
  try {
    const { id } = req.params;
    const forecast = await prisma.forecast.findUnique({
      where: { id: id },
    });
    res.status(200).json(forecast);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createForecast = async (req, res) => {
  try {
    const { name, forecast_arrived, forecast_students, date_of_forecast } = req.body;
    const forecast = await prisma.forecast.create({
      data: {
        name: name,
        forecast_arrived: forecast_arrived,
        forecast_students: forecast_students,
        date_of_forecast: new Date(date_of_forecast),
      },
    });
    res.status(201).json({ message: "Forecast Created!", forecast });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateForecast = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const Forecast = await prisma.forecast.update({
      where: { id },
      data: {
        ...body
      },
    });
    res.status(200).json({ message: "Forecast Updated!", Forecast });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteForecast = async (req, res) => {
  try {
    const { id } = req.params;
    const forecast = await prisma.forecast.delete({
      where: { id }
    });
    res.status(204).json({ message: "Forecast Deleted!", forecast });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllForecasts,
  getOneForecast,
  createForecast,
  updateForecast,
  deleteForecast,
};
