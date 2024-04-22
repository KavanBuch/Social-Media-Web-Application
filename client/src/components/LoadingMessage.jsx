import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingMessage = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="10vh"
    >
      <Typography variant="h6" mt={2}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingMessage;
