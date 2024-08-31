const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.login = async (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user._id, loginDate: new Date().getTime() },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ message: "Login successful", user: { ...req.user._doc, token } });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      passwordHash,
    });
    const token = jwt.sign(
      { id: newUser._id, loginDate: new Date().getTime() },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      message: "Sign up successful",
      user: { ...newUser._doc, token },
    });
  } catch (e) {
    return res.status(400).json({ message: "Server Error" });
  }
};

exports.signOut = async (req, res) => {
  try {
    return res.status(200).json({ message: "Signed Out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
