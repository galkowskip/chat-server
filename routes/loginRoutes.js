const express = require("express");
const passport = require("../config/passport");
const router = express.Router();
const mongoStore = require("../config/mongoStore");

const UserModel = require("../model/UserModel");

router.get("/logout", (req, res) => {
    console.log(req.session);

    req.logOut();
    res.send("ok");
});

router.post("/local/auth", passport.authenticate("local"), (req, res) => {
    res.send(req.session.passport);
});

router.post("/local/newUser", async (req, res) => {
    try {
        if (req.body.user.password === req.body.user.confirmPassword) {
            const newUser = new UserModel(req.body.user);
            const checkUser = await UserModel.findOne({
                email: newUser.email
            })
            console.log(checkUser);
            const checkUser = false
            if (checkUser) {
                throw new Error("User already exists");
            } else {
                //Save user
                await newUser.passwordHash();
                await newUser.save();
                res.send("OK");
            }
        } else {
            throw new Error("Passwords validation failed");
        }
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
});

module.exports = router;