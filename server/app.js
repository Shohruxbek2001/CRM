const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const { authUser, authRole } = require("./middlewares/auth");

require("dotenv").config();
PORT = process.env.PORT || 8000;
const app = express();

const prisma = new PrismaClient();

// * Middlewares

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

// * Import Routes

const adminRoutes = require("./routes/admin.routes");
const addressRoutes = require("./routes/address.routes");
const branchesRoutes = require("./routes/branches.routes");
const forecastsRoutes = require("./routes/forecast.routes");
const roomsRoutes = require("./routes/rooms.routes");
const coursesRoutes = require("./routes/courses.routes");
const groupsRoutes = require("./routes/groups.routes");
const usersRoutes = require("./routes/user.routes");
const teachersRoutes = require("./routes/teachers.routes");
const priceListRoutes = require("./routes/priceList.routes");

// * Routes Middlewares

// * Only Super admin have access routes
app.use("/api/admins", authUser, authRole(["super"]), adminRoutes);
app.use("/api/forecasts", authUser, authRole(["super", "admin"]), forecastsRoutes);
app.use("/api/courses", authUser, authRole(["super", "admin"]), coursesRoutes);
app.use("/api/teachers", authUser, authRole(["super", "admin"]), teachersRoutes);
app.use("/api/prices", authUser, authRole(["super", "admin"]), priceListRoutes);

// * Only admin have access routes
app.use("/api/address", authUser, authRole(["super", "admin"]), addressRoutes);
app.use("/api/branches", authUser, authRole(["super", "admin"]), branchesRoutes);
app.use("/api/rooms", authUser, authRole(["super", "admin"]), roomsRoutes);
app.use("/api/groups", authUser, authRole(["super", "admin"]), groupsRoutes);
app.use("/api/users", authUser, authRole(["super", "admin"]), usersRoutes);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
      });
      const refreshToken = jwt.sign(admin, process.env.REFRESH_TOKEN_SECRET);
      return res.status(200).json({
        user: admin,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(400).json({
        message: "Email yoki parol noto'g'ri!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Serverda xatoliq yuzaga keldi, iltimos qaytadan harakat qilib ko'ring!",
    });
  }
});
module.exports = app;
