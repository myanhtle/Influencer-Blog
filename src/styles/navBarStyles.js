import { makeStyles } from "@material-ui/core/styles";
import theme from "../configs/theme";

const navBarStyles = makeStyles({
  navbar: {
    display: "grid",
    gridTemplateColumns: "20rem 1fr 20rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr 10rem",
    },
    maxHeight: "8vh !important",
    minHeight: "8vh !important",
  },
  siteName: {
    height: "6vh",
    display: "flex",
    alignItems: "center",
  },
  navButtonsContainer: {
    textAlign: "center",
    "& .MuiButton-root": {
      color: "white",
      margin: "0 0.5rem 0 0.5rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  loginButtonContainer: { textAlign: "right" },
  navDropdown: {
    "& .MuiPaper-root": { width: "8rem" },
    "& li": { margin: "auto" },
  },

  cartCount: {
    fontSize: "12px",
    background: "#ff0000",
    color: "#fff",
    padding: "0 5px",
    verticalAlign: "top",
  },
  cart: {
    color: "white",
  },
});

export default navBarStyles;
