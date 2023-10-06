const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Phonenumber: {
    type: Number,
    required: true,
  },
  Points: {
    type: Number,
    default: 0,
  },
  Role: {
    type: String,
    default: "user",
  },
});

let collectionname = "User";
module.exports = mongoose.model(collectionname, userSchema);
