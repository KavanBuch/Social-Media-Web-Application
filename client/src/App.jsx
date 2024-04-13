import React from "react";
import Home from "./components/Home/home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={Router} />;
}

export default App;
