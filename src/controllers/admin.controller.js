const User = require("../models/user.model");
const BloodRequest = require("../models/bloodRequest.model");

exports.getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "PENDING" }).populate(
      "userId"
    );
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

exports.acceptRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    request.status = "ACCEPTED";
    await request.save();
    return res.status(200).json({ message: "Blood request accepted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
