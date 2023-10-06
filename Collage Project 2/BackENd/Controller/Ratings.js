const Rating = require("../model/Rating");
const User = require("../model/User");
const Product = require("../model/Product");

const giveRating = async (req, res) => {
  const { userID, productID, stars, message } = req.body;

  try {
    const user = await User.findById(userID);
    const product = await Product.findById(productID);

    if (!user || !product) {
      return res.status(404).json({ error: "User or Product not found" });
    }
    if (Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({ error: "Stars should be between 1 and 5" });
    }

    const existingRating = await Rating.findOne({ userID, productID });

    if (existingRating) {
      existingRating.stars = stars;
      existingRating.message = message;
      await existingRating.save();
    } else {
      const newRating = new Rating({
        userID,
        productID,
        stars,
        message,
      });
      await newRating.save();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getRating = async (req, res) => {
  const { productID } = req.body;
  try {
    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const ratings = await Rating.findById();
    if (!ratings || ratings.length === 0) {
      return res
        .status(200)
        .json({ message: "No ratings found for the product" });
    }
    const totalStars = ratings.reduce((sun, rating) => sum + rating.starts, 0);
    const averageStars = totalStars / ratings.length;
    res.status(200).json({ averageStars, totalRatings: ratings.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { giveRating, getRating };
