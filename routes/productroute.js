const express = require("express");
const Product = require("../model/product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(200).send(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Product = await Product.findById(id);
    res.status(200).send(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const Product = await Product.create({
      Name: req.body.Name,
      Quantity: req.body.Quantity,
      Brand: req.body.Brand,
      Price: req.body.Price,
    });
    await Product.save();
    res.status(201).send(Product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).send(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Product = await Product.findByIdAndDelete(id);
    res.status(201).send(Product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
