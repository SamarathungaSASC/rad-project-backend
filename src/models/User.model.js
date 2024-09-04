const { Schema, model } = require("mongoose");

const userTypes = ["REQUESTER", "DONOR", "ADMIN"];

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "REQUESTER",
  },
  passwordHash: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  bloodGroup: {
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
});

const User = model("User", UserSchema);

module.exports = User;
