import { makeStyles } from "@material-ui/core/styles";

const navBarStyles = makeStyles({
  navbar: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    maxHeight: "8vh !important",
    minHeight: "8vh !important",
  },
  siteName: {height: "6vh", display: "flex", alignItems: "center" },
  navButtonsContainer: { textAlign: "center" },
  loginButtonContainer: { textAlign: "right" },
});

export default navBarStyles;
