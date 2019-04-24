const { ContactModel } = require("../models/contact.model");
const { UserController } = require("../controllers/user.controller");

class ContactController {
  async findContactsByUser(activeUserId) {
    let contactListQuery = ContactModel.find({
      users: activeUserId
    });
    return await contactListQuery.exec();
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
    socket.join(contact.id);
  }

  async addNewContact(id, thisUserId) {
    try {
      const newContact = new ContactModel({
        users: [id, thisUserId]
      });
      const result = await newContact.save();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteContact(id) {
    try {
      const query = ContactModel.findByIdAndDelete(id);
      const result = await query.exec();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = { ContactController: new ContactController() };
