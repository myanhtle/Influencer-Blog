import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#9CB380",
    },
    primary: {
      main: "#488288",
    },
    background: {
      main: "#F5F0F6",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#F5F0F6",
        },
      },
    },
  },
});

export default theme;
