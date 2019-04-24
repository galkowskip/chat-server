const express = require("express");
const passport = require("../src/passport");
const router = express.Router();

const UserModel = require("../src/models/user.model");
const { UserController } = require("../src/controllers/user.controller");

router.get("/logout", (req, res) => {
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
      });
      if (checkUser) {
        throw new Error("User already exists");
      } else {
        await UserController.passwordHash(newUser);
        await newUser.save();
        res.send("OK");
      }
    } else {
      throw new Error("Passwords validation failed");
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).json(error);
  }
});

module.exports = router;
