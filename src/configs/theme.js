import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#a5d6a7",
    },
    background: {
      main: "#fffff0",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#FFFFF0",
        },
      },
    },
  },
});

export default theme;
