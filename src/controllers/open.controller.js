const User = require("../models/user.model");
const DonationCampaign = require("../models/donationCampaign.model");
const bcrypt = require("bcrypt");

exports.joinCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { fullName, email, phoneNumber, address, bloodGroup } = req.body;
    if (!email & !phoneNumber) {
      return res
        .status(400)
        .json({ message: "Email and phone number is requeired" });
    }
    const campaign = await DonationCampaign.findById(campaignId);
    if (!campaign) {
      return res
        .status(404)
        .json({ status: 404, message: "Campaign not found" });
    }
    campaign.participants.push({
      fullName,
      email,
      phoneNumber,
      address,
      bloodGroup,
    });
    await campaign.save();

    // Create user if not exists
    const exsisitingUser = await User.findOne({
      fullName,
      email,
      phoneNumber,
      address,
      bloodGroup,
    });
    if (!exsisitingUser) {
      const passwordHash = await bcrypt.hash(
        phoneNumber || "123456", // Default password
        10
      );
      await User.create({
        email,
        phoneNumber,
        role: "DONOR",
        passwordHash,
      });
    }
    return res.status(200).json({ message: "Joined campaign successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await DonationCampaign.find();
    return res
      .status(200)
      .json({ message: "Donation campaigns fetched", campaigns });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.getCampaign = async (req, res) => {
  try {
    const campaign = await DonationCampaign.findById(req.params.id);
    if (!campaign) {
      return res
        .status(404)
        .json({ status: 404, message: "Campaign not found" });
    }
    return res.status(200).json({ message: "Campaign fetched", campaign });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.upcomingCampaigns = async (req, res) => {
  try {
    const campaigns = await DonationCampaign.find({
      date: { $gte: new Date() },
    }).select("date title");
    return res
      .status(200)
      .json({ message: "Upcoming donation campaigns fetched", campaigns });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
