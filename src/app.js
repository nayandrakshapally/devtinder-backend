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

app.listen(4000, () => {
  console.log("Backend is running on port 4000");
});
