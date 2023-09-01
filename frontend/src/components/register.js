import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../styles/login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import meeting from "../assets/meeting.png";
import { registerAction } from "../redux/Actions/RegisterAction";

const initialValues = {
  nom: "",
  prenom: "",
  email: "",
  password: "",
};
const RegisterSchema = Yup.object().shape({
  nom: Yup.string().required("Nom is required"),
  prenom: Yup.string().required("Prénom is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.register);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    emailInputRef.current?.focus();
    passwordInputRef.current?.focus();
  }, [navigate, userInfo]);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      if (values.email && typeof values.email === "string") {
        values.email = values.email.toLowerCase();
      }
      
      await dispatch(registerAction(values));
      setLoading(false);
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
      <Container className="Left-section">
        <h1 className="primary-heading  title">Live work, live Reunify</h1>
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
            borderRadius: "75",
          }}
        >
          <Typography component="h1" variant="h4">
            Create your account
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nom"
                  label="Name"
                  name="nom"
                  autoComplete="name"
                />
                <ErrorMessage
                  name="nom"
                  component="div"
                  style={{ color: "red" }}
                />

                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="prenom"
                  label="Last Name"
                  name="prenom"
                  autoComplete="family-name"
                />
                <ErrorMessage
                  name="prenom"
                  component="div"
                  style={{ color: "red" }}
                />

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
                  autoComplete="new-password"
                  inputRef={passwordInputRef}
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
                  Create your account
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
