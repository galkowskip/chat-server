const passport = require("passport");
const User = require("../model/UserModel");

const localStrategy = require("./strategies/local");

passport.use(localStrategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  try {
    User.findById(id)
      .then(user => {
        done(null, user);
      }).catch(error => {
        done(error, null)
      })
  } catch (error) {
    done(error, null)
  }
});

module.exports = passport;