import { makeStyles } from "@material-ui/core/styles";
import theme from "../configs/theme";

console.log(theme);
const useLoginStyles = makeStyles({
  loginCard: {
    width: "80vw",
    margin: "5vh auto 5vh auto",
  },
  loginDisplay: {
    margin: "auto",
    padding: "5vh",
    textAlign: "center",
    borderRight: "none",
    display: "flex",
    flexDirection: "column",
    minHeight: "82vh",
    backgroundImage:
      "radial-gradient(" +
      theme.palette.secondary.light +
      ", " +
      theme.palette.secondary.main +
      " )",
    [theme.breakpoints.down("xs")]: {
      order: 2,
    },
  },
  loginActions: {
    margin: "auto",
    padding: "5vh",
    textAlign: "center",
    borderLeft: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      order: 1,
    },
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
