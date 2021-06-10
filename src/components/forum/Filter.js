import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloudIcon from "@material-ui/icons/Cloud";
import CloudOutlinedIcon from "@material-ui/icons/CloudOutlined";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    width: "100%",
    backgroundColor: "#dcedc7",
  },
}));

export default function Filter({
  posts,
  setPosts,
  setClickedPost,
  sortBy,
  setSortBy,
  filterTags,
  setFilterTags,
}) {
  const classes = useStyles();

  /**
   * Sorts posts by most recent
   * @param {*} e event
   */
  const handleNewSort = (e) => {
    e.preventDefault();
    setSortBy({ new: true, hot: false });
    setClickedPost((prev) => {
      return !prev;
    });
  };

  /**
   * sorts posts my most popular
   * @param {*} e event
   */
  const handleHotSort = (e) => {
    e.preventDefault();
    setSortBy({ new: false, hot: true });
    setClickedPost((prev) => {
      return !prev;
    });
  };

  const handleCheck = (e) => {
    console.log(e.currentTarget.id);
    setFilterTags({
      ...filterTags,
      [e.currentTarget.id]: !filterTags[e.currentTarget.id],
    });
    setClickedPost((prev) => {
      return !prev;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1%",
        marginBottom: "1%",
      }}
    >
      <Paper className={classes.root}>
        <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleNewSort}>
            New
          </Button>
          <Button variant="contained" color="primary" onClick={handleHotSort}>
            Hot
          </Button>
        </ButtonGroup>
        <FormGroup row style={{ display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                id="outdoors"
                onChange={handleCheck}
                color="primary"
                icon={<CloudOutlinedIcon />}
                checkedIcon={<CloudIcon />}
              />
            }
            label="Outdoors"
            style={{ paddingTop: "2%", paddingRight: "10%" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="food"
                onChange={handleCheck}
                color="primary"
                icon={<CloudOutlinedIcon />}
                checkedIcon={<CloudIcon />}
              />
            }
            label="Food"
            style={{ paddingTop: "2%", paddingRight: "10%" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="travel"
                onChange={handleCheck}
                color="primary"
                icon={<CloudOutlinedIcon />}
                checkedIcon={<CloudIcon />}
              />
            }
            label="Travel"
            style={{ paddingTop: "2%", paddingRight: "10%" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="lifestyle"
                onChange={handleCheck}
                color="primary"
                icon={<CloudOutlinedIcon />}
                checkedIcon={<CloudIcon />}
              />
            }
            label="Lifestyle"
            style={{ paddingTop: "2%" }}
          />
        </FormGroup>
      </Paper>
    </div>
  );
}
