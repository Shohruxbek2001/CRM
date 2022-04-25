const { Router } = require("express");
const {
  getAllCities,
  getOneCity,
  createCity,
  updateCity,
  deleteCity,
} = require("../controllers/city.controllers.js");

const router = Router();

router.get("/", getAllCities);
router.get("/:id", getOneCity);
router.post("/", createCity);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

module.exports = router;
