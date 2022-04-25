const { Router } = require("express");
const {
  getAllAdmins,
  getOneAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controllers.js");

const router = Router();

router.get("/", getAllAdmins);
router.get("/:id", getOneAdmin);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
