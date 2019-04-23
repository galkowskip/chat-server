import {
  userSearchDone,
  getContactsListSuccess
} from "./actions/contactsActions";
import {
  watchUserAuthorizedDone
} from "./actions/userActions";
import {
  getMessagesSuccess,
  newMessageSuccess
} from "./actions/messageActions";
import SocketEmiter from "./SocketEmiter";

/**
 * Socket.io events listener
 * @constructor
 * @param {SocketIOClient} socket
 */
class SocketObserver {
  constructor(socket) {
    this.socket = socket;
  }

  /**
   * Listens if user is logged. If he is then sends data to redux, and asks for contacts list
   */
  async watchUserAuth() {
    this.socket.on("UserAuthorized", data => {
      if (data === false) {} else {
        watchUserAuthorizedDone(data);
        SocketEmiter.getContactListRequest()
      }
    });
  }
  /**
   * Listens for the response on the UserSearch action. Gets found users in the array, fires userSearchDone action
   */
  async watchUserSearch() {
    this.socket.on("UserSearchDone", async data => {
      userSearchDone(data);
    });
  }
  /**
   * Listens for response on the AddNewContact action, if if action is completed asks for full contact list
   */
  async addNewContactDone() {
    this.socket.on("AddNewContactDone", response => {
      SocketEmiter.getContactListRequest()
    });
  }
  /**
   * Listens for response on the GetContactList action
   */
  async getContactListSuccess() {
    this.socket.on("GetContactListDone", contactList => {
      getContactsListSuccess(contactList);
    });
  }
  /**
   * Listens for response on the GetAllMessages action
   */
  getAllMessagesDone() {
    this.socket.on("GetAllMessagesDone", messages => {
      getMessagesSuccess(messages);
    });
  }
  /**
   * Listens for action adding new message to the contact
   */
  watchMessages() {
    this.socket.on("NewMessage", message => {
      newMessageSuccess(message)
    });
  }

  /**
   * Listens if contact deleted
   */
  watchDeleteContact() {
    this.socket.on("ContactDeleted", () => {
      SocketEmiter.getContactListRequest()
    })
  }
  /**
   * Starts all functions 
   */
  async watchAll() {
    this.watchUserAuth();
    this.watchUserSearch();
    this.addNewContactDone();
    this.getContactListSuccess();
    this.watchMessages();
    this.getAllMessagesDone()
    this.watchDeleteContact()
  }
}

export default SocketObserver;