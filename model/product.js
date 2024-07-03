const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: { type: string, require: true },
    Quantity: { type: number, required: true },
    Brand: { type: string, required: true },
    Price: {
      type: number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
