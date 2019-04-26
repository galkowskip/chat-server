const { ContactModel } = require("../models/contact.model");
const { MessageController } = require("../controllers/message.controller");

class ContactProvider {
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
