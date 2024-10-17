const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/dashboard", (req, res) => {
  res.send("Here we go dashboard!");
});

app.get("/admin/graphs", (req, res) => {
  res.send("Here we go graphs!");
});

app.get("/user", userAuth, (req, res) => {
  res.send("Here we go user!");
});

app.get("/user/login", (req, res) => {
  //try catch implementation is must for each route to handle errors
  try {
    throw new Error("big error!");
    res.send("Here we go user login!");
  } catch (err) {
    res.status(400).send("error in this login api");
  }
});

// Global error handling is must and should keep this at the end of all the routes
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(4000, () => {
  console.log("Backend is running on port 4000");
});
