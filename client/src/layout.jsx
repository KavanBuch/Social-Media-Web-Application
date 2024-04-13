import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/navbar";

const Layout = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
