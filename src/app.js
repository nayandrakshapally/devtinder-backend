const express = require("express");

const app = express();

app.get(
  "/dashboard",
  (req, res, next) => {
    // res.send("Here we go dashboard!");
    next();
  },
  (req, res, next) => {
    // res.send("Here we go dashboard2!");
    next();
  },
  (req, res, next) => {
    res.send("Here we go dashboard3!");
  }
);

app.use("/test", (req, res) => {
  res.send("Here we go test!");
});

app.listen(4000, () => {
  console.log("Backend is running on port 4000");
});
