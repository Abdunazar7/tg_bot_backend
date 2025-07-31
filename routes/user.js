const express = require("express");
const router = express.Router();
const User = require("./../models/user");

router.post("/", async (req, res) => {
  try {
    const exists = await User.findOne({ tgId: req.body.tgId });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

module.exports = router;
