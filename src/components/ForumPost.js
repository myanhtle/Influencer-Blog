import React, { useState } from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    width: "100%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ForumPost() {
  const classes = useStyles();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    setIsFavorited((prev) => {
      return !prev;
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="user" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Title"
          subheader="June 7, 2021"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Text for the post goes here
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="like" id="like-1" onClick={handleLike}>
            <FavoriteIcon
              style={isFavorited ? { fill: "gray" } : { fill: "red" }}
            />
          </IconButton>
          # of likes
          <IconButton aria-label="comment">
            <ForumIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
