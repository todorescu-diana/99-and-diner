import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { themeColors } from "./theme";
import SignUpPage from "./pages/SignUpPage";
import { useGlobalContext } from "./contexts/UserGlobalContext";

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
  const [userGlobalState] = useGlobalContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {userGlobalState.role !== ""? (
            userGlobalState.role === "manager" ? (
              <Route path="/" element={<></>} />
            ) : userGlobalState.role === "client" ? (
              <Route path="/" element={<></>} />
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
