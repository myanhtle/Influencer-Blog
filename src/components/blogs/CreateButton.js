import React, { useState } from "react";
import {
  Button,
  Backdrop,
  Modal,
  Fade,
  TextField,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "./Blog.css";

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

export default function CreateButton() {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const handleChange = (e, type) => {
    if (type === "title") {
      setTitle(e.target.value);
    } else {
      setBody(e.target.value);
    }
  };
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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginLeft: "35%", marginRight: "35%", textAlign: "center" }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        size="large"
      >
        <AddIcon /> Create New Post
      </Button>
      <Modal
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
          <div className={classes.paper} style={{maxWidth: "40rem", width: "100%"}}>
            <h2>Create New Post</h2>
            <p>Fill out the following fields to create a new blog post:</p>
            <TextField
              required
              fullWidth
              label="Title"
              onChange={(e) => {
                handleChange(e, "title");
              }}
            ></TextField>
            <br></br>
            <TextField
              required
              fullWidth
              multiline
              rowsMax={20}
              label="Body"
              onChange={(e) => {
                handleChange(e, "body");
              }}
            ></TextField>
            <br></br>
            <br></br>
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
  );
}
