import { makeStyles } from "@material-ui/core/styles";

const useLoginStyles = makeStyles({
  loginCard: {
    margin: "auto",
    marginTop: "2rem",
    width: "25rem",
    padding: "2rem",
    textAlign: "center",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

export { useLoginStyles };
