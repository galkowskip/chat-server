const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const { UserProvider } = require("../providers/user.provider");
const { UserController } = require("../controllers/user.controller");

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async function(email, password, done) {
    try {
      const user = await UserProvider.getByEmail(email);
      if (user) {
        if (await UserController.comparePasswords(password, user[0])) {
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
