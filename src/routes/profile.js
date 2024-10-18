const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileApi } = require("../utils/validation");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.get("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileApi(req)) {
      throw new Error("Not allowed to update few fields");
    }
    const loggedinUser = req.user;
    Object.keys(req.body).forEach((k) => (loggedinUser[k] = req.body[k]));
    await loggedinUser.save();
    res.json({ message: "Profile updated succesfully", data: loggedinUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
