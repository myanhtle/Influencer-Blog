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
  const [sortBy, setSortBy] = useState({ new: true, hot: false });
  const [filterTags, setFilterTags] = useState({
    outdoors: false,
    food: false,
    travel: false,
    lifestyle: false,
  });

  /**
   *
   * @param {array} data
   * @returns a new array of posts that have tags according to the filters (outdoors, food, etc) set by the user
   */
  const filterByTag = (data) => {
    const filteredData = [];
    data.forEach((post) => {
      if (filterTags.outdoors) {
        post.Tags.includes("outdoors") && !filteredData.includes(post)
          ? filteredData.push(post)
          : console.log("no outdoors");
      }
      if (filterTags.food) {
        post.Tags.includes("food") && !filteredData.includes(post)
          ? filteredData.push(post)
          : console.log("no food");
      }
      if (filterTags.travel) {
        post.Tags.includes("travel") && !filteredData.includes(post)
          ? filteredData.push(post)
          : console.log("no travel");
      }
      if (filterTags.lifestyle) {
        post.Tags.includes("lifestyle") && !filteredData.includes(post)
          ? filteredData.push(post)
          : console.log("no lifestyle");
      }
    });
    return filteredData.length === 0 ? data : filteredData;
  };

  useEffect(() => {
    fetch("http://localhost:8080/forum/read")
      .then((res) => res.json())
      .then((data) => {
        const d = filterByTag(data);
        console.log(d);
        if (sortBy.new) {
          d.sort(function (a, b) {
            return new Date(b.Date) - new Date(a.Date);
          });
        } else {
          d.sort(function (a, b) {
            return b.Likes - a.Likes;
          });
        }
        setPosts(d);
      })
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
              setOpen={setOpen}
            />
          </div>
        </Fade>
      </Modal>
      <Filter
        posts={posts}
        setPosts={setPosts}
        setClickedPost={setClickedPost}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterTags={filterTags}
        setFilterTags={setFilterTags}
      />
      {posts.map((p) => (
        <ForumPost
          key={p.Title}
          p={p}
          setPosts={setPosts}
          setClickedPost={setClickedPost}
          clickedPost={clickedPost}
        />
      ))}
    </div>
  );
}
