const express = require("express");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const app = express();
mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Database Connected");
});

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

//users router
const Crudrouter = require("./routes/server");
app.use("/api/", Crudrouter);
//Product router
const productrouter = require("./routes/productroute");
app.use("/api/product/", productrouter);

app.listen(3000, (err) => {
  console.log("connected");
});
