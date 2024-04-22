import React, { useState } from "react";
import { Snackbar, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FlashMessage = ({ message }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "green",
          color: "white",
          p: 2,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          width: "350px",
        }}
      >
        <div style={{ flex: 1 }}>{message}</div>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default FlashMessage;
