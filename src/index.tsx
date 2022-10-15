import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserGlobalContextProvider } from "./contexts/UserGlobalContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserGlobalContextProvider>
      <App />
    </UserGlobalContextProvider>
  </React.StrictMode>
);
