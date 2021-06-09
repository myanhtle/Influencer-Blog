import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { UserContext } from "../../contexts/UserContext";
import { Comment, Form, Header } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "92.8ch",
    },
  },
}));

export default function Comments({ p, setClickedPost }) {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [newComment, setNewComment] = useState({
    User: "",
    Content: "",
    Date: "",
  });

  const handleCommenting = (e) => {
    setNewComment({ ...newComment, Content: e.target.value });
  };

  const handlePost = (event) => {
    event.preventDefault();
    const updatedPost = {
      title: p.Title,
      type: "Comments",
      val: [
        ...p.Comments,
        {
          ...newComment,
          Date: moment().format("LLL"),
          User: user.displayName,
        },
      ],
    };
    fetch(`http://localhost:8080/forum/update/${p.Title}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    }).then(() => {
      setClickedPost((prev) => {
        return !prev;
      });
    });
  };

  return (
    <div>
      {JSON.stringify(p.Comments)}
      <Comment>
        <Comment.Content>
          <Comment.Author as="a" style={{ color: "#436063" }}>
            <b>Matt </b>
            <i frame style={{ color: "grey", fontSize: "12px" }}>
              Today at 5:42PM
            </i>
          </Comment.Author>
          <Comment.Metadata></Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
        </Comment.Content>
      </Comment>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            multiline
            id="Title"
            label="Add a comment"
            variant="filled"
            value={newComment.Content}
            onChange={handleCommenting}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="secondary" onClick={handlePost}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
