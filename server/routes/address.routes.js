const { Router } = require("express");
const {
  getAllAddress,
  getOneAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controllers.js");

const router = Router();

router.get("/", getAllAddress);
router.get("/:id", getOneAddress);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;
