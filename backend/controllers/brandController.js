const asyncHandler = require("express-async-handler");
const Brand = require("../models/Brand");

const list = asyncHandler(async (req, res) => {
  const items = await Brand.find().sort({ name: 1 });
  res.json(items);
});

const create = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }
  const item = await Brand.create({ name: name.trim() });
  res.status(201).json(item);
});

const update = asyncHandler(async (req, res) => {
  const item = await Brand.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true, runValidators: true }
  );
  if (!item) {
    res.status(404);
    throw new Error("Brand not found");
  }
  res.json(item);
});

const remove = asyncHandler(async (req, res) => {
  const item = await Brand.findByIdAndDelete(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Brand not found");
  }
  res.json({ message: "Brand deleted" });
});

module.exports = { list, create, update, remove };
