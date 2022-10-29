import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { themeColors } from "../../theme/theme";
import axios from "axios";

export default function SignUpPage() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await axios.get("http://localhost:3002/api/get");
    const { data } = await res;
    const totalNumberOfUsers = data.length;

    const newUser = {
      userId: totalNumberOfUsers,
      userFirstName: formData.get("firstName"),
      userLastName: formData.get("lastName"),
      userEmail: formData.get("email"),
      userPassword: formData.get("password"),
      userRole: "client",
    };

    const postResponseData = await axios.post(
      "http://localhost:3002/api/create",
      newUser
    );
    const response = await postResponseData.data;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h1" style={{ marginBottom: 50 }}>
          99 & diner
        </Typography>
        <Typography component="h1" variant="h5" sx={{ color: "primary.main" }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            sx={{ backgroundColor: "#fefcf6" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            sx={{ backgroundColor: "#fefcf6" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            sx={{ backgroundColor: "#fefcf6" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ backgroundColor: "#fefcf6" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, color: themeColors.secondary }}
          >
            Sign Up
          </Button>
          <Grid container sx={{ mt: 4, justifyContent: "center" }}>
            <Grid item>
              <Link href="/" variant="body2" sx={{ color: "primary.main" }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
