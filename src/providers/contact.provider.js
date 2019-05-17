const { ContactModel } = require("../models/contact.model");
const { MessageController } = require("../controllers/message.controller");
/**
 * Has direct connection to ContactModel, sends data to ContactController
 */
class ContactProvider {
  /**
   * Uses UserModel.id to find certain ContactModel
   * @param {String} userId
   */
  async getContactByUserId(userId) {
    try {
      let query = ContactModel.find({
        users: userId
      });
      return await query.exec();
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Uses id to delete certain ContactModel
   * @param {String} id
   */
  async deleteContactById(id) {
    try {
      const query = ContactModel.findByIdAndDelete(id);

      const deleteContactPromise = query.exec();
      const deleteMessagesPromise = MessageController.deleteContactsMessages(
        id
      );
      await Promise.all([deleteContactPromise, deleteMessagesPromise]);
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Adds new contact with two users
   * @param {Array<String>} users
   */
  async addNewContact(users) {
    try {
      const newContact = new ContactModel({
        users: users
      });
      return await newContact.save();
    } catch (error) {
      console.error(message.error);
    }
  }
}

module.exports = { ContactProvider: new ContactProvider() };
