const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const BloodRequest = require("../models/bloodRequest.model");

exports.getData = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Data fetched successfully", user: req.user });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.requestBlood = async (req, res) => {
  try {
    const { requestData } = req.body;
    const newBloodRequest = await BloodRequest.create({
      ...requestData,
      userId: req.user._id,
    });

    return res.status(200).json({ message: "Blood request sent" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ userId: req.user._id });
    return res
      .status(200)
      .json({ message: "Blood requests fetched", requests });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    return res.status(200).json({ message: "Blood request fetched", request });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
