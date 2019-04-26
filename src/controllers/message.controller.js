const { MessageProvider } = require("../providers/message.provider");

class MessageController {
  async getAllMessages(roomId) {
    try {
      const messages = await MessageProvider.getMessages(roomId);
      return messages;
    } catch (error) {
      console.error(error.message);
    }
  }
  async deleteContactsMessages(contactId) {
    await MessageProvider.deleteContactsMessages(contactId);
  }
}

module.exports = { MessageController: new MessageController() };
