const UserModel = require("../model/UserModel");
const ContactModel = require("../model/ContactModel");
const MessageModel = require("../model/MessageSchema");

//
module.exports = class SocketObserver {
  constructor(socket, mongoStore, io) {
    this.socket = socket;
    this.mongoStore = mongoStore;
    this.io = io;
  }

  async checkUser() {
    this.socket.on("CheckUser", () => {
      if (this.socket.request.user) {
        UserModel.checkUser(this.socket.request.user.id).then(result => {
          this.socket.emit("UserAuthorized", this.socket.request.user);
        }).catch(error => {
          throw new Error(error)
        })

      } else {
        this.socket.emit("UserAuthorized", false);
      }
    });
  }

  async userSearch() {
    this.socket.on("UserSearchRequest", async data => {
      try {
        UserModel.userSimilarSearch(data).then(response => {
          this.socket.emit("UserSearchDone", response);
        }).catch(error => {
          throw new Error(error);
        })
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  addNewContact() {
    this.socket.on("AddNewContactRequest", id => {
      if (id !== this.socket.request.user.id) {
        ContactModel.addNewContact(id, this.socket.request.user.id).then(result => {
          result.subscribeToContact(this.socket)
          this.socket.emit("AddNewContactDone");
        }).catch(error => {
          throw new Error(error);
        })
      } else {
        throw new Error("Cant add contact with self");
      }
    });
  }

  async getContactList() {
    this.socket.on("GetContactListRequest", () => {
      try {
        let contactListQuery = ContactModel.find({
          users: this.socket.request.user.id
        });
        contactListQuery
          .exec()
          .then(contactList => {
            let contactPromiseList = contactList.map(contact => {
              contact.subscribeToContact(this.socket);
              return contact.getContactData(this.socket.request.user.id);
            });
            Promise.all(contactPromiseList).then(contacts => {
              this.socket.emit("GetContactListDone", contacts);
            });
          })
          .catch(error => {
            throw new Error(error);
          });
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  watchGetAllMessages() {
    this.socket.on("GetAllMessagesRequest", roomId => {
      MessageModel.getAllMessages(roomId).then(messages => {
        this.socket.emit("GetAllMessagesDone", messages);
      }).catch(error => {
        throw new Error(error)
      })
    });
  }

  watchSendMessage() {
    this.socket.on("SendMessage", data => {
      if (!data.contact || !data.messages) {
        this.socket.emit("NewMessageError", "Missing data");
      } else {
        const message = new MessageModel({
          owner: this.socket.request.user.id,
          contactID: data.contact,
          message: data.messages,
          time: Date.now()
        });
        message.save();
        this.io.to(data.contact).emit("NewMessage", message);
      }
    });
  }

  watchDeleteContact() {
    this.socket.on('DeleteContact', data => {
      ContactModel.deleteContact(data).then((e) => {
        this.io.to(data).emit("ContactDeleted")
        this.socket.leave(data)
      }).catch(error => {
        throw new Error(error)
      })
    })
  }

  async observeAll() {
    this.userSearch();
    this.checkUser();
    this.addNewContact();
    this.getContactList();
    this.watchSendMessage();
    this.watchGetAllMessages();
    this.watchDeleteContact();
  }
};