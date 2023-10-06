const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  cartItems: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    defcartault: Date.now(),
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  expectedTime: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "unpaid",
  },
});
let collectionname = "Order";
module.exports = mongoose.model(collectionname, orderSchema);
