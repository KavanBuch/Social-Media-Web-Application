import React, { useEffect } from "react";
import Home from "./components/Home/home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./layout";
import Auth from "./components/Auth/auth";
import PostDetails from "./components/PostDetails/postDetails";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/auth";
import Chats from "./components/Chats/Chats";
import CreateChat from "./components/Chats/CreateChat";
import { CircularProgress } from "@mui/material";
import Porfile from "./components/Profile/Profile";

function App() {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const isLoading = useSelector((state) => {
    return state.user.isLoading;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, []);
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/new" element={<CreateChat />} />
        <Route path="/profile" element={<Porfile />} />
      </Route>
    )
  );
  return <RouterProvider router={Router} />;
}

export default App;
