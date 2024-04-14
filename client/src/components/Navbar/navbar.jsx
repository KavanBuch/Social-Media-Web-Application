import React, { useEffect } from "react";
import styles from "./styles";
import logo from "../../images/logo.jpg";
import { Typography, AppBar, Avatar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../reducers/auth";
import * as api from "../../api/index";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setUser());
  }, []);
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async () => {
    const { data } = await api.logoutUser();
    if (data.success) {
      localStorage.clear();
      dispatch(setUser());
      navigate("/");
    }
  };

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
            <form onSubmit={handleSubmit}>
              <Button variant="contained" color="secondary" type="submit">
                Logout
              </Button>
            </form>
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
