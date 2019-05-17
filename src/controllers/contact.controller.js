const { UserController } = require("../controllers/user.controller");
const { ContactProvider } = require("../providers/contact.provider");

/**
 * Gets request from routes and socket.io, asks providers for data
 */
class ContactController {
  /**
   * Takes user id and gets Contacts this user is tied with
   * @param {String} activeUserId
   */
  async findContactsByUser(activeUserId) {
    return await ContactProvider.getContactByUserId(activeUserId);
  }
  /**
   * Asks UserController for data of users who use contact
   * @param {ContactModel} contact
   * @param {String} user user id
   */
  async getContactData(contact, user) {
    try {
      let targets = contact.users.map(target => {
        if (target !== user) {
          return UserController.getTargetedUser(target);
        }
        return null;
      });

      const results = await Promise.all(targets);
      const result = {
        cid: contact.id,
        targets: results
      };
      return result;
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Adds active user to socket chatroom named after contact id
   * @param {ContactModel} contact
   * @param {SocketIO.Socket} socket
   */
  subscribeToContact(contact, socket) {
    try {
      socket.join(contact.id);
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Sends request to provider to add new contact with two users
   * @param {String} id
   * @param {String} thisUserId
   */
  async addNewContact(id, thisUserId) {
    try {
      const users = [id, thisUserId];
      return await ContactProvider.addNewContact(users);
    } catch (error) {
      console.error(error.message);
    }
  }
  /**
   * Sends id of contact to provider asking for its removal
   * @param {String} id
   */
  async deleteContact(id) {
    try {
      ContactProvider.deleteContactById(id);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { ContactController: new ContactController() };
