const express = require("express");
const User = require("../model/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      PhoneNumber: req.body.number,
      address: req.body.address,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (bcrypt.compare(password, user.password)) {
      var token = jwt.sign({ userid: user._id }, process.env.JWT_SCRET);
      localStorage.setItem("usertoken", token);
      localStorage.setItem("loginuser", username);
      res.send(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
