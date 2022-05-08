const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.rooms.findMany();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.rooms.findUnique({
      where: { id: id },
    });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createRoom = async (req, res) => {
  try {
    const { room_name, room_amount, branch_id } = req.body;
    const room = await prisma.rooms.create({
      data: {
        name: room_name,
        amount: room_amount,
        branch_id: branch_id,
      },
    });
    res.status(201).json({ message: "Room Created!", room });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRoom = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const Room = await prisma.rooms.update({
      where: { id },
      data: {
        ...body,
      },
    });
    res.status(200).json({ message: "Room Updated!", Room });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.rooms.delete({
      where: { id },
    });
    res.status(204).json({ message: "Room Deleted!", room });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllRooms,
  getOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
