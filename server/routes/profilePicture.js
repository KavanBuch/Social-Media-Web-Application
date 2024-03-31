import express from "express";
import multer from "multer";
import User from "../models/users.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/profile-pic-uploads/`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: storage });

router.post(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  (req, res) => {
    res.json(req.file.path);
  }
);

export default router;
