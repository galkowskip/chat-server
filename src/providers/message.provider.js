const { MessageModel } = require("../models/message.model");
/**
 * Provides Message data from db
 */
class MessageProvider {
  /**
   * Finds messages by ContactModel.id
   * @param {String} contactId
   */
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
  /**
   *  Adds new message
   * @param {*} message
   */
  async addNewMessage(message) {
    try {
      const newMessage = new MessageModel(message);
      await newMessage.save();
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Deletes all messages tied with given contact
   * @param {String} contactId
   */
  async deleteContactsMessages(contactId) {
    const query = MessageModel.deleteMany({ contactID: contactId });
    return await query.exec();
  }
}

module.exports = { MessageProvider: new MessageProvider() };
