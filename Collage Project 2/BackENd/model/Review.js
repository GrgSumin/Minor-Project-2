const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  Message: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
});

let collectionName = "Review";
module.exports = mongoose.model(collectionName, ReviewSchema);
