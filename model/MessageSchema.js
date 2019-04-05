const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    owner: String,
    contactID: String,
    message: String,
    time: Date
})

const MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel