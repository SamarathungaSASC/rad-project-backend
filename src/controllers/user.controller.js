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

exports.getDashboard = async (req, res) => {
  try {
    const userRequests = await BloodRequest.find({ userId: req.user._id });
    const totalRequests = userRequests.length;
    const acceptedRequests = userRequests.filter(
      (req) => req.status === "ACCEPTED"
    ).length;
    const pendingRequests = userRequests.filter(
      (req) => req.status === "PENDING"
    ).length;
    const rejectedRequests = userRequests.filter(
      (req) => req.status === "REJECTED"
    ).length;

    return res.status(200).json({
      message: "Dashboard data fetched",
      totalRequests,
      acceptedRequests,
      pendingRequests,
      rejectedRequests,
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.updateData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password, phoneNumber, address, bloodGroup } = req.body;

    let updateFields = {};

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateFields.passwordHash = hashedPassword;
    }

    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (address) updateFields.address = address;
    if (bloodGroup) updateFields.bloodGroup = bloodGroup;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({
      message: "Data updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
};

exports.requestBlood = async (req, res) => {
  try {
    const { bloodGroup, location, description } = req.body;
    const newBloodRequest = await BloodRequest.create({
      bloodGroup,
      location,
      description,
      userId: req.user._id,
    });

    return res.status(200).json({ message: "Blood request sent" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ userId: req.user._id })
      .populate("userId")
      .select("-messages")
      .sort({ date: -1 });
    return res
      .status(200)
      .json({ message: "Blood requests fetched", requests });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id)
      .select("-messages")
      .populate("userId");
    return res.status(200).json({ message: "Blood request fetched", request });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const request = await BloodRequest.findById(req.params.id);
    request.messages.push({
      message,
      sender: req.user._id,
    });
    await request.save();

    return res.status(200).json({ message: "Message sent" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    const messages = request.messages
      .map((msg) => {
        return {
          _id: msg._id,
          message: msg.message,
          direction:
            msg.sender.toString() === req.user._id.toString()
              ? "outgoing"
              : "incoming",
          date: msg.date,
        };
      })
      .sort((a, b) => a.date - b.date);
    return res.status(200).json({ message: "Messages fetched", messages });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
