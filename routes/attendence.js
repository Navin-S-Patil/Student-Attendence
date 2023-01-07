const router = require("express").Router();
const User = require("../models/students");

router.post("/", async (req, res) => {
  const newUser = new User({
    rollNo: req.body.rollNo,
    name: req.body.name,
  });
  try {
    console.log("loggedIn")
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;