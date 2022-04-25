const { Router } = require("express");
const {
  getAllRooms,
  getOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/rooms.controllers.js");

const router = Router();

router.get("/", getAllRooms);
router.get("/:id", getOneRoom);
router.post("/", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
