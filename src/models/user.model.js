const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    min: 5
  },
  password: {
    type: String,
    required: true,
    min: 5
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
