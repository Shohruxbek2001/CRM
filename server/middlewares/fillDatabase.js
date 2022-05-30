const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createBranch = async () => {
  try {
    const branches = await prisma.branches.findMany();
    if (branches.filter((b) => b.name == "Lead").length == 0) {
      await prisma.branches.create({
        data: {
          name: "Lead",
        },
      });
      console.log("Branch Successfully Created!");
    } else console.log("Branch Already Created!");
  } catch (err) {
    console.log("Error while creating Branch -> " + err);
  }
};

const createPrice = async () => {
  try {
    const prices = await prisma.price_list.findMany();
    if (prices.filter((b) => b.price == 0).length == 0) {
      await prisma.price_list.create({
        data: {
          price: parseFloat(0),
        },
      });
      console.log("Price Successfully Created!");
    } else console.log("Price Already Created!");
  } catch (err) {
    console.log("Error while creating Price -> " + err);
  }
};

const createRoom = async () => {
  try {
    const rooms = await prisma.rooms.findMany();
    const branches = await prisma.branches.findMany();
    if (rooms.filter((b) => b.name == "lead").length == 0) {
      await prisma.rooms.create({
        data: {
          name: "lead",
          amount: 0,
          branch_id: branches.filter(b => b.name === "Lead")[0].id,
        },
      });
      console.log("Room Successfully Created!");
    } else console.log("Room Already Created!");
  } catch (err) {
    console.log("Error while creating Room -> " + err);
  }
};

const createCourse = async () => {
  try {
    const prices = await prisma.price_list.findMany();
    const courses = await prisma.courses.findMany();
    const branches = await prisma.branches.findMany();
    if (courses.filter((b) => b.name == "Lead").length == 0) {
      await prisma.courses.create({
        data: {
          name: "Lead",
          duration: Number(0),
          price_list_id: prices.filter(p => p.price === 0)[0].id,
          per_of_lesson_time: Number(0),
          date_of_start: new Date(),
          branch_id: branches.filter(b => b.name === "Lead")[0].id,
        },
      });
      console.log("Course Successfully Created!");
    } else console.log("Course Already Created!");
  } catch (err) {
    console.log("Error while creating Course -> " + err);
  }
};

const createGroup = async () => {
  try {
    const rooms = await prisma.rooms.findMany();
    const courses = await prisma.courses.findMany();
    const groups = await prisma.groups.findMany();
    if (groups.filter((b) => b.name == "Lead").length == 0) {
      await prisma.groups.create({
        data: {
          name: "Lead",
          days_in_week: "1,3,5",
          course_id: courses.filter(p => p.name === "Lead")[0].id,
          start_date: new Date(),
          room_id: rooms.filter(b => b.name === "lead")[0].id,
        },
      });
      console.log("Group Successfully Created!");
    } else console.log("Group Already Created!");
  } catch (err) {
    console.log("Error while creating Group -> " + err);
  }
};

module.exports = {
  createBranch,
  createRoom,
  createPrice,
  createCourse,
  createGroup
};
