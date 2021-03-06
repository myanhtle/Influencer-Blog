import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { UserContext } from "../../contexts/UserContext";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "93ch"
    // "& .MuiTextField-root": {
    //   margin: "auto",
    //   width: "90vw",
    // },
  },
}));

export default function CreateForumPost({
  postTags,
  setClickedPost,
  setUpdate,
  setOpen,
}) {
  const { user, isLoggedIn } = useContext(UserContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [postContent, setPostContent] = useState({
    Title: "",
    Content: "",
    Date: "",
    Likes: 0,
    User: "",
    Tags: [],
    Comments: [],
    LikedBy: [],
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

  /**
   * makes POST request to db in order to make a new post to forum
   * @param {*} event
   */
  const handlePost = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      if (postContent.Title === "" || postContent.Content === "") {
        setAnchorEl(event.currentTarget);
      } else {
        setOpen(false);
        fetch(`http://localhost:8080/forum/add`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...postContent,
            User: user.displayName,
            Date: moment().format("LLL"),
            Tags: postTags,
          }),
        })
          .then(() => {
            setUpdate((prev) => {
              return prev + "0";
            });
            setClickedPost((prev) => !prev);
          })
          .then(() => {
            setPostContent({
              Title: "",
              Content: "",
              Date: "",
              Likes: 0,
              User: "",
              Tags: [],
              Comments: [],
              LikedBy: [],
            });
          });
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2%"}}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            fullWidth
            multiline
            id="Title"
            label="Description"
            variant="filled"
            onChange={handleChange}
            value={postContent.Title}
          />
        </div>
        <TextField
          required
          fullWidth
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
          <Button variant="contained" color="secondary" onClick={handlePost} style={{marginTop: "1rem"}}>
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
