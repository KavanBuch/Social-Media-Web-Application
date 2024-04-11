import axios from "axios";
const url = "http://localhost:80/posts";

export const fetchPosts = () => {
  return axios.get(url);
};

export const createPost = (newPost) => {
  return axios.post(url, newPost);
};

export const likePost = (id) => {
  return axios.patch(`${url}/${id}/likePost`);
};

export const updatePost = (id, updatedPost) => {
  return axios.patch(`${url}/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`);
};
