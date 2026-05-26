const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text" });

productSchema.pre("validate", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Date.now().toString(36);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
