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
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      phoneNumber: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      bloodGroup: {
        type: String,
        required: false,
      },
    },
  ],
});

const DonationCampaign = model("DonationCampaign", donationCampaignSchema);

module.exports = DonationCampaign;
