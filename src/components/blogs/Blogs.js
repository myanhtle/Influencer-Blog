import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Fade,
  TextField,
  Backdrop,
  makeStyles,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import "./Blog.css";

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

export default function Blogs({ match }) {
  const [blog, setBlog] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [editID, setEditID] = useState(null);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);

  /* Modal */
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
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
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === match.params.id) {
            setBlog(data[i]);
            break;
          }
        }
      });
    setClicked(false);
  }, [clicked]);

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
      title: title,
      messageContent: body,
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
    blog && (
      <div className="leftcolumn">
        <Card className="card">
          {blog.image && (
            <div>
              <img className="img" src={blog.image}></img>
              <br></br>
            </div>
          )}
          <CardContent>
            <Typography variant="h6">
              {blog.title}
              <div
                style={{
                  float: "right",
                  marginLeft: "auto",
                  marginRight: "0",
                }}
              >
                <Button
                  onClick={() => {
                    setTitle(blog.title);
                    setBody(blog.messageContent);
                    setEditID(blog.id);
                    handleEditOpen();
                  }}
                  variant="contained"
                  color="secondary"
                >
                  <CreateIcon />
                </Button>

                <Modal
                  className={classes.modal}
                  open={editOpen}
                  onClose={handleEditClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={editOpen}>
                    <div className={classes.paper}>
                      <h2>Edit Post</h2>
                      <p>Edit the following fields to edit this blog post:</p>
                      <TextField
                        required
                        helperText="Title"
                        defaultValue={title}
                        onChange={(e) => {
                          handleChange(e, "title");
                        }}
                      ></TextField>
                      <br></br>
                      <TextField
                        required
                        multiline
                        helperText="Body"
                        defaultValue={body}
                        onChange={(e) => {
                          handleChange(e, "body");
                        }}
                      ></TextField>
                      <br></br>
                      <br></br>
                      <Button
                        onClick={() => {
                          handleClickThree(editID);
                          setClicked(true);
                          handleEditClose();
                        }}
                        variant="contained"
                        color="primary"
                      >
                        <CheckIcon />
                      </Button>
                    </div>
                  </Fade>
                </Modal>

                <Button
                  onClick={() => {
                    handleClickTwo(blog.id);
                    setClicked(true);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  <DeleteIcon />
                </Button>
              </div>
            </Typography>
            <Typography variant="subtitle2">{blog.date}</Typography>
            <br></br>

            <Typography variant="body2">{blog.messageContent}</Typography>
          </CardContent>
        </Card>
      </div>
    )
  );
}
