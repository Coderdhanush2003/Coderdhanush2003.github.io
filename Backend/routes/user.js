const express = require("express");
const router = express.Router();

const User = require("../model/userProfile");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await User.findOne({ email });

    if (!users) {
      res.json({ message: "Signup first" });
    } else {
      if (users.password !== password) {
        res.status(400).json({ message: "Invalid password" });
      } else {
        res.status(200).json({email, message: "Login successful!", _id: users._id});
        console.log(users._id);
      }
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ message: "User already exists" });
    } else {
      const newUser = new User({
        email,
        password,
      });
      await newUser.save();
      res.status(200).json({ email, message: "Signup successful!" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
