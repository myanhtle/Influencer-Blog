import React, { useState, useEffect } from "react";
import "./Blog.css";
import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
} from "@material-ui/core";
import CreateButton from "./CreateButton";

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
    <div className="blogBody">
      <div className="leftcolumn">
        <br></br>

        <CreateButton
          handleChange={handleChange}
          handleClick={handleClick}
          setClicked={setClicked}
        />

        {blog.map((b) => (
          <Card className="card">
            {b.image && (
              <div>
                <img className="img" src={b.image}></img>
                <br></br>
              </div>
            )}
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
                      setTitle(b.title);
                      setBody(b.messageContent);
                      setEditID(b.id);
                      handleEditOpen();
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Edit
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
                          Confirm
                        </Button>
                      </div>
                    </Fade>
                  </Modal>

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

              <Typography variant="body2">{b.messageContent}</Typography>
            </CardContent>
          </Card>
        ))}
        <br></br>
      </div>
    </div>
  );
}
