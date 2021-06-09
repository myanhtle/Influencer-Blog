import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import { TextField } from "@material-ui/core";

//recent posts
//filters
//search bar
//links to different blogs

export default function Landing() {
  const [blog, setBlog] = useState([]);
  const [clicked, setClicked] = useState(false);
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

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to my Blog</h1>
      <TextField label="Search" />
      <h3>Sort by:</h3>
    </div>
  );
}
