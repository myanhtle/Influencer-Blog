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
  const [blog, setBlog] = useState(null);

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
      <CreateNewButton />
      <p>or</p>
      <TextField label="Search" />
      <Button onClick={fetchBlogs} color="primary" variant="contained">
        Search
      </Button>
      <p>
        (search bar does not work, clicking Search button with return all blog
        results.)
      </p>
      <br></br>
      <br></br>
      {blog && (
        <div>
          <h3>Sort results by:</h3>
          <p>(insert sorting functions here...)</p>
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
      )}
    </div>
  );
}
