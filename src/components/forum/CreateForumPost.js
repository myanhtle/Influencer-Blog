import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "92.8ch",
    },
  },
}));

export default function CreateForumPost({ posts, setPosts, setClickedPost }) {
  const { username } = useContext(UserContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postContent, setPostContent] = useState({
    Title: "",
    Content: "",
    Date: "",
    Likes: 0,
    User: "",
  });
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (event) => {
    setPostContent({
      ...postContent,
      [event.currentTarget.id]: event.target.value,
    });
    console.log(postContent);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (postContent.Title === "" || postContent.Date === "") {
      setAnchorEl(event.currentTarget);
    } else {
      fetch(`http://localhost:8080/forum/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...postContent, User: username }),
      }).then(() => {
        setClickedPost((prev) => !prev);
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="Title"
            label="Description"
            variant="filled"
            onChange={handleChange}
            value={postContent.Title}
          />
        </div>
        <TextField
          required
          id="Content"
          label="What's new?"
          multiline
          rows={4}
          value={postContent.Content}
          onChange={handleChange}
          variant="filled"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="secondary" onClick={handlePost}>
            Post
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography
              style={{ padding: "20px" }}
              className={classes.typography}
            >
              Fill out required fields
            </Typography>
          </Popover>
        </div>
      </form>
    </div>
  );
}