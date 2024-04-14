import React from "react";
import styles from "./styles";
import logo from "../../images/logo.jpg";
import { Typography, AppBar, Avatar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = null;
  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div style={styles.brandContainer}>
        <Typography
          sx={styles.heading}
          variant="h2"
          align="center"
          component={Link}
          to="/"
        >
          Instander
        </Typography>
        <Avatar src={logo} sx={styles.image} />
      </div>
      <Toolbar sx={styles.toolbar}>
        {user ? (
          <div style={styles.profile}>
            <Avatar
              sx={styles.purple}
              alt={user.result.name}
              src={user.result.imageURL}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography sx={styles.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
