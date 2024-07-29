const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.getData = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Data fetched successfully", user: req.user });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
