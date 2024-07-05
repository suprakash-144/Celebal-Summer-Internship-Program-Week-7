const express = require("express");
const jwt = require("jsonwebtoken");
// middleware
function chechklogintoken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SCRET, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = chechklogintoken;
