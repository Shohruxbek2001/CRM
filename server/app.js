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

// * Routes Middlewares

app.use("/api/roles", auth, require("./routes/role.routes"));
app.use("/api/admins", auth, require("./routes/admin.routes"));
app.use("/api/regions", auth, require("./routes/region.routes"));
app.use("/api/cities", auth, require("./routes/city.routes"));
app.use("/api/branches", auth, require("./routes/branches.routes"));
app.use("/api/forecasts", auth, require("./routes/forecast.routes"));
app.use("/api/rooms", auth, require("./routes/rooms.routes"));
app.use("/api/courses", auth, require("./routes/courses.routes"));
app.use("/api/groups", auth, require("./routes/groups.routes"));
app.use("/api/prices", auth, require("./routes/priceList.routes"));

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });
    // console.log(user);
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
