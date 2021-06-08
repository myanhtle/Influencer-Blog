import { makeStyles } from "@material-ui/core/styles";

const navBarStyles = makeStyles({
  navbar: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    height: "3rem",
  },
  siteName: { height: "3rem", display: "flex", alignItems: "center" },
  navButtonsContainer: { textAlign: "center" },
  loginButtonContainer: { textAlign: "right" },
});

export default navBarStyles;
