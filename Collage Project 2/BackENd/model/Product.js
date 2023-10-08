const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Brand: {
      type: String,
      required: true,
    },
    Category: {
      //2:19:00
      type: String,
      // ref:"Category",
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Image: {
      type: String,
    },
    Availability: {
      type: Boolean,
      default: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Ratings: {
      star: Number,
      postedby: { type: mongoose.Schema.Types.ObjectId },
    },
  },
  {
    timestamps: true,
  }
);

//Export the model

let collectionname = "Product";
module.exports = mongoose.model(collectionname, ProductSchema);
