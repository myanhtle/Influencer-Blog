import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import { title } from "process";
function DataForm() {
  const [open, setOpen] = React.useState(false);
  const [openU, setOpenU] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [typeList, setTypeList] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [forum, setForum] = useState([]);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState([]);
  const [user, setUser] = useState("John");
  const [likes, setLikes] = useState(0);
  const [deleteVal, setDeleteVal] = useState([]);
  const [update, setUpdate] = useState([]);
  const [updateType, setUpdateType] = useState([]);
  const [updateVal, setUpdateVal] = useState([]);
  const darkBlue = "#004981";
  const lightBlue = "#6ea8d4";
  const baseButtonStyle = {
    backgroundColor: darkBlue,
    borderWidth: "0px",
    fontWeight: "bold",
    color: "white",
  };
  const selectButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: selectMode ? lightBlue : darkBlue,
  };

  const InputStyle = {
    backgroundColor: "#E5E5E5",
    borderRadius: "10px",
    padding: "5px",
  };
  const handleClickOpen = () => {
    if (forum.length === 0) {
      fetchForum();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchForum();
  };

  const handleChangeDelete = (e) => {
    setDeleteVal(e.currentTarget.value);
  };
  const handleChangeUpdate = (e) => {
    setUpdate(e.currentTarget.value);
  };
  const handleChangeType = (e) => {
    setUpdateType(e.currentTarget.value);
  };
  const handleChangeVal = (e) => {
    setUpdateVal(e.currentTarget.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.currentTarget.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };
  const fetchForum = () => {
    fetch(`http://localhost:8080/forum/read`)
      .then((res) => res.json())
      .then((data) => setForum(data));
    console.log(forum);
  };

  const createPost = (title, content, likes, user) => {
    var val = {
      Title: title,
      Content: content,
      Likes: likes,
      User: user,
    };

    var data = JSON.stringify(val);
    fetch(`http://localhost:8080/forum/add`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  const deletePost = (e) => {
    var id = deleteVal;

    // e.prforumDefault();
    for (var i = 0; i < forum.length; i++) {
      if (
        typeof forum[i].postDetails != "undefined" &&
        forum[i].postDetails === deleteVal
      ) {
        id = forum[i].id;
      }
    }

    // console.log(id);
    fetch(`http://localhost:8080/forum/delete/${deleteVal}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
      body: JSON.stringify({ title: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setDeleteVal("");
  };
  const updateforum = (e) => {
    var id = "";
    // e.prforumDefault();
    for (var i = 0; i < forum.length; i++) {
      if (typeof forum[i].items != "undefined" && forum[i].title === "") {
        id = forum[i].id;
      }
    }

    fetch(`http://localhost:8080/forum/update/${update}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: update,
        type: updateType,
        val: updateVal,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setUpdate("");
    setUpdateType("");
    setUpdateVal("");
  };

  return (
    <div>
      <Button onClick={() => fetchForum()}>Click me</Button>
      <Button style={baseButtonStyle} onClick={handleClickOpen}>
        Display Forum
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <Input
            style={InputStyle}
            start="Title"
            placeholder="Enter the title"
            value={title}
            onChange={handleChangeTitle}
          />
          <Input
            style={InputStyle}
            name="Write what you want!"
            placeholder="Write your post here!"
            value={content}
            onChange={handleChangeContent}
          />
          <Button
            style={baseButtonStyle}
            onClick={() => createPost(content, title, likes, user)}
          >
            Post
          </Button>
        </form>
      </Dialog>
      <Button style={baseButtonStyle} onClick={handleClickOpen}>
        Update Class
      </Button>
      <Dialog
        open={openU}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          ID:
          <Select style={selectButtonStyle} onChange={handleChangeUpdate}>
            {forum.map((id) => {
              return <option value={id}> {id} </option>;
            })}
          </Select>
          Type:
          <Select style={selectButtonStyle} onChange={handleChangeType}>
            {typeList.map((type) => {
              return <option value={type}> {type} </option>;
            })}
          </Select>
          <Input
            style={InputStyle}
            name="newVal"
            placeholder="What should it be set to?"
            value={updateVal}
            onChange={handleChangeVal}
          />
          <Button style={baseButtonStyle} onClick={() => updateforum()}>
            Update Class
          </Button>
        </form>
      </Dialog>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button style={baseButtonStyle} onClick={handleClickOpen}>
        Delete Class
      </Button>
      <Dialog
        open={openD}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          ID:
          <Select style={selectButtonStyle} onChange={handleChangeDelete}>
            {forum.map((id) => {
              return <option value={id}> {id} </option>;
            })}
          </Select>
        </form>
      </Dialog>
      <form>
        Posts:
        {forum.map((c) => (
          <p>{c.postDetails}</p>
        ))}
      </form>
    </div>
  );
}

export default DataForm;
