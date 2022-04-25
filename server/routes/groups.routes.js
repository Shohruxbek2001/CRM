const { Router } = require("express");
const {
  getAllGroups,
  getOneGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groups.controllers.js");

const router = Router();

router.get("/", getAllGroups);
router.get("/:id", getOneGroup);
router.post("/", createGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

module.exports = router;
