const mongoose = require("mongoose");

async function connectDB() {
  const url = process.env.DB_URL;
  if (!url) throw new Error("DB_URL is not set");
  await mongoose.connect(url);
  console.log("MongoDB connected");
}

module.exports = connectDB;
