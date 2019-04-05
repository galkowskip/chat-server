const UserModel = require("../model/UserModel");
const ContactModel = require("../model/ContactModel");
const MessageModel = require("../model/MessageSchema");

module.exports = class SocketObserver {
  constructor(socket, mongoStore) {
    this.socket = socket;
    this.mongoStore = mongoStore;
  }

  async checkUser() {
    this.socket.on("CheckUser", () => {
      if (this.socket.request.user) {
        this.socket.emit("UserAuthorized", this.socket.request.user);
      } else {
        this.socket.emit("UserAuthorized", false);
      }
    });
  }

  async checkContacts() {
    this.socket.on("ContactsObserve", async user => {
      this.socket.emit("ContactsFound", "data");
    });
  }

  async userSearch() {
    this.socket.on("UserSearchRequest", async data => {
      console.log(data)
      try {
        const query = UserModel.find({
          username: new RegExp(`${data}`)
        });
        const result = await query.exec();
        const response = result.map(item => {
          return {
            username: item.username,
            id: item.id
          };
        });
        this.socket.emit("UserSearchDone", response);
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  async addNewContact() {
    this.socket.on("AddNewContactRequest", async id => {
      try {
        console.log(id + " / " + this.socket.request.user.id)
        if (id !== this.socket.request.user.id) {
          const newContact = new ContactModel({
            users: [id, this.socket.request.user.id]
          });
          await newContact.save();
          this.socket.emit("AddNewContactDone");
        } else {
          throw new Error("Cant add contact with self");
        }
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  async getContactList() {
    this.socket.on("GetContactListRequest", async () => {
      try {
        console.log(this.socket.request.user.id)
        let contactListQuery = ContactModel.find({
          users: this.socket.request.user.id
        })
        let contactList = await contactListQuery.exec()
        let contactPromiseList = contactList.map(contact => {
          return getContactData(contact)
        })
        console.log(contactPromiseList)
        Promise.all(contactPromiseList).then((contacts) => {
          console.log(contacts)
          this.socket.emit("GetContactListDone", contacts)
        })
      } catch (error) {
        throw new Error(error);
      }
    })
  }

  async observeAll() {
    this.userSearch();
    this.checkUser();
    this.checkContacts();
    this.addNewContact();
    this.getContactList()
  }
};

async function getContactData(contact) {
  try {
    let targets = contact.users.map(item => {
      return await getTargetedUser(item);
    })
    Promise.all(targets).then((results) => {
      console.log(results);
      return {
        cid: contact.id,
        targets: results
      };
    })
  } catch (error) {
    throw new Error(error)
  }
}

//
async function getTargetedUser(contact) {
  try {
    let user = UserModel.findById(contact);
    user = await user.exec();
    console.log(user);
    return {
      id: user.id,
      username: user.username
    };
  } catch (error) {
    throw new Error(error)
  }
}