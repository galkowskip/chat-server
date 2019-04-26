const { UserController } = require("../controllers/user.controller");
const { ContactProvider } = require("../providers/contact.provider");

class ContactController {
  async findContactsByUser(activeUserId) {
    return await ContactProvider.getContactByUserId(activeUserId);
  }

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

  subscribeToContact(contact, socket) {
    try {
      socket.join(contact.id);
    } catch (error) {
      console.error(error.message);
    }
  }

  async addNewContact(id, thisUserId) {
    try {
      const users = [id, thisUserId];
      return await ContactProvider.addNewContact(users);
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteContact(id) {
    try {
      ContactProvider.deleteContactById(id);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { ContactController: new ContactController() };
