import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { UserContext } from "../../contexts/UserContext";
import { Comment } from "semantic-ui-react";
import { nanoid } from "nanoid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "92.8ch",
    },
  },
}));

export default function Comments({ p, setClickedPost }) {
  const { user, isLoggedIn } = useContext(UserContext);
  const classes = useStyles();
  const [newComment, setNewComment] = useState({
    User: "",
    Content: "",
    Date: "",
    ID: "",
  });

  /**
   * sets newComment state to what user is typing
   * @param {*} e (event)
   */
  const handleCommenting = (e) => {
    setNewComment({ ...newComment, Content: e.target.value });
  };

  /**
   * post comment to database and display on forum
   * @param {*} event
   */
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
          ID: nanoid(),
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
      setNewComment({
        User: "",
        Content: "",
        Date: "",
        ID: "",
      });
      setClickedPost((prev) => {
        return !prev;
      });
    });
  };

  /**
   * deletes comment user posted
   * @param {*} e event
   */
  const handleDeleteComment = (e) => {
    console.log("delete");
    e.preventDefault();
    const updatedComments = p.Comments.filter(
      (c) => c.ID !== e.currentTarget.id
    );
    console.log(updatedComments);
    const updatedPost = {
      title: p.Title,
      type: "Comments",
      val: updatedComments,
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
      {p.Comments.map((comment, index) => (
        <div style={{ paddingBottom: "1%" }}>
          <Comment>
            <Comment.Content>
              <Comment.Author as="a" style={{ color: "#436063" }}>
                <b>{comment.User} </b>{" "}
                <i frame style={{ color: "grey", fontSize: "12px" }}>
                  {comment.Date}
                </i>
                <button
                  onClick={handleDeleteComment}
                  id={comment.ID}
                  style={{
                    backgroundColor: "Transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#4b6d70",
                  }}
                >
                  delete
                </button>
              </Comment.Author>
              <Comment.Metadata></Comment.Metadata>
              <Comment.Text>{comment.Content}</Comment.Text>
            </Comment.Content>
          </Comment>
        </div>
      ))}

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
