require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");
const seedAdmin = require("./utils/seedAdmin");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/static", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => seedAdmin())
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
  });
