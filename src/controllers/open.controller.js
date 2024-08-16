const User = require("../models/user.model");
const DonationCampaign = require("../models/donationCampaign.model");

exports.joinCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { userData } = req.body;
    const campaign = await DonationCampaign.findById(campaignId);
    if (!campaign) {
      return res
        .status(404)
        .json({ status: 404, message: "Campaign not found" });
    }
    campaign.participants.push(userData);
    await campaign.save();
    return res.status(200).json({ message: "Joined campaign successfully" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
