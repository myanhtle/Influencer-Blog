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
import ForumIcon from "@material-ui/icons/Forum";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Collapse from "@material-ui/core/Collapse";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function ForumPost({ p, posts, setPosts }) {
  const { username } = useContext(UserContext);
  const classes = useStyles();
  const [isFavorited, setIsFavorited] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => console.log("delete")}>
                    Delete
                  </MenuItem>
                  <MenuItem onClick={() => console.log("edit")}>Edit</MenuItem>
                </Menu>
              </>
            ) : (
              <></>
            )
          }
          title={p.Title}
          subheader={`${p.User} posted on ${p.Date}`}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {p.Content}
          </Typography>
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
