const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

let collectionName = "Promotion";
module.exports = mongoose.model(collectionName, promotionSchema);
