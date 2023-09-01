import React, { useState } from "react";
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
import meeting from "../assets/meeting.png";

const LoginForm = (props) => {
  const [password, setPassword] = useState("");

  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <Container className="Left-section">
        <h1 className="primary-heading title ">Live work, live Reunify</h1>
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
            change your password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              autoComplete="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name=" confirm password"
              label=" confirm "
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              form
              fullWidth
              style={{ backgroundColor: "rgb(63, 81, 181)" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
