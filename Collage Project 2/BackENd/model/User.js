const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};
let collectionname = "User";
module.exports = mongoose.model(collectionname, userSchema);
