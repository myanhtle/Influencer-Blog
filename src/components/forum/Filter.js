import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#9fbcbf",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{ marginLeft: "30%", marginTop: "1.5%" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
