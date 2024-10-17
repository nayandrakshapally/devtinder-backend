const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

// Signup api
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).send("User saved successfully on to db");
  } catch (err) {
    res.status(500).send(" Failed User insertion on to db" + err.message);
  }
});

// Feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("No users found");
    }
  } catch (err) {
    res.status(404).send("Feed api error");
  }
});

// User api
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("No user found");
    }
  } catch (err) {
    res.status(404).send("User api error");
  }
});

// Delete user api
app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("Delete api error");
  }
});

//Update user api
app.patch("/updateUser", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("Update api error"+err.message);
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
