import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth-pages/SignInPage";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { themeColors } from "./theme";
import SignUpPage from "./pages/auth-pages/SignUpPage";
import { useUserGlobalContext } from "./contexts/UserGlobalContext";
import ClientContent from "./pages/client-pages/ClientContent";
import ManagerContent from "./pages/manager-pages/ManagerContent";

const theme = createTheme({
  palette: {
    background: {
      default: themeColors.background,
    },
    primary: {
      main: themeColors.primary,
    },
  },
});

function App() {
  const [userGlobalState] = useUserGlobalContext();
  return (
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
  );
}

export default App;
