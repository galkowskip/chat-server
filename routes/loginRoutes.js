const express = require('express')
const passport = require('passport')
const router = express.Router()

router.post('/local',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = router