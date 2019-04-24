const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const { UserModel } = require("../models/user.model");
const { UserController } = require("../controllers/user.controller");

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async function(email, password, done) {
    try {
      const user = await UserModel.findOne({
        email: email
      });
      if (user) {
        if (await UserController.comparePasswords(password, user)) {
          return done(null, user);
        } else {
          throw new Error("Wrong password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      return done(null, false, {
        message: error.message
      });
    }
  }
);

module.exports = { localStrategy };
