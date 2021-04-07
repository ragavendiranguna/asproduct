const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    trim: true,
  },
  product_image: {
    type: String,
    required:true
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;