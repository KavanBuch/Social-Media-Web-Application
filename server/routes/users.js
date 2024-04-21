import express from "express";
import passport from "passport";
import User from "../models/users.js";
import { StreamChat } from "stream-chat";
import { config } from "dotenv";
config();

const router = express.Router();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

const client = new StreamChat(apiKey, apiSecret);

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
      const token = client.createToken(username);
      res.json({ success: "registered the user", token, username });
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", passport.authenticate("local", {}), (req, res) => {
  const { username } = req.body;
  const token = client.createToken(username);
  res.json({ success: "logged you in!!", token, username });
});

router.post("/logout", (req, res) => {
  req.logout((e) => {
    if (e) return res.json(e);
    res.json({ success: "logged you out!!" });
  });
});

router.post("/currentUser", (req, res) => {
  const currentUser = req?.session?.passport?.user;
  res.json(currentUser);
});

router.post("/userExists", async (req, res) => {
  const { users } = req.body;
  let valid = true;
  try {
    for (const user of users) {
      const foundUser = await User.findOne({ username: user });
      valid &= foundUser != undefined;
    }
    if (valid) return res.status(200).json({ success: "all users are valid" });
    res.status(200).json({ error: "some users are not valid" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
