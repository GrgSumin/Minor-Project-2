const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { signToken } = require("../config/jwt");

const tokenFor = (user) => signToken({ id: user._id, role: user.role });

const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    res.status(400);
    throw new Error("Email already registered");
  }
  const user = await User.create({ name, email, password, phone });
  res.status(201).json({ user, token: tokenFor(user) });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || "").toLowerCase() });
  if (!user || !(await user.matchPassword(password || ""))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.json({ user, token: tokenFor(user) });
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || "").toLowerCase() });
  if (!user || user.role !== "admin" || !(await user.matchPassword(password || ""))) {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }
  res.json({ user, token: tokenFor(user) });
});

const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;
  if (name !== undefined) req.user.name = name;
  if (phone !== undefined) req.user.phone = phone;
  if (address !== undefined) req.user.address = address;
  await req.user.save();
  res.json({ user: req.user });
});

module.exports = { register, login, adminLogin, me, updateProfile };
