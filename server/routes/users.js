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

router.post("/emailExists", async (req, res) => {
  let valid = true;
  const { email } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    valid &= foundUser != undefined;
    if (valid) return res.status(200).json({ success: "email already exists" });
    res.status(200).json({ error: "email does not exist" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/userProfile", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/updateProfile", async (req, res) => {
  try {
    const { firstName, lastName, email, profilePicture, username } = req.body;
    const oldUser = await User.findOne({ username });
    const updatedUser = {
      firstName,
      lastName,
      email,
      profilePicture,
    };
    const result = await User.findByIdAndUpdate(oldUser._id, updatedUser, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
