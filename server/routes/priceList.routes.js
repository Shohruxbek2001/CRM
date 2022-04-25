const { Router } = require("express");
const {
  getAllPrices,
  getOnePrice,
  createPrice,
  updatePrice,
  deletePrice,
} = require("../controllers/priceList.controllers.js");

const router = Router();

router.get("/", getAllPrices);
router.get("/:id", getOnePrice);
router.post("/", createPrice);
router.put("/:id", updatePrice);
router.delete("/:id", deletePrice);

module.exports = router;
