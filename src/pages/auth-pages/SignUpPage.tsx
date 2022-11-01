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
import { User } from "../../models/User";
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import ChangeLanguageSelect from "../../components/ChangeLanguageSelect";

export default function SignUpPage() {
  const [emailAlreadyInUseError, setEmailAlreadyInUseError] = useState(false);
  const [userCreatedWithSuccess, setUserCreatedWithSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [emptyFirstNameFieldErrorActive, setEmptyFirstNameFieldErrorActive] =
    useState(false);
  const [emptyLastNameFieldErrorActive, setEmptyLastNameFieldErrorActive] =
    useState(false);
  const [emptyEmailFieldErrorActive, setEmptyEmailFieldErrorActive] =
    useState(false);
  const [emptyPasswordFieldErrorActive, setEmptyPasswordFieldErrorActive] =
    useState(false);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.get("firstName") === "") {
      setEmptyFirstNameFieldErrorActive(true);
    }

    if (formData.get("lastName") === "") {
      setEmptyLastNameFieldErrorActive(true);
    }

    if (formData.get("email") === "") {
      setEmptyEmailFieldErrorActive(true);
    }

    if (formData.get("password") === "") {
      setEmptyPasswordFieldErrorActive(true);
    } else {
      if (emptyFirstNameFieldErrorActive) {
        setEmptyFirstNameFieldErrorActive(false);
      }
      if (emptyLastNameFieldErrorActive) {
        setEmptyLastNameFieldErrorActive(false);
      }
      if (emptyEmailFieldErrorActive) {
        setEmptyEmailFieldErrorActive(false);
      }
      if (emptyPasswordFieldErrorActive) {
        setEmptyPasswordFieldErrorActive(false);
      }
      const res = await axios.get("http://localhost:3002/api/get");
      const { data } = await res;

      const userWithEmail = data.find(
        (user: User) => user.user_email === formData.get("email")
      );
      if (
        formData.get("firstName") !== "" &&
        formData.get("lastName") !== "" &&
        formData.get("email") !== "" &&
        formData.get("password") !== "" &&
        userWithEmail !== undefined
      ) {
        setEmailAlreadyInUseError(true);
      } else {
        try {
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
          if (!postResponseData.data.error) {
            if (emailAlreadyInUseError) {
              setEmailAlreadyInUseError(false);
            }
            if (emptyFirstNameFieldErrorActive) {
              setEmptyFirstNameFieldErrorActive(false);
            }
            if (emptyLastNameFieldErrorActive) {
              setEmptyLastNameFieldErrorActive(false);
            }
            if (emptyEmailFieldErrorActive) {
              setEmptyEmailFieldErrorActive(false);
            }
            if (emptyPasswordFieldErrorActive) {
              setEmptyPasswordFieldErrorActive(false);
            }
            setUserCreatedWithSuccess(true);
            if (firstNameInputRef.current) firstNameInputRef.current.value = "";
            if (lastNameInputRef.current) lastNameInputRef.current.value = "";
            if (emailInputRef.current) emailInputRef.current.value = "";
            if (passwordInputRef.current) passwordInputRef.current.value = "";
          } else {
            if (userCreatedWithSuccess) setUserCreatedWithSuccess(false);
          }
        } catch (err) {
          if (userCreatedWithSuccess) setUserCreatedWithSuccess(false);
        }
      }
    }
  }

  const [t] = useTranslation("common");

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ position: "absolute", right: 0, top: 0, margin: 5 }}>
        <ChangeLanguageSelect />
      </Box>
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
          {t("signup.title")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={emptyFirstNameFieldErrorActive}
            margin="normal"
            required
            fullWidth
            id="firstName"
            label={t("fields.firstname")}
            name="firstName"
            autoComplete="firstName"
            autoFocus
            sx={{ backgroundColor: "#fefcf6" }}
            inputRef={firstNameInputRef}
          />
          <TextField
            error={emptyLastNameFieldErrorActive}
            margin="normal"
            required
            fullWidth
            id="lastName"
            label={t("fields.lastname")}
            name="lastName"
            autoComplete="lastName"
            sx={{ backgroundColor: "#fefcf6" }}
            inputRef={lastNameInputRef}
          />
          <TextField
            error={emptyEmailFieldErrorActive || emailAlreadyInUseError}
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("fields.email")}
            name="email"
            autoComplete="email"
            sx={{ backgroundColor: "#fefcf6" }}
            inputRef={emailInputRef}
          />
          <TextField
            error={emptyPasswordFieldErrorActive}
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("fields.password")}
            type={!isPasswordVisible ? "password" : "text"}
            id="password"
            autoComplete="current-password"
            sx={{ backgroundColor: "#fefcf6" }}
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
            inputRef={passwordInputRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, color: themeColors.secondary }}
          >
            {t("signup.button")}
          </Button>
          <Collapse in={emailAlreadyInUseError}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setEmailAlreadyInUseError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mt: 3 }}
            >
              {t("signup.emailalreadyinuseerror")}
            </Alert>
          </Collapse>
          <Collapse
            in={
              emptyFirstNameFieldErrorActive ||
              emptyLastNameFieldErrorActive ||
              emptyEmailFieldErrorActive ||
              emptyPasswordFieldErrorActive
            }
          >
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    if (emptyFirstNameFieldErrorActive) {
                      setEmptyFirstNameFieldErrorActive(false);
                    }
                    if (emptyLastNameFieldErrorActive) {
                      setEmptyLastNameFieldErrorActive(false);
                    }
                    if (emptyEmailFieldErrorActive) {
                      setEmptyEmailFieldErrorActive(false);
                    }
                    if (emptyPasswordFieldErrorActive) {
                      setEmptyPasswordFieldErrorActive(false);
                    }
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mt: 3 }}
            >
              {t("signup.emptyfieldserror")}
            </Alert>
          </Collapse>
          <Collapse in={userCreatedWithSuccess}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setUserCreatedWithSuccess(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mt: 3 }}
            >
              {t("signup.success")}
            </Alert>
          </Collapse>
          <Grid container sx={{ mt: 4, mb: 5, justifyContent: "center" }}>
            <Grid item>
              <Link href="/" variant="body2" sx={{ color: "primary.main" }}>
                {t("signup.signinalternative")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
