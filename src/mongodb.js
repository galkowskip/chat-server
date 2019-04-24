const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const createMongoConnection = () => {
  const mongoConnectionUrl = `mongodb://${process.env.MONGO_USERNAME}:${
    process.env.MONGO_PASSWORD
  }@${process.env.MONGO_URL}`;

  mongoose.connect(mongoConnectionUrl, {
    useNewUrlParser: true
  });

  return (mongoStore = new MongoStore({
    mongooseConnection: mongoose.connection
  }));
};
module.exports = { mongoStore: createMongoConnection() };
