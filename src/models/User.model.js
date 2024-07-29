const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "DONOR",
  },
  passwordHash: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: false,
  },
});

const User = model("User", UserSchema);

module.exports = User;
