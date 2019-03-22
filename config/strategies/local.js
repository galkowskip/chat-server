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
      console.log(user)
      if (user) {
        console.log("User found");
      } else {
        throw new Error("User not found");
      }
      if (await user.comparePasswords(password)) {
        console.log("Passwords compared: ok");
        return done(null, user);
      } else {
        console.log("Passwords compared: false");
        throw new Error("Wrong password");
      }
    } catch (error) {
      console.log(error);
      return done(null, false, {
        message: error
      });
    }
  }
);

module.exports = localStrategy;