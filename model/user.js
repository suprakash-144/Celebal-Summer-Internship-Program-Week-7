const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    PhoneNumber: { type: Number, required: true },
    address: { type: String },
    usertype: {
      type: String,
      default: "Normal",
      enum: ["Normal", "Elite", "premimum"],
    },
    purchased: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
