import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

export default function Filter({
  posts,
  setPosts,
  setClickedPost,
  sortBy,
  setSortBy,
}) {
  const classes = useStyles();
  const [filterTags, setFilterTags] = useState({
    outdoors: false,
    food: false,
    travel: false,
    lifestyle: false,
  });

  const handleNewSort = (e) => {
    e.preventDefault();
    setSortBy({ new: true, hot: false });
    setClickedPost((prev) => {
      return !prev;
    });
  };

  const handleHotSort = (e) => {
    e.preventDefault();
    setSortBy({ new: false, hot: true });
    setClickedPost((prev) => {
      return !prev;
    });
  };

  return (
    <div
      className={classes.root}
      style={{ marginLeft: "30%", marginTop: "1.5%" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewSort}
              >
                New
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleHotSort}
              >
                Hot
              </Button>
            </ButtonGroup>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Outdoors"
                style={{ paddingTop: "2%", paddingRight: "10%" }}
              />
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Food"
                style={{ paddingTop: "2%", paddingRight: "10%" }}
              />
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Travel"
                style={{ paddingTop: "2%", paddingRight: "10%" }}
              />
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Lifestyle"
                style={{ paddingTop: "2%" }}
              />
            </FormGroup>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
