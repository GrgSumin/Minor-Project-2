const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var BrandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: true,
  }
);

//Export the model
let collectionname = "Brand";
module.exports = mongoose.model(collectionname, BrandSchema);
