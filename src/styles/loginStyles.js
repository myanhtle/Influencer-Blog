import { makeStyles } from "@material-ui/core/styles";
import theme from "../configs/theme";

console.log(theme);
const useLoginStyles = makeStyles({
  loginCard: {
    width: "80vw",
    margin: "5vh auto 5vh auto",
    height: "82vh",
  },
  loginDisplay: {
    margin: "auto",
    padding: "5vh",
    textAlign: "center",
    border: "3px solid " + theme.palette.primary.dark,
    borderRight: "none",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundImage:
      "radial-gradient(" +
      theme.palette.secondary.light +
      ", " +
      theme.palette.secondary.main +
      " )",
  },
  loginActions: {
    margin: "auto",
    padding: "5vh",
    textAlign: "center",
    border: "3px solid " + theme.palette.primary.dark,
    borderLeft: "none",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  loginGrid: {
    height: "100%",
  },
  loginLogo: {
    width: "50%",
    margin: "auto",
  },
});

export { useLoginStyles };
