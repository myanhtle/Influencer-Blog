import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import { UserContext } from "../../contexts/UserContext";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    width: "100%",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ForumPost({ p, posts, setPosts, setClickedPost }) {
  const { username } = useContext(UserContext);
  const classes = useStyles();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContents, setNewContents] = useState(p.Content);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => {
    setNewContents(e.target.value);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/forum/delete/${p.Title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
      body: JSON.stringify({ title: p.Title }),
    }).then(() => {
      setClickedPost((prev) => {
        return !prev;
      });
    });
  };

  const handleEditPost = (e) => {
    setIsEditing((prev) => {
      return !prev;
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    updateLikes();
    setIsFavorited((prev) => {
      return !prev;
    });
  };

  const updateLikes = () => {
    if (isFavorited) {
      const updatedPost = {
        title: p.Title,
        type: "Likes",
        val: p.Likes - 1,
      };
      fetch(`http://localhost:8080/forum/update/${p.Title}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }).then(() => {
        fetch("http://localhost:8080/forum/read")
          .then((res) => res.json())
          .then((data) => setPosts(data))
          .then(console.log(posts));
      });
    } else {
      const updatedPost = {
        title: p.Title,
        type: "Likes",
        val: p.Likes + 1,
      };
      fetch(`http://localhost:8080/forum/update/${p.Title}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }).then(() => {
        fetch("http://localhost:8080/forum/read")
          .then((res) => res.json())
          .then((data) => setPosts(data))
          .then(console.log(posts));
      });
    }
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
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="user" className={classes.avatar}>
              {p.User[0]}
            </Avatar>
          }
          action={
            username === p.User ? (
              <>
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={handleDeletePost}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="edit"
                  onClick={handleEditPost}
                >
                  <EditIcon />
                </IconButton>
              </>
            ) : (
              <></>
            )
          }
          title={p.Title}
          subheader={`${p.User} posted on ${p.Date}`}
        />
        <CardContent>
          {isEditing ? (
            <TextField
              required
              id="Content"
              value={newContents}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              style={{ width: "100%" }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary" component="p">
              {p.Content}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="like" id="like-1" onClick={handleLike}>
            <FavoriteIcon
              style={isFavorited ? { fill: "red" } : { fill: "grey" }}
            />
          </IconButton>
          {p.Likes}
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="comment"
          >
            <ForumIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              paragraph
              style={{
                borderTop: "solid",
                borderColor: "#d3d3d3",
                paddingTop: "2%",
              }}
            >
              Comments:
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
