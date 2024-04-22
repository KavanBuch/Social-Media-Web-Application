import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Avatar, Box } from "@mui/material";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px", height: "100vh" }}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ marginBottom: "2rem" }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          alt="Profile Picture"
          src="/images/computer.png"
          sx={{ width: 250, height: 250, borderRadius: 0 }}
        />
      </Box>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ marginTop: "1rem" }}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
