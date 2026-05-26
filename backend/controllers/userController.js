const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { listUsers };
