const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pname: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    ratings: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
