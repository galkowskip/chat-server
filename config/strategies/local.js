const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const User = require("../../model/UserModel");

const localStrategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  },
  async function (email, password, done) {
    try {
      const user = await User.findOne({
        email: email
      });
      if (user) {
        if (await user.comparePasswords(password)) {
          return done(null, user);
        } else {
          throw new Error("Wrong password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      return done(null, false, {
        message: error
      });
    }
  }
);

module.exports = localStrategy;