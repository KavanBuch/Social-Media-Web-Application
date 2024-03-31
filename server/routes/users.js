import express from "express";
import passport from "passport";
import User from "../Models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, firstName, lastName, dateOfBirth } =
      req.body;
    const user = new User({
      email,
      username,
      firstName,
      lastName,
      dateOfBirth,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return res.json(e);
      }
      res.json(registeredUser);
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", passport.authenticate("local", {}), (req, res) => {
  res.send("logged in!!");
});

export default router;
