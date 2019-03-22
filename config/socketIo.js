module.exports = class SocketObserver {
    constructor(socket, mongoStore) {
        this.socket = socket
        this.mongoStore = mongoStore
    }
    async checkUser() {
        this.socket.on('CheckUser', () => {
            if (this.socket.request.user) {
                this.socket.emit("UserAuthorized", this.socket.request.user)
            } else {
                this.socket.emit("UserAuthorized", false)
            }
        })
    }
}