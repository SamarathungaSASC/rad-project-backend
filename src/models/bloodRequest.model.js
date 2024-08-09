const e = require("express");
const { Schema, model } = require("mongoose");

const bloodRequestSchema = new Schema({
  bloodGroup: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: "PENDING",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat: [
    {
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

const BloodRequest = model("BloodRequest", bloodRequestSchema);

model.exports = BloodRequest;
