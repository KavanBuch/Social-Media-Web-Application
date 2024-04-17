import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const MAX_LIMIT = 4;
    const startIndex = (Number(page) - 1) * MAX_LIMIT;
    const total = await PostMessage.countDocuments({});

    const postMessages = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(MAX_LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: postMessages,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / MAX_LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const fetchPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const user = req.session?.passport?.user;
  if (!user) {
    return res.status(400).json({ error: "unauthenticated" });
  }
  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const post = await PostMessage.findById(id);
  const updatedPost = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    likes: post.likes,
    _id: id,
  };
  await PostMessage.findByIdAndUpdate(id, updatedPost, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const deletedPost = await PostMessage.findById(id);
  await PostMessage.findByIdAndDelete(id);
  res.json(deletedPost);
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const user = req.session?.passport?.user;
  if (!user) {
    return res.status(400).json({ error: "unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(user));

  if (index === -1) {
    post.likes.push(user);
  } else {
    post.likes = post.likes.filter((id) => id !== String(user));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export default router;
