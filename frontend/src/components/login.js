import React, { useState, useRef } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoginAction } from "../redux/Actions/LoginAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import meeting from "../assets/meeting.png";
import { useDispatch } from "react-redux";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
/*
  const userInfo = useSelector((state) => state.login.userInfo)

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
    emailInputRef.current?.focus();
    passwordInputRef.current?.focus();
  }, [navigate, userInfo]);

*/
  const submitForm = async (values) => {
    try {
      setLoading(true);
      if (values.email && typeof values.email === "string") {
        values.email = values.email.toLowerCase();
      }
      await dispatch(LoginAction(values));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        if (errors.length > 0) {
          errors.forEach((error) => {
            console.log(`Error: ${error.msg}`);
          });
        }
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <Container Name="Left-section">
        <h1 className="primary-heading title">Live work, live Reunify</h1>
        <img src={meeting} alt="meeting" className="image" />
      </Container>

      <Container component="main" className="Right-section">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            borderradius: "75",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            <Form>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                margin="normal"
                name="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                inputRef={emailInputRef}
                required
              />
              <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                margin="normal"
                name="password"
                label="Password"
                type="password"
                autoComplete="password"
                inputRef={passwordInputRef}
                required
              />
              <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                style={{ backgroundColor: "rgb(63, 81, 181)" }}
                sx={{ mt: 3, mb: 2 }}
                
              >
                Sign in
              </Button>

              <Grid container className="minimal-text">
                <Grid item xs>
                  <RouterLink to="/forgotPassword" variant="body2">
                    Forgot password?
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
