import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { orange } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import ForumIcon from "@material-ui/icons/Forum";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import { UserContext } from "../../contexts/UserContext";
import Comments from "./Comments";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    width: "100%",
    backgroundColor: "#dcedc7",
  },
  avatar: {
    backgroundColor: orange[500],
  },
}));

export default function ForumPost({ p, setPosts, setClickedPost }) {
  const { user, isLoggedIn } = useContext(UserContext);
  const classes = useStyles();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newContents, setNewContents] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (user && p.LikedBy.includes(user.displayName)) {
      setIsFavorited(true);
    }
  }, [user]);

  useEffect(() => {
    setNewContents(p.Content);
  }, [p]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => {
    setNewContents(e.target.value);
  };

  /**
   * handles deleting a post on the forum by using DELETE request
   * @param {*} e event
   */
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

  /**
   * set isEditing state to the opposite of its previous state in order to indicate whether user is editing or not
   * @param {*} e event
   */
  const handleEditPost = (e) => {
    setIsEditing((prev) => {
      return !prev;
    });
    console.log(p.Content);
  };

  /**
   * Saves changes made to a post
   * @param {*} e event
   */
  const handleSaveChanges = (e) => {
    const updatedPost = {
      title: p.Title,
      type: "Content",
      val: newContents,
    };
    fetch(`http://localhost:8080/forum/update/${p.Title}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    }).then(() => {
      setIsEditing(false);
      setClickedPost((prev) => {
        return !prev;
      });
    });
  };

  /**
   * calls updateLikes()
   * @param {*} e event
   */
  const handleLike = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      updateLikes();
      setIsFavorited((prev) => {
        return !prev;
      });
    }
  };

  /**
   * updates the total number of likes on a post depending on whether user clicks or unclicks the heart icon
   */
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
        const updatedPost = {
          title: p.Title,
          type: "LikedBy",
          val: p.LikedBy.filter((u) => u !== user.displayName),
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
        const updatedPost = {
          title: p.Title,
          type: "LikedBy",
          val: [...p.LikedBy, user.displayName],
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
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",

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
            isLoggedIn ? (
              <>
                {user.displayName === p.User ? (
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
                )}
              </>
            ) : (
              <></>
            )
          }
          title={p.Title}
          subheader={`${p.User} posted on ${p.Date} | Tags: ${p.Tags.join(
            ", "
          )}`}
        />
        <CardContent style={{display: "flex", flexDirection: "column"}}>
          {isEditing ? (
            <>
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
              <IconButton
                size="small"
                aria-label="save"
                onClick={handleSaveChanges}

                // style={{ marginLeft: "80%", marginTop: "1vh" }}
              >
                <CheckCircleIcon />
                Save Changes
              </IconButton>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary" component="p">
              {p.Content}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="like" id="like-1" onClick={handleLike}>
            <FavoriteIcon style={isFavorited ? { fill: "#a30000" } : {}} />
          </IconButton>
          {p.Likes}
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="comment"
          >
            <ForumIcon />
          </IconButton>
          {p.Comments.length}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              paragraph
              style={{
                borderTop: "solid",
                borderColor: "#7d9da1",
                paddingTop: "2%",
              }}
            >
              Comments:
            </Typography>
            <Comments p={p} setClickedPost={setClickedPost} />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
