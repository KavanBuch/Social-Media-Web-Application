import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./reducers/posts.js";
import { combineReducers } from "redux";
import postSlice from "./reducers/post.js";

const reducers = combineReducers({
  posts: postsSlice,
  post: postSlice,
});

const store = configureStore({
  reducer: reducers,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
