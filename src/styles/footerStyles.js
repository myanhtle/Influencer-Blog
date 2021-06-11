import { makeStyles } from "@material-ui/core/styles";
import theme from "../configs/theme";

const footerStyles = makeStyles({
  footer: {
    width: "100vw",
    height: "40vh",
    backgroundColor: "#488288",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    "& .MuiTypography-root": {
      color: "white",
    },
    "& a": {
      color: "white"
    }
  },
  footerRight: {
    margin: "auto 3rem auto auto",
    [theme.breakpoints.down("md")]: {
      margin: "auto",
    },
    textAlign: "right",
    "& p": {
      maxWidth: "30vw",
      textAlign: "center",
    },
    maxWidth: "30vw"
  },
  footerImg: {
    maxHeight: "20vh",
    maxWidth: "30vw",
  },
  footerLeft: {
    margin: "auto auto auto 3rem",
    "& .MuiTypography-root": {
    }
  },
});

export default footerStyles;
