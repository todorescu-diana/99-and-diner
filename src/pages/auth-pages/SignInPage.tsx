import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLogin } from "../../hooks/login-hooks";
import { useNavigate } from "react-router-dom";
import { themeColors } from "../../theme/theme";
import { useUserGlobalContext } from "../../contexts/UserGlobalContext";
import StyledFooter from "../../components/StyledFooter";

export default function SignInPage() {
  const { doLogin } = useLogin();
  const navigate = useNavigate();
  const [, setUserGlobalState] = useUserGlobalContext();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    doLogin({
      email: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
    })
      .then((loginResult) => {
        if (loginResult !== undefined) {
          setUserGlobalState({
            id: loginResult.user_id,
            email: loginResult.user_email,
            password: loginResult.user_password,
            role: loginResult.user_role,
            firstName: loginResult.user_first_name,
            lastName: loginResult.user_last_name,
          });
          if (loginResult.user_role === "client") {
            navigate("/content");
          } else if (loginResult.user_role === "manager") {
            navigate("/editcontent");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <Container component="main" sx={{ marginBottom: 8.35 }}>
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
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "primary.main" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              Sign In
            </Button>
            <Grid container sx={{ mt: 4, justifyContent: "center" }}>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ color: "primary.main" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <StyledFooter />
    </Box>
  );
}
