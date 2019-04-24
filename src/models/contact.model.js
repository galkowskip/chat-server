const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  users: [String]
});

const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel;
