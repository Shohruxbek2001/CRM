const { Router } = require("express");
const {
  getAllRoles,
  getOneRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../controllers/role.controllers.js");

const router = Router();

router.get("/", getAllRoles);
router.get("/:id", getOneRole);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
