const router = require("express").Router();
const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    //validation
    if (!email || !password || !passwordVerify) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }
    if (password.length > 6)
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        error: "Please enter the same twice for verification",
      });

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        error: "User already exists",
      });

    //hash password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //save user in DB
    const user = new User({
      email,
      passwordHash,
    });
    const savedUser = await user.save();

    //create a JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing fields",
      });
    }

    //get user account
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({
        error: "Wrong email or password",
      });
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!correctPassword)
      return res.status(400).json({
        error: "Wrong email or password",
      });

    //create a JWT token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
