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
    default: "PENDING", // ACCEPTED, REJECTED
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const BloodRequest = model("BloodRequest", bloodRequestSchema);

module.exports = BloodRequest;
