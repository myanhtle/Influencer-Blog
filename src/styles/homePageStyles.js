import { makeStyles } from "@material-ui/core/styles";

const homePageStyles = makeStyles({
  headerImgContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    maxWidth: "calc(4320/2163*100vw)",
    maxHeight: "calc(2163/4320*92vw)",
    margin: "auto",
  },
  headerImg: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "cover",
  },
  welcomeTextContainer: {
    position: "absolute",
    top: "8vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100vh",
    width: "100vw",
    maxWidth: "calc(4320/2163*100vw)",
    maxHeight: "calc(2163/4320*92vw)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  welcomeText: {
    color: "white",
    opacity: 1,
    fontSize: "10vw",
  },
  bottomContainer: {
    height: "auto",
    width: "90vw",
    margin: "auto",
    padding: "1rem",
  },
  content: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      textAlign: "left",
      width: "100%",
    },
    "& .MuiButton-root": {
      maxWidth: "15rem",
    },
    "& h3": {
      paddingLeft: ".5rem"
    },
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-around",
    " & img": {
      maxWidth: "15%",
      margin: "1rem"
    },
    marginBottom: "1rem"
  },
  imageContainer2: {

    "& img": {
      margin: "auto",
      display: "block",
      height: "10rem"
    }
  },
  expandIcon: {
    fontSize: "10vw",
    color: "white",
  },
  bigLogo: {
    maxHeight: "calc(2163/4320*92vw/4)",
  },
});

export default homePageStyles;
