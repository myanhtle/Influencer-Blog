import { makeStyles } from "@material-ui/core/styles";

const navBarStyles = makeStyles({
  navbar: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    maxHeight: "8vh !important",
    minHeight: "8vh !important",
  },
  siteName: { height: "6vh", display: "flex", alignItems: "center" },
  navButtonsContainer: {
    textAlign: "center",
    "& .MuiButton-root": {
      color: "white",
      margin: "0 0.5rem 0 0.5rem",
      border: "1px solid white",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
  },
  loginButtonContainer: { textAlign: "right" },
});

export default navBarStyles;
