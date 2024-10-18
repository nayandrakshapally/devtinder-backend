const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const validateSignUpApi = require("./utils/validateSignupApi");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Signup api
app.post("/signup", async (req, res) => {
  try {
    //Validating api
    validateSignUpApi(req);
    const {
      firstName,
      emailId,
      passWord,
      lastName,
      age,
      gender,
      skills,
      about,
      photoUrl,
    } = req.body;
    //Encrypting password
    const passWordHash = await bcrypt.hash(passWord, 10);
    const user = new User({
      firstName,
      emailId,
      passWord: passWordHash,
      lastName,
      age,
      gender,
      skills,
      about,
      photoUrl,
    });
    await user.save();
    res.status(200).send("User saved successfully on to db");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// Login api
app.post("/login", async (req, res) => {
  const { emailId, passWord } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login is successful!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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
