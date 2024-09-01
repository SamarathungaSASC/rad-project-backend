const DonationCampaign = require("../models/donationCampaign.model");

exports.addCampaign = async (req, res) => {
  try {
    const { title, description, location, date, imgURL } = req.body;
    if (!title || !description || !date || !location || !imgURL) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newCampaign = await DonationCampaign.create({
      title,
      description,
      date,
      location,
      imgURL,
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
    const { title, description, location, date, imgURL } = req.body;
    if (!title || !description || !date || !location || !imgURL) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const campaign = await DonationCampaign.findById(req.params.id);
    campaign.title = title;
    campaign.description = description;
    campaign.date = date;
    campaign.location = location;
    campaign.imgURL = imgURL;
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
