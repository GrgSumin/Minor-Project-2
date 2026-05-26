const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const listProducts = asyncHandler(async (req, res) => {
  const {
    q,
    category,
    brand,
    minPrice,
    maxPrice,
    sort = "newest",
    page = 1,
    limit = 12,
    featured,
  } = req.query;

  const filter = {};
  if (q) filter.$or = [{ title: new RegExp(q, "i") }, { description: new RegExp(q, "i") }];
  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (featured === "true") filter.featured = true;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "rating-desc": { rating: -1 },
  };

  const pageNum = Math.max(1, Number(page));
  const lim = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * lim;

  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate("brand", "name")
      .populate("category", "name")
      .sort(sortMap[sort] || sortMap.newest)
      .skip(skip)
      .limit(lim),
    Product.countDocuments(filter),
  ]);

  res.json({ items, total, page: pageNum, pages: Math.ceil(total / lim) });
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("brand", "name")
    .populate("category", "name");
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, stock, brand, category, featured } = req.body;
  if (!title || !description || !price || !brand || !category) {
    res.status(400);
    throw new Error("Missing required fields");
  }
  const product = await Product.create({
    title,
    description,
    price: Number(price),
    stock: Number(stock) || 0,
    brand,
    category,
    featured: featured === "true" || featured === true,
    image: req.file ? req.file.filename : undefined,
  });
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const fields = ["title", "description", "price", "stock", "brand", "category", "featured"];
  for (const f of fields) {
    if (req.body[f] !== undefined) {
      if (f === "featured") product[f] = req.body[f] === "true" || req.body[f] === true;
      else product[f] = req.body[f];
    }
  }
  if (req.file) product.image = req.file.filename;
  await product.save();
  res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ message: "Product deleted" });
});

const getRelated = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Prefer same category + same brand, then fall back to same category only.
  const primary = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    brand: product.brand,
  })
    .populate("brand", "name")
    .populate("category", "name")
    .sort({ rating: -1, numReviews: -1 })
    .limit(8);

  if (primary.length >= 4) return res.json(primary);

  const fillerNeeded = 8 - primary.length;
  const filler = await Product.find({
    _id: { $ne: product._id, $nin: primary.map((p) => p._id) },
    category: product.category,
  })
    .populate("brand", "name")
    .populate("category", "name")
    .sort({ rating: -1, numReviews: -1 })
    .limit(fillerNeeded);

  res.json([...primary, ...filler]);
});

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct, getRelated };
