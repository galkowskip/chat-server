const UserModel = require("../model/UserModel");
const ContactModel = require("../model/ContactModel");
const MessageModel = require("../model/MessageSchema");
const io = require("socket.io")

module.exports = class SocketObserver {
  constructor(socket, mongoStore, io) {
    this.socket = socket;
    this.mongoStore = mongoStore;
    this.io = io
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

  async userSearch() {
    this.socket.on("UserSearchRequest", async data => {
      console.log(data);
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
        console.log(id + " / " + this.socket.request.user.id);
        if (id !== this.socket.request.user.id) {
          const newContact = new ContactModel({
            users: [id, this.socket.request.user.id]
          });
          await newContact.save();
          this.subscribeContact(newContact.id)
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
    this.socket.on("GetContactListRequest", () => {
      try {
        let contactListQuery = ContactModel.find({
          users: this.socket.request.user.id
        });
        contactListQuery.exec().then(contactList => {
          let contactPromiseList = contactList.map(contact => {
            this.subscribeContact(contact.id)
            return getContactData(contact, this.socket.request.user.id);
          });
          Promise.all(contactPromiseList).then(contacts => {
            this.socket.emit("GetContactListDone", contacts);
          });
        }).catch(error => {
          throw new Error(error)
        })
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  watchGetAllMessages() {
    socket.on("GetAllMessagesRequest", roomId => {
      const query = MessageModel.find({
        contactID: roomId
      })
      query.exec().then(messages => {
        socket.emit("GetAllMessagesDone", messages)
      })
    })
  }
  // Adds socket to room
  subscribeContact(contactId) {
    this.socket.join(contactId)
  }

  async observeAll() {
    this.userSearch();
    this.checkUser();
    this.addNewContact();
    this.getContactList();
  }
};

// Takes takes ContactSchema and maps targeted users.
// Second variable this function takes is the id of the user asking for data.
// If mapped id is eqal to users, there is no need to search for his data,
// which is passed to getTargetedUser

function getContactData(contact, user) {
  return new Promise((resolve, reject) => {
    try {
      let targets = contact.users.map(item => {
        if (item !== user) {
          return getTargetedUser(item);
        } else {
          return null
        }
      });
      Promise.all(targets).then(results => {
        resolve({
          cid: contact.id,
          targets: results
        })
      })
    } catch (error) {
      reject(error);
    }
  })
}

// Gets User.id's and finds their id and username. Returns Promise
function getTargetedUser(contact) {
  return new Promise((resolve, reject) => {
    let user = UserModel.findById(contact);
    user.exec().then(user => {
      resolve({
        id: user.id,
        username: user.username
      });
    }).catch(error => {
      reject(error)
    })
  })
}