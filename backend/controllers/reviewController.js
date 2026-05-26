const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");
const Product = require("../models/Product");

async function recomputeProductRating(productId) {
  const reviews = await Review.find({ product: productId });
  const numReviews = reviews.length;
  const rating = numReviews ? reviews.reduce((s, r) => s + r.rating, 0) / numReviews : 0;
  await Product.findByIdAndUpdate(productId, { rating, numReviews });
}

const listByProduct = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
  res.json(reviews);
});

const upsertReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  if (!rating || !comment) {
    res.status(400);
    throw new Error("Rating and comment are required");
  }
  const review = await Review.findOneAndUpdate(
    { product: productId, user: req.user._id },
    {
      product: productId,
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment.trim(),
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  await recomputeProductRating(productId);
  res.status(201).json(review);
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  if (req.user.role !== "admin" && review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  const productId = review.product;
  await review.deleteOne();
  await recomputeProductRating(productId);
  res.json({ message: "Review deleted" });
});

module.exports = { listByProduct, upsertReview, deleteReview };
