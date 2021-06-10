import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import CreateNewButton from "./CreateButton";

//recent posts
//filters
//search bar
//links to different blogs (done)

export default function Landing() {
  const [blog, setBlog] = useState([]);

  const fetchBlogs = () => {
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
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to my Blog</h1>
      <TextField label="Search" />
      <h3>Sort by:</h3>
      <Button onClick={fetchBlogs} color="primary" variant="contained">
        Search
      </Button>
      <CreateNewButton />
      <div>
        <List style={{ marginLeft: "20%", marginRight: "20%" }}>
          {blog.map((b) => (
            <ListItem style={{ outline: "2px solid black" }}>
              <ListItemText primary={b.title} secondary={b.date} />
              <Link to={`/blog/${b.id}`}>View</Link>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
