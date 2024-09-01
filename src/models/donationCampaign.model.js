const { Schema, model } = require("mongoose");

const donationCampaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  participants: [
    {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      bloodGroup: {
        type: String,
        required: true,
      },
    },
  ],
});

const DonationCampaign = model("DonationCampaign", donationCampaignSchema);

module.exports = DonationCampaign;
