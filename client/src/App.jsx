import React from "react";
import Home from "./components/Home/home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Layout from "./layout";
import Auth from "./components/Auth/auth";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
