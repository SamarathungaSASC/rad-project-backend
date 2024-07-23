const User = require("../models/User.model");

exports.login = async (req, res) => {
  try {
    return res.status(200).json({ message: "Login successful" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      email: "req.body.email",
      passwordHash: "req.body.password",
    });
    return res.status(200).json({ message: "Sign up successful", newUser });
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
