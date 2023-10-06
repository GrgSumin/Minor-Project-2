const Favorite = require("../model/Favorites");
const Product = require("../model/Product");

const addFavorite = async (req, res) => {
  try {
    const { userID, productID } = req.body;

    const newFavorite = new Favorite({
      userID: userID,
      productID: productID,
    });
    await newFavorite.save();

    res.status(200).json({
      message: "added to your wishList",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFavProduct = async (req, res) => {
  try {
    const { userID } = req.body;
    const favoriteProducts = await Favorite.find({ userID: userID });

    if (!favoriteProducts || favoriteProducts.length === 0) {
      return res.status(200).json({ message: "No favorite items found" });
    }

    const transformedFavoriteProduct = await Promise.all(
      favoriteItems.map(async (favoriteProduct) => {
        const product = await Product.findById(favoriteProduct.itemID);

        return {
          favoriteID: favoriteProduct._id,
          productID: product._id,
          title: product.title,
          Brand: product.Brand,
          Category: product.Category,
          Price: product.Price,
          Quantity: product.Quantity,
          Image: product.Image,
          Availability: product.Availability,
          Description: product.Description,
          Ratings: product.Ratings,
        };
      })
    );

    res.json(transformedFavoriteItems);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const removeFavProduct = async (req, res) => {
  try {
    const { favoriteID } = req.body;

    const favoriteProduct = await Favorite.findByIdAndRemove(favoriteID);

    if (!favoriteProduct) {
      return res.status(200).json({ error: "Favorite item not found" });
    }

    res.json({ message: "Favorite item deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addFavorite, getFavProduct, removeFavProduct };
