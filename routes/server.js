const express = require("express");
const User = require("../model/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  try {
    var salt = await bcrypt.genSalt();
    let hashpassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
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
    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    let result = bcrypt.compare(password, user.password);
    if (result) {
      var token = jwt.sign({ userid: user._id }, process.env.JWT_SCRET, {
        expiresIn: "1d",
      });
      // localStorage.setItem("usertoken", token);
      // localStorage.setItem("loginuser", username);
      res.send(token);
    } else {
      res.send("Invalid Password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
