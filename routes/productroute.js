const express = require("express");
const Product = require("../model/product");
const chechklogintoken = require("../middleware/checkLoginToken");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.get("/", chechklogintoken, async (req, res) => {
  try {
    const Products = await Product.find();
    res.send(Products);
  } catch (error) {
    res.send({ message: error.message });
  }
});
router.get("/:id", chechklogintoken, async (req, res) => {
  const id = req.params.id;
  try {
    const Product = await Product.findById(id);
    res.status(200).send(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", chechklogintoken, isAdmin, async (req, res) => {
  try {
    let Products = await Product.create({
      Name: req.body.Name,
      Quantity: req.body.Quantity,
      Brand: req.body.Brand,
      Price: req.body.Price,
    });
    await Products.save();
    res.status(201).send(Products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/:id", chechklogintoken, async (req, res) => {
  const id = req.params.id;
  try {
    let Products = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).send(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", chechklogintoken, async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findByIdAndDelete(id);
    res.status(201).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
