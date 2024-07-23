const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "donor",
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema);

module.exports = User;
