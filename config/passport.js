const passport = require('passport')
const User = require('../model/UserModel')

const localStrategy = require("./strategies/local")

passport.use(localStrategy)

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport