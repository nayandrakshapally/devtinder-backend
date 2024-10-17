const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", (req, res) => {
  const user = new User({
    firstName: "nipun",
    lastName: "drakshapally",
    gender: "male",
    age: 28,
    emailId: "nipun.drak@gmail.com",
    passWord: "test1234",
  });
  try {
    user.save();
    res.status(200).send("User saved successfully on to db");
  } catch (err) {
    res.status(500).send(" Failed User insertion on to db");
  }
});
connectDb()
  .then(() => {
    console.log("DB connection established!");
    app.listen(4000, () => {
      console.log("Backend is running on port 4000");
    });
  })
  .catch(() => {
    console.log("Error connecting DB!");
  });
