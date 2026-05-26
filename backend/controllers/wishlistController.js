const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/Wishlist");

const list = asyncHandler(async (req, res) => {
  const items = await Wishlist.find({ user: req.user._id })
    .populate({
      path: "product",
      populate: [
        { path: "brand", select: "name" },
        { path: "category", select: "name" },
      ],
    })
    .sort({ createdAt: -1 });
  res.json(items);
});

const toggle = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    res.status(400);
    throw new Error("productId is required");
  }
  const existing = await Wishlist.findOne({ user: req.user._id, product: productId });
  if (existing) {
    await existing.deleteOne();
    return res.json({ added: false });
  }
  await Wishlist.create({ user: req.user._id, product: productId });
  res.json({ added: true });
});

const remove = asyncHandler(async (req, res) => {
  await Wishlist.findOneAndDelete({ user: req.user._id, product: req.params.productId });
  res.json({ message: "Removed from wishlist" });
});

module.exports = { list, toggle, remove };
