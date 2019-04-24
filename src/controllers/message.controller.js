const { MessageModel } = require("../models/message.model");

class MessageController {
  async getAllMessages(roomId) {
    try {
      const query = MessageModel.find({
        contactID: roomId
      });
      const messages = await query.exec();
      return messages;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { MessageController: new MessageController() };
