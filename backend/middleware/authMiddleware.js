const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { verifyToken } = require("../config/jwt");

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized — no token");
  }
  const token = header.split(" ")[1];
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    res.status(401);
    throw new Error("Not authorized — invalid token");
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401);
    throw new Error("Not authorized — user no longer exists");
  }
  req.user = user;
  next();
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  res.status(403);
  throw new Error("Admin access required");
};

module.exports = { protect, isAdmin };
