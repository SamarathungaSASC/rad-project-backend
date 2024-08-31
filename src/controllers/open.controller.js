const User = require("../models/user.model");
const DonationCampaign = require("../models/donationCampaign.model");

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
      email,
      phoneNumber,
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
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
