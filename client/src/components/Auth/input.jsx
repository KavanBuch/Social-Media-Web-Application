import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  value,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  error,
  helperText,
  handleBlur,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        error={error}
        color={!error ? "success" : null}
        helperText={helperText}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
