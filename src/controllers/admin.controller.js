const User = require("../models/user.model");
const BloodRequest = require("../models/bloodRequest.model");
const BloodStock = require("../models/bloodStock.model");
const DonationCampaign = require("../models/donationCampaign.model");

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

exports.getDashboard = async (req, res) => {
  try {
    const bloodData = await BloodStock.find();
    const numRequests = await BloodRequest.countDocuments({
      status: "PENDING",
    });
    const numCampaigns = await DonationCampaign.countDocuments({
      Date: { $gte: new Date() },
    });
    const numDonors = await User.countDocuments({ userType: "DONOR" });
    return res.status(200).json({
      message: "Dashboard data fetched",
      bloodData,
      numRequests,
      numCampaigns,
      numDonors,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
