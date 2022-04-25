const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
PORT = process.env.PORT || 8000;
const app = express();

const prisma = new PrismaClient();

// * Middlewares

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// * Import Routes

const roleRoutes = require("./routes/role.routes");
const adminRoutes = require("./routes/admin.routes");
const regionRoutes = require("./routes/region.routes");
const cityRoutes = require("./routes/city.routes");
const priceListRoutes = require("./routes/priceList.routes");

// * Routes Middlewares

app.use("/api/roles", roleRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/prices", priceListRoutes);

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.admins.findUnique({
      where: {
        email: email,
      },
    });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_id: user.id, email: email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).json({ user: user, accessToken: token });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = app;