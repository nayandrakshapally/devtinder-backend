const express = require("express");

const app = express();

app.use("/dashboard", (req, res) => {
  res.send("Here we go dashboard!");
});

app.use("/test", (req, res) => {
  res.send("Here we go test!");
});

app.listen(4000, () => {
  console.log("Backend is running on port 4000");
});
