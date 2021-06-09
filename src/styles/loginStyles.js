import { makeStyles } from "@material-ui/core/styles";

const useLoginStyles = makeStyles({
  loginCard: {
    width: "80vw",
    margin: "auto",
    marginTop: "5vh",
    height: "80vh",
  },
  loginActions: {
    margin: "auto",
    padding: "5vh",
    textAlign: "center",
    border: "3px solid #488288",
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
    margin: "auto"
  }
});

export { useLoginStyles };
