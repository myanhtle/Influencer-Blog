import React, { useState, useEffect } from "react";
import "./Blog.css";
import {
  Button,
  Card,
  CardContent,
  Link,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
} from "@material-ui/core";

/* Modal */
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
/* Modal */

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);

  /* Modal */
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  /* Modal */

  const handleChange = (e, type) => {
    if (type === "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/blog/read`)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => {
          let da = a.date; //to order posts so
          let db = b.date; //recent ones are first
          if (da < db) return 1;
          if (da > db) return -1;
          return 0;
        });
        console.log(data);
        setBlog(data);
      });
    setClicked(false);
  }, [clicked]);

  function handleClick() {
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;
    const postData = {
      title: title,
      date,
      likes: 0,
      messageContent: body,
    };
    fetch("http://localhost:8080/blog/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    setClicked(true);
  }

  function handleClickTwo(id) {
    const postId = {
      id,
    };
    fetch("http://localhost:8080/blog/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postId),
    });
  }

  function handleClickThree(id) {
    const updatedPost = {
      title: "Updated title...",
      messageContent: "Updated body...",
      id,
    };
    if (updatedPost)
      fetch("http://localhost:8080/blog/update", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
  }

  return (
    <div className="blogBody">
      <div className="leftcolumn">
        <br></br>
        <div
          style={{ marginLeft: "35%", marginRight: "35%", textAlign: "center" }}
        >
          <Button
            onClick={() => {
              handleOpen();
            }}
            variant="contained"
            color="primary"
          >
            Create New Post
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Create New Post</h2>
                <p id="transition-modal-description">
                  Fill out the following fields to create a new blog post:
                </p>
                <TextField
                  required
                  label="Title"
                  onChange={(e) => {
                    handleChange(e, "title");
                  }}
                ></TextField>
                <TextField
                  required
                  label="Body"
                  onChange={(e) => {
                    handleChange(e, "body");
                  }}
                ></TextField>
                <Button
                  onClick={() => {
                    handleClick();
                    setClicked(true);
                    handleClose();
                  }}
                  variant="contained"
                  color="primary"
                >
                  Confirm
                </Button>
              </div>
            </Fade>
          </Modal>
        </div>
        {blog.map((b) => (
          <Card className="card">
            <CardContent>
              <Typography variant="h6">
                {b.title}
                <div
                  style={{
                    float: "right",
                    marginLeft: "auto",
                    marginRight: "0",
                  }}
                >
                  <Button
                    onClick={() => {
                      handleClickThree(b.id);
                      setClicked(true);
                      handleClose();
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleClickTwo(b.id);
                      setClicked(true);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </div>
              </Typography>
              <Typography variant="subtitle2">{b.date}</Typography>
              <br></br>
              {b.image && (
                <div>
                  <div className="img" style={{ height: "200px" }}>
                    Image
                  </div>
                  <br></br>
                </div>
              )}
              <Typography variant="body2">{b.messageContent}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rightcolumn">
        <Card className="card">
          <CardContent>
            <Typography variant="h6">Table of Contents:</Typography>
            <ul>
              <li>
                <Link>Post 1</Link>
              </li>
              <li>
                <Link>Post 2</Link>
              </li>
              <li>
                <Link>Post 3</Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <br></br>
      </div>
    </div>
  );
}
