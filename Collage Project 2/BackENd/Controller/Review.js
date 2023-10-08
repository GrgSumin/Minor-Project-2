const Review = require("../model/Review");

const createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const product = new Review(req.body);
    await product.save();
    return res.json({ message: "Review Created" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getReviewbyProductId = async (req, res) => {
  const productId = req.params.productId;
  try {
    const products = await Review.find({ productID: productId }).populate(
      "productID"
    );
    console.log(products);
    return res.json(products);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { createProduct, getReviewbyProductId };
