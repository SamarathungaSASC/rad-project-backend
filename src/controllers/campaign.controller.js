const DonationCampaign = require("../models/donationCampaign.model");

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

exports.upcomingCampaigns = async (req, res) => {
  try {
    const campaigns = await DonationCampaign.find({
      Date: { $gte: new Date() },
    }).select("date title");
    return res
      .status(200)
      .json({ message: "Upcoming donation campaigns fetched", campaigns });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.addCampaign = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newCampaign = await DonationCampaign.create({
      title,
      description,
      date,
      location,
      participants: [],
    });
    return res
      .status(200)
      .json({ message: "Campaign added successfully", campaign: newCampaign });
  } catch (e) {
    console.log(e);

    return res.status(400).json({ message: "Server Error" });
  }
};

exports.editCampaign = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const campaign = await DonationCampaign.findById(req.params.id);
    campaign.title = title;
    campaign.description = description;
    campaign.date = date;
    campaign.location = location;
    await campaign.save();
    return res
      .status(200)
      .json({ message: "Campaign updated successfully", campaign });
  } catch (e) {
    return res.status(400).json({ message: "Server Error" });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    await DonationCampaign.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (e) {
    return res.status(400).json({ message: "Server Error" });
  }
};
