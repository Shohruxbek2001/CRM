const { Router } = require("express");
const {
  getAllRegions,
  getOneRegion,
  createRegion,
  updateRegion,
  deleteRegion,
} = require("../controllers/region.controllers.js");

const router = Router();

router.get("/", getAllRegions);
router.get("/:id", getOneRegion);
router.post("/", createRegion);
router.put("/:id", updateRegion);
router.delete("/:id", deleteRegion);

module.exports = router;
