const mongoose = require('mongoose')
const UserModel = require('./UserModel')

const ContactSchema = new mongoose.Schema({
    users: [String],
})
//Methods

//Subscribe user to contacts room
ContactSchema.methods.subscribeToContact = function (socket) {
    socket.join(this.id)
}

//Retrieve contacts data. Uses UserModel to get user data
ContactSchema.methods.getContactData = function (user) {
    return new Promise((resolve, reject) => {
        try {
            const contactId = this.id
            let targets = this.users.map((item) => {
                if (item !== user) {
                    return UserModel.getTargetedUser(item);
                } else {
                    return null;
                }
            });
            Promise.all(targets).then(function (results) {
                resolve({
                    cid: contactId,
                    targets: results
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}

//Statics

ContactSchema.statics.addNewContact = function (id, thisUserId) {
    return new Promise((resolve, reject) => {
        const newContact = new ContactModel({
            users: [id, thisUserId]
        });
        newContact.save().then(result => {
            resolve(result)
        }).catch(error => {
            reject(error)
        })
    })
}

ContactSchema.statics.deleteContact = function (id) {
    return new Promise((resolve, reject) => {
        const query = ContactModel.findByIdAndDelete(id)
        query.exec().then(() => {
            resolve(true)
        }).catch(error => {
            reject(error)
        })
    })
}

const ContactModel = mongoose.model('Contact', ContactSchema)

module.exports = ContactModel