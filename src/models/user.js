const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  emailId: {
    type: String,
  },
  passWord: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
