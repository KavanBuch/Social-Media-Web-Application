import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
  fetchPostsBySearch,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middlewares/auth.js";

router.get("/", getPosts);
router.get("/search", fetchPostsBySearch);
router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", likePost);
router.post("/:id/commentPost", commentPost);

export default router;
