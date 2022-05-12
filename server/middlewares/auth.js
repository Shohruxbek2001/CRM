const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(401);
    return res.send(
      "Kechirasiz, Sizga ushbu sahifalarga kirishga ruxsat berilmagan!"
    );
  }
  next();
};

module.exports = {
  authUser,
  authRole,
};
