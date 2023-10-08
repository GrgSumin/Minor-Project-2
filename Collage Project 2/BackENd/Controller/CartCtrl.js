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
    const CartItems = await Cart.find({ userID: userID }).populate("productID");

    return res.json({ data: CartItems });
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
