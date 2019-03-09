const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const User = require('../../model/UserModel')

const localStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        try {
            User.findAuth(`email = "${email}"`, password)
                .then(user => {
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                })
            return done(null, false, {
                message: 'Incorrect username.'
            });
        } catch (error) {
            return done(null, false, {
                message: error
            })
        }
    }
);

module.exports = localStrategy