const { Router } = require("express");
const {
  getAllForecasts,
  getOneForecast,
  createForecast,
  updateForecast,
  deleteForecast,
} = require("../controllers/forecast.controllers.js");

const router = Router();

router.get("/", getAllForecasts);
router.get("/:id", getOneForecast);
router.post("/", createForecast);
router.put("/:id", updateForecast);
router.delete("/:id", deleteForecast);

module.exports = router;
