const { Router } = require("express");
const {
  getAllBranches,
  getOneBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("../controllers/branches.controllers.js");

const router = Router();

router.get("/", getAllBranches);
router.get("/:id", getOneBranch);
router.post("/", createBranch);
router.put("/:id", updateBranch);
router.delete("/:id", deleteBranch);

module.exports = router;
