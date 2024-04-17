import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  numberOfPages: 1,
};

export const fetchPosts = createAsyncThunk("fetchPosts", async (page) => {
  const { data } = await api.fetchPosts(page);
  return data;
});

export const fetchPostsBySearch = createAsyncThunk(
  "fetchPostsBySearch",
  async (searchQuery) => {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    return data;
  }
);

export const createPost = createAsyncThunk("createPost", async (post) => {
  const { data } = await api.createPost(post);
  return data;
});

export const likePost = createAsyncThunk("likePost", async (id) => {
  const { data } = await api.likePost(id);
  return data;
});

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ post_id, postData }) => {
    const { data } = await api.updatePost(post_id, postData);
    return data;
  }
);

export const deletePost = createAsyncThunk("deletePost", async (id) => {
  const { data } = await api.deletePost(id);
  return data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map((post) => {
        if (post._id != action.payload._id) return post;
        return action.payload;
      });
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.map((post) => {
        if (post._id != action.payload._id) return post;
        return action.payload;
      });
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((post) => {
        if (post._id != action.payload._id) return post;
      });
    });
    builder.addCase(fetchPostsBySearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
  },
});

export default postsSlice.reducer;
