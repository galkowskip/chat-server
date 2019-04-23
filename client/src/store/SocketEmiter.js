import socket from "../config/socketConfig"

/**
 * Class used to fire socket.io events and to communicate with server
 * @constructor
 * @param {SocketIOClient} socket
 */
class SocketEmiter {
    constructor(socket) {
        this.socket = socket
    }
    /**
     * Checks if socket.io request has been tied with a user in the database
     */
    checkUser() {
        this.socket.emit("CheckUser");
    }
    /**
     * Asks to find a User similar to one typed by user
     * @param {String} data 
     */
    searchContactsRequest(data) {
        this.socket.emit("UserSearchRequest", data)
    }
    /**
     * New contact request
     * @param {String} data Targeted contact's id
     */
    addMewContactRequest(data) {
        this.socket.emit("AddNewContactRequest", data)
    }
    /**
     * Asks server for contacts tied to active user
     */
    getContactListRequest() {
        this.socket.emit("GetContactListRequest")
    }
    /**
     * Asks server for messages tied with currently active contact
     * @param {String} roomId Active contact id
     */
    getAllMessages(roomId) {
        this.socket.emit("GetAllMessagesRequest", roomId)
    }
    /**
     * Deletes targeted contact
     * @param {String} data Contact's id
     */
    deleteContactRequest(data) {
        this.socket.emit("DeleteContact", data)
    }
    /**
     * Send new message tied to a contact's id for server to propagate to other users tied to contact
     * @param {String} contact Targeted contact
     * @param {String} messages User's message
     */
    sendMessage({
        messages,
        contact
    }) {
        this.socket.emit("SendMessage", {
            messages,
            contact
        })
    }
}

export default new SocketEmiter(socket)