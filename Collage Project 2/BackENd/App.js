const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

dotenv.config();
const cors = require("cors");
app.use("/static", express.static("uploads"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan());

const port = process.env.PORT || 4000;

const accRoutes = require("./Routes/Accounts");
const productRoutes = require("./Routes/ProductRoute");
const CategoryRoutes = require("./Routes/CategoryRoute");
const BrandRoutes = require("./Routes/BrandRoutes");
const OrderRoutes = require("./Routes/OrdersRoute");
const CartRoutes = require("./Routes/CartRoute");
const PromotionRoutes = require("./Routes/PromotionRoute");
const FavRoutes = require("./Routes/FavRoute");
const ReviewRoutes = require("./Routes/ReviewRoute");

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
app.use("/api/category", CategoryRoutes);
app.use("/api/brand", BrandRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/promotion", PromotionRoutes);
app.use("/api/fav", FavRoutes);
app.use("/api/review", ReviewRoutes);

app.post("api/khalti-api", async (req, res) => {
  const payload = req.body;
  const khaltiResponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );
  console.log(khaltiResponse);
  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
  console.log(khaltiResponse);
});

app.listen(port, () => {
  console.log("listining at PORT", port);
});
