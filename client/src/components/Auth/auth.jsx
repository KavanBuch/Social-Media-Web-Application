import React, { useEffect, useState } from "react";
import styles from "./styles";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./input";
import { registerUser, loginUser } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setUser } from "../../reducers/auth";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { userExists, emailExists } from "../../api/index";

const cookies = new Cookies();

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(20, "At max 20 characters allowed")
    .required("First name is required"),
  lastName: Yup.string()
    .max(20, "At max 20 characters allowed")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .test("unique-email", "Email already in use", async (value) => {
      try {
        const { data } = await emailExists(value);
        return data.error != undefined;
      } catch (error) {
        console.error("Error checking username uniqueness:", error);
        return false;
      }
    })
    .required("Email is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .test("unique-username", "Username is not available", async (value) => {
      try {
        const { data } = await userExists([value]);
        return data.error != undefined;
      } catch (error) {
        console.error("Error checking username uniqueness:", error);
        return false;
      }
    })
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password cannot exceed 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const loginSchema = Yup.object().shape({
  username: Yup.string().required("username is required"),
  password: Yup.string().required("password is required"),
});

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [correctCredentials, setCorrectCredentials] = useState(true);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => {
      return !prevShowPassword;
    });
  };
  const switchMode = () => {
    setShowPassword(() => {
      return false;
    });
    setIsSignUp((prevIsSignup) => {
      return !prevIsSignup;
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (form) => {
      let success = null;
      const message = await registerUser(form);
      success = message.data.success;
      if (success) {
        localStorage.setItem("user", form.username);
        cookies.set("token", message.data.token);
        cookies.set("username", message.data.username);
        dispatch(setUser());
        return navigate("/");
      }
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (form) => {
      try {
        let success = null;
        const message = await loginUser(form);
        success = message.data.success;
        if (success) {
          localStorage.setItem("user", form.username);
          cookies.set("token", message.data.token);
          cookies.set("username", message.data.username);
          dispatch(setUser());
          return navigate("/");
        }
      } catch (error) {
        console.log(error);
        setCorrectCredentials(false);
      }
    },
  });

  useEffect(() => {
    setCorrectCredentials(true);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={styles.paper} elevation={3}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        {!correctCredentials && (
          <Alert severity="error">Invalid Credentials</Alert>
        )}
        <form
          style={styles.form}
          onSubmit={isSignup ? formik.handleSubmit : loginFormik.handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  value={formik.values.firstName}
                  label="First Name"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  autoFocus
                  half
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <Input
                  name="lastName"
                  value={formik.values.lastName}
                  label="Last Name"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  half
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <Input
                  name="email"
                  value={formik.values.email}
                  label="Email Address"
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  type="email"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </>
            )}
            <Input
              name="username"
              value={
                isSignup ? formik.values.username : loginFormik.values.username
              }
              label="username"
              handleChange={
                isSignup ? formik.handleChange : loginFormik.handleChange
              }
              handleBlur={isSignup ? formik.handleBlur : loginFormik.handleBlur}
              error={
                isSignup
                  ? formik.touched.username && Boolean(formik.errors.username)
                  : loginFormik.touched.username &&
                    Boolean(loginFormik.errors.username)
              }
              helperText={
                isSignup
                  ? formik.touched.username && formik.errors.username
                  : loginFormik.touched.username && loginFormik.errors.username
              }
            />
            <Input
              name="password"
              label="Password"
              value={
                isSignup ? formik.values.password : loginFormik.values.password
              }
              handleChange={
                isSignup ? formik.handleChange : loginFormik.handleChange
              }
              handleBlur={isSignup ? formik.handleBlur : loginFormik.handleBlur}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              error={
                isSignup
                  ? formik.touched.password && Boolean(formik.errors.password)
                  : loginFormik.touched.password &&
                    Boolean(loginFormik.errors.password)
              }
              helperText={
                isSignup
                  ? formik.touched.password && formik.errors.password
                  : loginFormik.touched.password && loginFormik.errors.password
              }
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                value={formik.values.confirmPassword}
                label="Repeat Password"
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                type="password"
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
