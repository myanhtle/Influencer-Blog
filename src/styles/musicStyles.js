import { makeStyles } from "@material-ui/core/styles";

const musicPageStyles = makeStyles({
  headerImgContainer: {
    display: "flex",
    flexDirection: "column",
    height: "50vh",
    width: "100vw",
    maxWidth: "calc(4320/2163*100vw)",
    maxHeight: "calc(2163/4320*92vw)",
    margin: "auto",
  },
  headerImg: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "cover",
    filter: "brightness(50%)",
  },
  welcomeTextContainer: {
    position: "absolute",
    top: "9.5%",
    backgroundColor: "transparent",
    height: "51vh",
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
    fontSize: "8vw",
  },
  bottomContainer: {
    height: "auto",
    width: "90vw",
    margin: "auto",
    padding: "1rem",
  },
  content: {
    padding: "1rem",
  },
  subHeading: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%",
    fontSize: "3vh",
    color: "#4b6b6e",
  },
});

export default musicPageStyles;
