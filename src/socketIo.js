const { UserController } = require("./controllers/user.controller");
const { ContactController } = require("./controllers/contact.controller");
const { MessageController } = require("./controllers/message.controller");

const { MessageProvider } = require("./providers/message.provider");

/**
 *  This class has all functions responsible for observing events sent by clients with socket.io
 */
class SocketObserver {
  constructor(socket, mongoStore, io) {
    this.socket = socket;
    this.mongoStore = mongoStore;
    this.io = io;
  }
  /**
   *  Checks if user who sent request is logged and authorized. CheckUser -> UserAuthorized
   */
  checkUser() {
    this.socket.on("CheckUser", async () => {
      try {
        if (this.socket.request.user) {
          await UserController.checkUser(this.socket.request.user.id);
          this.socket.emit("UserAuthorized", this.socket.request.user);
        } else {
          this.socket.emit("UserAuthorized", false);
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  /**
   * Observes if client sent UserSearchRequest. UserSearchRequest -> UserSearchDone
   */
  userSearch() {
    this.socket.on("UserSearchRequest", async data => {
      try {
        const response = await UserController.userSimilarSearch(data);
        this.socket.emit("UserSearchDone", response);
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  /**
   * Observes if client sent AddNewContactRequest. AddNewContactRequest -> AddNewContactDone
   */
  addNewContact() {
    this.socket.on("AddNewContactRequest", async id => {
      try {
        if (id !== this.socket.request.user.id) {
          const result = await ContactController.addNewContact(
            id,
            this.socket.request.user.id
          );
          ContactController.subscribeToContact(result, this.socket);
          this.socket.emit("AddNewContactDone");
        } else {
          throw new Error("Cant add contact with self");
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  /**
   * Watches and sends back full contact list of the user who sent request. GetContactRequest -> GetContactListDone
   */
  watchGetContactList() {
    this.socket.on("GetContactListRequest", async () => {
      try {
        let contactList = await ContactController.findContactsByUser(
          this.socket.request.user.id
        );

        let contactPromiseList = contactList.map(contact => {
          ContactController.subscribeToContact(contact, this.socket);

          return ContactController.getContactData(
            contact,
            this.socket.request.user.id
          );
        });

        const contacts = await Promise.all(contactPromiseList);
        this.socket.emit("GetContactListDone", contacts);
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  /**
   * GetAllMessagesRequest -> GetAllMessagesDone
   */
  watchGetAllMessages() {
    this.socket.on("GetAllMessagesRequest", async roomId => {
      try {
        const messages = await MessageController.getAllMessages(roomId);
        this.socket.emit("GetAllMessagesDone", messages);
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  /**
   * SendMessage -> NewMessage
   */
  watchSendMessage() {
    this.socket.on("SendMessage", async data => {
      try {
        if (!data.contact || !data.messages) {
          this.socket.emit("NewMessageError", "Missing data");
        } else {
          const message = {
            owner: this.socket.request.user.id,
            contactID: data.contact,
            message: data.messages,
            time: Date.now()
          };
          await MessageProvider.addNewMessage(message);
          this.io.to(data.contact).emit("NewMessage", message);
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  /**
   * DeleteContact -> ContactDeleted
   */
  watchDeleteContact() {
    this.socket.on("DeleteContact", async data => {
      try {
        await ContactController.deleteContact(data);
        this.io.to(data).emit("ContactDeleted");
        this.socket.leave(data);
      } catch (error) {
        console.error(error.message);
      }
    });
  }
  /**
   * Starts all watch functions
   */
  observeAll() {
    this.userSearch();
    this.checkUser();
    this.addNewContact();
    this.watchGetContactList();
    this.watchSendMessage();
    this.watchGetAllMessages();
    this.watchDeleteContact();
  }
}

module.exports = { SocketObserver };
