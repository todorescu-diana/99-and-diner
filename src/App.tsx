import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { themeColors } from "./theme";
import SignUpPage from "./pages/SignUpPage";
import { AuthGuard } from "./pages/guards/AuthGuard";

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

const managerRouter = createBrowserRouter([]);
const clientRouter = createBrowserRouter([]);

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthGuard>
        {(user) =>
          user ? (
            user.role === "manager" ? (
              <RouterProvider router={managerRouter} />
            ) : (
              <RouterProvider router={clientRouter} />
            )
          ) : (
            <RouterProvider router={authRouter} />
          )
        }
      </AuthGuard>
    </ThemeProvider>
  );
}

export default App;
