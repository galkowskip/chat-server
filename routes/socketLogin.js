const SocketRoutes = require('./socketRoutes')


module.exports = (socket) => {

    //AUTH RELATED(subject to change)
    socket.on("connect?", () => {
        console.log(socket.request.user)
    })
    socket.on("checkIfLogged", () => {
        console.log(1)
    })

    //GET CONTACTS 

    socket.on("CONTACTS_GET_REQUEST", async (user) => {
        console.log(user)
    })

}