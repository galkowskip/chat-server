const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const mongoConnectionUrl = `mongodb://${process.env.MONGO_USERNAME}:${
  process.env.MONGO_PASSWORD
}@${process.env.MONGO_URL}`;

const mongoStore = new MongoStore({
  url: mongoConnectionUrl,
  autoRemove: "native"
});

module.exports = mongoStore;
