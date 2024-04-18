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

function App() {
  const user = useSelector((state) => {
    return state.user.user;
  });
  const dispatch = useDispatch();
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
      </Route>
    )
  );
  useEffect(() => {
    dispatch(setUser());
  }, []);
  return <RouterProvider router={Router} />;
}

export default App;
