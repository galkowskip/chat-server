const express = require("express");
const passport = require("passport");
const router = express.Router();

const User = require("../model/UserModel");

router.post(
    "/local/auth",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })
);

router.post("/local/newUser", (req, res) => {
    try {
        if (req.body.user.password === req.body.user.confirmPassword) {
            const newUser = new User(req.body.user)
            newUser.createNewUser()
                .then(response => {
                    res.send(response)
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).send({
                        error: error
                    })
                })
        } else {
            throw "Passwords dont match"
        }
    } catch (error) {
        res.status(400).send({
            error: error
        })
    }
});

module.exports = router;