const session = require("express-session")
const MongoStore = require("connect-mongo")(session);
const key = require("../keys");

const mongoStore = new MongoStore({
    url: `mongodb://${key.dbUsername}:${key.dbPassword}@ds227858.mlab.com:27858/comu-chat`,
    autoRemove: 'native',
});

module.exports = mongoStore