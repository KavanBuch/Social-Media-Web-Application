import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  Typography,
  AppBar,
  Avatar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, getUserProfile } from "../../reducers/auth";
import * as api from "../../api/index";
import { useNavigate, useLocation } from "react-router-dom";
import { Chat, Person, Logout } from "@mui/icons-material";
import LoadingMessage from "../LoadingMessage";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog";
import { setMessage } from "../../reducers/message";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setLogoutDialogOpen(true);
    handleMenuClose();
  };
  const handleSubmit = async () => {
    const { data } = await api.logoutUser();
    if (data.success) {
      localStorage.clear();
      dispatch(setUser());
      setLogoutDialogOpen(false);
      dispatch(setMessage("Logged out successfully!!"));
      cookies.remove("username");
      cookies.remove("token");
      navigate("/");
    }
  };
  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  useEffect(() => {
    dispatch(setUser());
  }, []);

  const { pathname } = location;
  if (isLoading) return <LoadingMessage message="Fetching information... " />;
  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <Toolbar sx={styles.toolbar}>
        <Typography
          sx={styles.heading}
          variant="h2"
          align="center"
          component={Link}
          to="/"
        >
          Instander
        </Typography>
        <div style={styles.actions}>
          {user && (
            <div style={styles.profile}>
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt={user} src="" />
                <Typography
                  variant="h6"
                  sx={{
                    marginLeft: "1rem",
                    color: "rgba(0,183,255, 1)",
                    fontWeight: "bold",
                  }}
                >
                  {user}
                </Typography>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  <Person /> Profile
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/chats"
                  onClick={handleMenuClose}
                >
                  <Chat /> Messaging
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout /> Logout
                </MenuItem>
              </Menu>
              <LogoutConfirmationDialog
                open={logoutDialogOpen}
                onClose={handleLogoutCancel}
                onConfirm={handleSubmit}
              />
            </div>
          )}
          {!user && pathname !== "/auth" && (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              SignIn
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
