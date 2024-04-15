import express from "express";
import passport from "passport";
import User from "../models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, firstName, lastName, confirmPassword } =
      req.body;
    if (confirmPassword != password) {
      return res.json({ error: "passwords don't match" });
    }
    const user = new User({
      email,
      username,
      firstName,
      lastName,
    });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return res.json(e);
      }
      res.json({ success: "registered the user" });
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", passport.authenticate("local", {}), (req, res) => {
  res.json({ success: "logged you in!!" });
});

router.post("/logout", (req, res) => {
  req.logout((e) => {
    if (e) return res.json(e);
    res.json({ success: "logged you out!!" });
  });
});

export default router;
