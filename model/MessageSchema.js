const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    owner: String,
    contactID: String,
    message: String,
    time: Date
})

MessageSchema.statics.getAllMessages = function (roomId) {
    return new Promise((resolve, reject) => {
        const query = MessageModel.find({
            contactID: roomId
        });
        query.exec().then(messages => {
            resolve(messages)
        }).catch(error => {
            reject(error)
        })
    })
}

const MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel