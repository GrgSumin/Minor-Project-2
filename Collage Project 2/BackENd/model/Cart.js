const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});
let collectionname = "Carts";
module.exports = mongoose.model(collectionname, cartSchema);
