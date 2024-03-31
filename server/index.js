import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/users.js";

dotenv.config();

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/users.js";
import profilePictureRoutes from "./routes/profilePicture.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/user", profilePictureRoutes);

const port = process.env.PORT || 80;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
