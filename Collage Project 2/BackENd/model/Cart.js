const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
});
let collectionname = "Carts";
module.exports = mongoose.model(collectionname, cartSchema);
