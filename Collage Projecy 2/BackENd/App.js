const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan")

dotenv.config();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());


const port = process.env.PORT || 4000;


const accRoutes = require("./Routes/Accounts");
const productRoutes = require("./Routes/ProductRoute");


mongoose
  .connect(process.env.DB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb sucessfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/accounts", accRoutes);
app.use("/api/product", productRoutes);



app.listen(port, () => {
  console.log("listining at PORT", port);
});
