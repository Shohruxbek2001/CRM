const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const auth = require("./middlewares/auth");

require("dotenv").config();
PORT = process.env.PORT || 8000;
const app = express();

const prisma = new PrismaClient();

// * Middlewares

app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

// * Import Routes

const roleRoutes = require("./routes/role.routes");
const adminRoutes = require("./routes/admin.routes");
const regionRoutes = require("./routes/region.routes");
const cityRoutes = require("./routes/city.routes");
const branchesRoutes = require("./routes/branches.routes");
const forecastsRoutes = require("./routes/forecast.routes");
const roomsRoutes = require("./routes/rooms.routes");
const coursesRoutes = require("./routes/courses.routes");
const groupsRoutes = require("./routes/groups.routes");
const usersRoutes = require("./routes/user.routes");
const priceListRoutes = require("./routes/priceList.routes");

// * Routes Middlewares

app.use("/api/roles", roleRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/forecasts", forecastsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/prices", priceListRoutes);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      return res.status(200).json({
        user: user,
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
      message: "Serverda xatoliq yuzaga keldi!",
    });
  }
});
module.exports = app;
