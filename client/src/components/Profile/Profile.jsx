import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser, getUserProfile, updateProfile } from "../../reducers/auth";
import FileBase from "react-file-base64";
import CheckIcon from "@mui/icons-material/Check";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState(undefined);
  const user = useSelector((state) => {
    return state.user.user;
  });
  const profile = useSelector((state) => {
    return state.user.profile;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser());
  }, []);

  useEffect(() => {
    if (!user) return;
    dispatch(getUserProfile(user));
  }, [user]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        profilePicture: profile.profilePicture,
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const data = { ...formData, username: user };
    dispatch(updateProfile(data));
    setEditMode(false);
    setSuccess("Updated profile successfully!!");
  };
  if (!profile) {
    return <CircularProgress />;
  }
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {success && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {success}
            </Alert>
          )}
          <Typography
            variant="h4"
            mb={2}
            sx={{ textAlign: "center", color: "blue" }}
          >
            Welcome, {user}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mb={2}>
                <Avatar
                  src={formData.profilePicture}
                  alt="Profile Picture"
                  sx={{ width: 150, height: 150 }}
                />
              </Box>
              {editMode && (
                <Box display="flex" justifyContent="center" mb={2}>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormData({ ...formData, profilePicture: base64 })
                    }
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            {editMode ? (
              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <div style={{ textAlign: "center" }}>
                  <Button variant="outlined" onClick={handleEditClick}>
                    Edit
                  </Button>
                </div>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
