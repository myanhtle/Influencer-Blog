import { makeStyles } from "@material-ui/core/styles";

const footerStyles = makeStyles({
  footer: {
    width: "100vw",
    height: "40vh",
    backgroundColor: "#488288",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    "& .MuiTypography-root": {
      color: "white",
    },
    "& a": {
      color: "white"
    }
  },
  footerRight: {
    margin: "auto 3rem auto auto",
    textAlign: "right",
    "& p": {
      width: "20vh",
      textAlign: "center",
    },
  },
  footerImg: {
    maxHeight: "20vh",
  },
  footerLeft: {
    margin: "auto auto auto 3rem",
    "& .MuiTypography-root": {
    }
  },
  footerCenter: {
    margin: "auto"
  }
});

export default footerStyles;
