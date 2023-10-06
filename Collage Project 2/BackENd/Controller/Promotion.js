const Promotion = require("../model/Promotion");
const Product = require("../model/Product");

const addPromotion = async (req, res) => {
  const { productID, newPrice, endDate } = req.body;
  try {
    const product = await Product.findById(productID);
    if (!product) {
      return res.json(500).json({ erro: "promotion not found" });
    }
    const newPromotion = new Promotion({
      productID: productID,
      newPrice: newPrice,
      endDate: endDate,
    });
    await newPromotion.save();
    res.status(200).json({ error: "promotion has been added" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal issue" });
  }
};

const getPromotion = async (req, res) => {
  try {
    const promotionProducts = await Promotion.find();

    if (!promotionProducts || promotionProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "There is not products for promotion" });
    }
    const transformedPromotionProduct = await Promise.all(
      promotionProducts.map(async (promotionProduct) => {
        const product = await Product.findById(promotionProduct.productID);

        return {
          promotionID: promotionProduct._id,
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
    res.json(transformedPromotionProduct);
  } catch (error) {
    console.log(error);
    res.json({ error: "internal issue" });
  }
};

const updatePromotion = async (req, res) => {
  const { productID, updatedPrice, extentedEndDate } = req.body;

  try {
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(200).json({ error: "Product not found" });
    }
    let promotion = await Promotion.findOne({ productID });

    if (!promotion) {
      return res.status(200).json({ error: "Promotion not found" });
    }
    if (updatedPrice) {
      promotion.newPrice = updatedPrice;
    }

    if (extentedEndDate) {
      promotion.endDate = extentedEndDate;
    }

    await promotion.save();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    message: "Promotion updated successfully",
  });
};
const removePromotion = async (req, res) => {
  const { promotionID } = req.body;
  try {
    const removeProm = await Promotion.findByIdAndRemove(promotionID);
    if (!removeProm) {
      return res.status(200).json({ error: "Promotion not found" });
    }

    res.json({ message: "Promotion deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addPromotion,
  getPromotion,
  updatePromotion,
  removePromotion,
};
