const mongoose = require("mongoose");

const mongoConnectionUrl = `mongodb://${process.env.MONGO_USERNAME}:${
  process.env.MONGO_PASSWORD
}@${process.env.MONGO_URL}`;

const db = mongoose.connect(mongoConnectionUrl, {
  useNewUrlParser: true
});

module.exports = db;
