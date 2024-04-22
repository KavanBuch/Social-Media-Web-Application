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
import Chats from "./components/Chats/Chats";
import CreateChat from "./components/Chats/CreateChat";
import Porfile from "./components/Profile/Profile";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/new" element={<CreateChat />} />
        <Route path="/profile" element={<Porfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={Router} />;
}

export default App;
