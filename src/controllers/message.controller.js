const { MessageProvider } = require("../providers/message.provider");

/**
 * Controls data from providers
 */
class MessageController {
  /**
   * Asks provider for all messages from contact
   * @param {String} contactId
   */
  async getAllMessages(contactId) {
    try {
      const messages = await MessageProvider.getMessages(contactId);
      return messages;
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   *  Asks provider to delete given contact
   * @param {String} contactId
   */
  async deleteContactsMessages(contactId) {
    await MessageProvider.deleteContactsMessages(contactId);
  }
}

module.exports = { MessageController: new MessageController() };
