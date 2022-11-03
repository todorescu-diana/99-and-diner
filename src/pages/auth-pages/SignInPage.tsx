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
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguageSelect from "../../components/ChangeLanguageSelect";

export default function SignInPage() {
  const { doLogin } = useLogin();
  const navigate = useNavigate();
  const [, setUserGlobalState] = useUserGlobalContext();

  const [invalidCredentials, setInvalidCredentials] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    doLogin({
      email: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
    })
      .then((loginResult) => {
        if (loginResult !== undefined) {
          if (invalidCredentials) setInvalidCredentials(false);
          setUserGlobalState({
            id: loginResult.user_id,
            email: loginResult.user_email,
            password: loginResult.user_password,
            role: loginResult.user_role,
            firstName: loginResult.user_first_name,
            lastName: loginResult.user_last_name,
          });
          window.sessionStorage.setItem(
            "MY_APP_STATE",
            JSON.stringify(loginResult)
          );
          if (loginResult.user_role === "client") {
            navigate("/content");
          } else if (loginResult.user_role === "manager") {
            navigate("/editcontent");
          }
        } else {
          setInvalidCredentials(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [t] = useTranslation("common");

  return (
    <Box>
      <Box sx={{ position: "absolute", right: 0, top: 0, margin: 5 }}>
        <ChangeLanguageSelect />
      </Box>

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
            {t("signin.title")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={invalidCredentials}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("fields.email")}
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ backgroundColor: "#fefcf6", borderRadius: 2 }}
            />
            <TextField
              error={invalidCredentials}
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("fields.password")}
              id="password"
              autoComplete="current-password"
              sx={{ backgroundColor: "#fefcf6", borderRadius: 2 }}
              type={!isPasswordVisible ? "password" : "text"}
              InputProps={{
                endAdornment: !isPasswordVisible ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="visibility-on"
                      onClick={() => setIsPasswordVisible(true)}
                    >
                      <VisibilityIcon color={"primary"} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="visibility-off"
                      onClick={() => setIsPasswordVisible(false)}
                    >
                      <VisibilityOffIcon color={"primary"} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, color: themeColors.secondary }}
            >
              {t("signin.button")}
            </Button>
            <Collapse in={invalidCredentials}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setInvalidCredentials(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2, mt: 3 }}
              >
                {t("signin.error")}
              </Alert>
            </Collapse>
            <Grid container sx={{ mt: 4, justifyContent: "center" }}>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ color: "primary.main" }}
                >
                  {t("signin.signupalternative")}
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
