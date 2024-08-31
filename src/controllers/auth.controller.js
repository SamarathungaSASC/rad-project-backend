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
      .json({ message: "Login successful", token, user: req.user });
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
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      passwordHash,
    });
    const token = jwt.sign(
      { id: newUser._id, loginDate: new Date().getTime() },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ message: "Sign up successful", token, user: newUser });
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
