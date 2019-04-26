const { MessageModel } = require("../models/message.model");

class MessageProvider {
  async getMessages(contactId) {
    try {
      const query = MessageModel.find({
        contactID: contactId
      });
      return await query.exec();
    } catch (error) {
      console.error(error.message);
    }
  }
  async addNewMessage(message) {
    try {
      const newMessage = new MessageModel(message);
      await newMessage.save();
    } catch (error) {
      console.error(error.message);
    }
  }
  async deleteContactsMessages(contactId) {
    const query = MessageModel.deleteMany({ contactID: contactId });
    return await query.exec();
  }
}

module.exports = { MessageProvider: new MessageProvider() };
