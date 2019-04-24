const passport = require("passport");
const UserModel = require("./models/user.model");

const localStrategy = require("./strategies/local");

passport.use(localStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
