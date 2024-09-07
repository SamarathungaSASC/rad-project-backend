const User = require("../models/user.model");
const BloodRequest = require("../models/bloodRequest.model");
const BloodStock = require("../models/bloodStock.model");
const DonationCampaign = require("../models/donationCampaign.model");

exports.getRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "PENDING" })
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
      .populate("userId")
      .select("-messages");
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
      date: { $gte: new Date() },
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

exports.updateDashboard = async (req, res) => {
  try {
    const { bloodData } = req.body;
    for (let i = 0; i < bloodData.length; i++) {
      const bloodGroup = bloodData[i].bloodGroup;
      const stock = bloodData[i].stock;
      await BloodStock.updateOne({ bloodGroup }, { stock }, { upsert: true });
    }
    return res.status(200).json({ message: "Dashboard updated" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
