import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth-pages/SignInPage";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { themeColors } from "./theme";
import SignUpPage from "./pages/auth-pages/SignUpPage";
import { useUserGlobalContext } from "./contexts/UserGlobalContext";
import ClientFoodMenuPage from "./pages/client-pages/ClientFoodMenuPage";

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
              <Route path="/" element={<></>} />
            ) : userGlobalState.role === "client" ? (
              <Route path="/" element={<ClientFoodMenuPage />} />
            ) : (
              <>
                <Route path="/" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </>
            )
          ) : (
            <>
              <Route path="/" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
