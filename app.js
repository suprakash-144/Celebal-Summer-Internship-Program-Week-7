const express = require("express");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose
  .connect(process.env.DATABASE_URL)
  .then((data) => {
    console.log("connected DB");
  })
  .catch((err) => {
    console.warn(err);
  });

app.use(express.json());

// app.get("/", async (req, res) => {
//   res.send("hello");
// });
// users router
const Userroute = require("./routes/server");
app.use("/api", Userroute);
// //Product router
const Productrouter = require("./routes/productroute");
app.use("/api/product", Productrouter);

app.use(notFound);
app.use(errorHandler);
app.listen(3000, (err) => {
  console.log("connected");
});
