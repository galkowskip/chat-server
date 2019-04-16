import {
  userSearchDone,
  addNewContact,
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

class SocketObserver {
  constructor(socket) {
    this.socket = socket;
  }

  //Watch methods
  async watchUserAuth() {
    this.socket.on("UserAuthorized", data => {
      if (data === false) {} else {
        watchUserAuthorizedDone(data);
      }
    });
  }

  async watchUserSearch() {
    this.socket.on("UserSearchDone", async data => {
      userSearchDone(data);
    });
  }

  async addNewContactDone() {
    this.socket.on("AddNewContactDone", response => {
      SocketEmiter.getContactListRequest()
    });
  }

  async getContactListSuccess() {
    this.socket.on("GetContactListDone", contactList => {
      getContactsListSuccess(contactList);
    });
  }
  getAllMessagesDone() {
    this.socket.on("GetAllMessagesDone", messages => {
      getMessagesSuccess(messages);
    });
  }
  watchMessages() {
    this.socket.on("NewMessage", message => {
      newMessageSuccess(message)
    });
  }
  watchDeleteContact() {
    this.socket.on("ContactDeleted", () => {
      console.log(1)
      SocketEmiter.getContactListRequest()
    })
  }

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