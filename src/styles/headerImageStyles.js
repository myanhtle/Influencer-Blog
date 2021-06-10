import { makeStyles } from "@material-ui/core/styles";

const headerImageStyles = makeStyles({
  headerImgContainer: {
    display: "flex",
    flexDirection: "column",
    height: "25vh",
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
  headerTextContainer: {
    position: "absolute",
    top: "9.5%",
    backgroundColor: "transparent",
    height: "25vh",
    width: "100vw",
    maxWidth: "calc(4320/2163*100vw)",
    maxHeight: "calc(2163/4320*92vw)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    opacity: 1,
    fontSize: "8vw",
  },
});

export default headerImageStyles;
