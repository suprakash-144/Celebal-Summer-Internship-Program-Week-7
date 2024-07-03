var express = require("express");
var jwt = require("jsonwebtoken");
// middleware
function chechklogintoken(req, res, next) {
  try {
    var logintoken = localStorage.getItem("usertoken");
    var decoded = jwt.verify(logintoken, "loginid");
    console.log("done");
  } catch (error) {
    res.redirect("/");
  }
  next();
}
module.exports = chechklogintoken;
