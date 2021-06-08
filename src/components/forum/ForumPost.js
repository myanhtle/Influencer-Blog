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
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    width: "100%",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ForumPost({ p }) {
  const classes = useStyles();
  const [isFavorited, setIsFavorited] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsFavorited((prev) => {
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
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="user" className={classes.avatar}>
              {p.User[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={p.Title}
          subheader="June 7, 2021"
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
