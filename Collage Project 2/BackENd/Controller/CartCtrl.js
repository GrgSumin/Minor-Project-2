const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const cartItem = await Cart.findOne({ userID, productID });

    if (cartItem) {
      return res.json({ message: "Item already exists in cart" });
    }

    const newCart = new Cart({
      userID: userID,
      productID,
    });
    await newCart.save();

    res.status(200).json({ message: "added to cart " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error " });
    console.log(error);
  }
};

const getCart = async (req, res) => {
  const { userID } = req.body;
  try {
    const CartItems = await Cart.find({ userID: userID });
    if (!CartItems || CartItems.length === 0) {
      return res.json({ message: "there is no product in Cart" });
    }
    const tranformCartItems = await Promise.all(
      CartItems.map(async (CartItem) => {
        const product = await Product.findById(CartItem.productID);
        return {
          cartID: CartItem._id,
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
    res.json(tranformCartItems);
  } catch (error) {
    console.log(error);
  }
};
const removeCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "product has been deleted" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addCart, getCart, removeCart };
