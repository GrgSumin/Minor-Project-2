const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:4000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

const accRoutes = require("./Routes/Accounts.jsx");

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

app.listen(port, () => {
  console.log("listining at PORT", port);
});
