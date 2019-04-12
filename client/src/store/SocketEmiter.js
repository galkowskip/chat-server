import socket from "../config/socketConfig"

class SocketEmiter {
    searchContactsRequest(data) {
        socket.emit("UserSearchRequest", data)
    }
    addMewContactRequest(data) {
        socket.emit("AddNewContactRequest", data)
    }
    getContactListRequest() {
        socket.emit("GetContactListRequest")
    }
    getAllMessages(roomId) {
        socket.emit("GetAllMessagesRequest", roomId)
    }
    deleteContactRequest(data) {
        socket.emit("DeleteContact", data)
    }
    sendMessage({
        messages,
        contact
    }) {
        socket.emit("SendMessage", {
            messages,
            contact
        })
    }
}

export default new SocketEmiter()