import React, { useEffect, useState, useContext } from "react";
import ForumPost from "./ForumPost";
import ForumModal from "./ForumModal";
import Filter from "./Filter";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
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

export default function Forum() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [clickedPost, setClickedPost] = useState(false);
  const [update, setUpdate] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/forum/read")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .then(console.log(posts));
  }, [clickedPost, update]);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Tooltip title="Create New Post" aria-label="add" onClick={handleOpen}>
          <Fab color="secondary" className={classes.absolute}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
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
            <ForumModal
              setClickedPost={setClickedPost}
              setUpdate={setUpdate}
              setPosts={setPosts}
            />
          </div>
        </Fade>
      </Modal>
      <Filter />
      {posts.map((p) => (
        <ForumPost
          p={p}
          posts={posts}
          setPosts={setPosts}
          setClickedPost={setClickedPost}
          clickedPost={clickedPost}
        />
      ))}
    </div>
  );
}
