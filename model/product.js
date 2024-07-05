const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: { type: String, require: true },
    Quantity: { type: Number, required: true },
    Brand: { type: String, required: true },
    Price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
