import axios from "axios";
const url = "http://localhost:80";

export const fetchPosts = () => {
  return axios.get(`${url}/posts`, { withCredentials: true });
};

export const createPost = (newPost) => {
  return axios.post(`${url}/posts`, newPost, { withCredentials: true });
};

export const likePost = (id) => {
  return axios.patch(
    `${url}/posts/${id}/likePost`,
    {},
    { withCredentials: true }
  );
};

export const updatePost = (id, updatedPost) => {
  return axios.patch(`${url}/posts/${id}`, updatedPost, {
    withCredentials: true,
  });
};

export const deletePost = (id) => {
  return axios.delete(`${url}/posts/${id}`, { withCredentials: true });
};

export const registerUser = (user) => {
  return axios.post(`${url}/register`, user, { withCredentials: true });
};

export const loginUser = (user) => {
  return axios.post(`${url}/login`, user, { withCredentials: true });
};

export const logoutUser = () => {
  return axios.post(`${url}/logout`, { withCredentials: true });
};
