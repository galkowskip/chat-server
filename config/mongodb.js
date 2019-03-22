const mongoose = require('mongoose');
const key = require('../keys.js')

const db = mongoose.connect(`mongodb://${key.dbUsername}:${key.dbPassword}@ds227858.mlab.com:27858/comu-chat`, {
    useNewUrlParser: true
})

module.exports = db