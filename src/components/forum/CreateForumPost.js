import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "92.8ch",
    },
  },
}));

export default function CreateForumPost() {
  const classes = useStyles();
  const [postContent, setPostContent] = useState({
    title: "",
    postDetails: "",
    date: "",
    totalLikes: 0,
  });

  const handleChange = (event) => {
    setPostContent({
      ...postContent,
      [event.currentTarget.id]: event.target.value,
    });
    console.log(postContent);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="title"
            label="Description"
            variant="filled"
            onChange={handleChange}
            value={postContent.title}
          />
        </div>
        <TextField
          id="postDetails"
          label="What's new?"
          multiline
          rows={4}
          value={postContent.postDetails}
          onChange={handleChange}
          variant="filled"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="secondary">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
