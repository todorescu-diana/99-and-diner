import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth-pages/SignInPage";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { themeColors } from "./theme/theme";
import SignUpPage from "./pages/auth-pages/SignUpPage";
import { useUserGlobalContext } from "./contexts/UserGlobalContext";
import ClientContent from "./pages/client-pages/ClientContent";
import ManagerContent from "./pages/manager-pages/ManagerContent";
import { useEffect, useRef } from "react";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import i18next from "i18next";
import common_ro from "./translations/ro/common.json";
import common_en from "./translations/en/common.json";

const theme = createTheme({
  palette: {
    background: {
      default: themeColors.background,
    },
    primary: {
      main: themeColors.primary,
    },
  },
  typography: {
    fontFamily: ["Quicksand", "Arial"].join(","),
  },
});

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "ro",
  resources: {
    ro: {
      common: common_ro,
    },
    en: {
      common: common_en,
    },
  },
});

function App() {
  const [userGlobalState, setUserGlobalState] = useUserGlobalContext();
  const [, i18n] = useTranslation("common");

  useEffect(() => {
    async function getLanguage() {
      let language = window.sessionStorage.getItem("i18nlanguage");
      console.log("LANMGUAGE: " + language)
      if (language !== null) i18n.changeLanguage(language);
    }
    getLanguage();
  }, []);
  useEffect(() => {
    const data = window.sessionStorage.getItem("MY_APP_STATE");
    if (data !== null) {
      const user = JSON.parse(data);
      setUserGlobalState({
        id: user.user_id,
        email: user.user_email,
        password: user.user_password,
        role: user.user_role,
        firstName: user.user_first_name,
        lastName: user.uer_last_name,
      });
    }
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {userGlobalState.role !== "" ? (
              userGlobalState.role === "manager" ? (
                <>
                  <Route path="/editcontent" element={<ManagerContent />} />
                </>
              ) : userGlobalState.role === "client" ? (
                <>
                  <Route path="/content" element={<ClientContent />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Navigate to={"/signin"} />} />
                  <Route path="/" element={<SignInPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </>
              )
            ) : (
              <>
                <Route path="/" element={<Navigate to={"/signin"} />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
