import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./configs/theme";
import {UserContextProvider} from "./contexts/UserContext"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
