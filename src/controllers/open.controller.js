const User = require("../models/user.model");
const DonationCampaign = require("../models/donationCampaign.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../configs/server");

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
    if (
      campaign.participants.find(
        (p) => p.email === email || p.phoneNumber === phoneNumber
      )
    ) {
      return res.status(400).json({ message: "Already joined" });
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
    let existingUser = await User.findOne({
      fullName,
      email,
      phoneNumber,
      address,
      bloodGroup,
    });

    if (!existingUser) {
      const passwordHash = await bcrypt.hash(
        phoneNumber || "123456", // Default password
        10
      );
      existingUser = await User.create({
        email,
        phoneNumber,
        fullName,
        address,
        bloodGroup,
        userType: "DONOR",
        passwordHash,
      });
    }
    //send email to user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Blood Donation Campaign",
      text: `You have successfully joined the campaign ${campaign.title} on ${campaign.date}`,
    });

    return res
      .status(200)
      .json({ message: "Joined campaign successfully", user: existingUser });
  } catch (e) {
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

exports.contactUs = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email and phone number is required" });
    }

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL,
      to: EMAIL,
      subject: "Blood Donation Contact Us",
      text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    // Send email to user
    const mailOptionsUser = {
      from: EMAIL,
      to: email,
      subject: "Blood Donation Contact Us",
      text: `Thank you for contacting us. We will get back to you soon`,
    };

    await transporter.sendMail(mailOptionsUser);

    return res.status(200).json({ message: "Message sent" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};

exports.leaveCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { email, phoneNumber } = req.body;
    const campaign = await DonationCampaign.findById(campaignId);
    if (!campaign) {
      return res
        .status(404)
        .json({ status: 404, message: "Campaign not found" });
    }
    campaign.participants = campaign.participants.filter(
      (p) => p.email !== email && p.phoneNumber !== phoneNumber
    );
    await campaign.save();

    //send email to user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Blood Donation Campaign",
      text: `You have successfully left the campaign ${campaign.title} on ${campaign.date}`,
    });

    return res.status(200).json({ message: "Left campaign" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Server Error" });
  }
};
