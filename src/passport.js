const passport = require("passport");

const { UserProvider } = require("./providers/user.provider");
const { localStrategy } = require("./strategies/local");

passport.use(localStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await UserProvider.getById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = { passport };
