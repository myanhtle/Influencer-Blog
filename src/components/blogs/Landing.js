import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CreateNewButton from "./CreateButton";
import {UserContext} from "../../contexts/UserContext"

//recent posts
//filters
//search bar
//links to different blogs (done)

export default function Landing() {
  const [blog, setBlog] = useState(null);
  const [search, setSearch] = useState("");
  const {isAdmin} = useContext(UserContext);

  const sortBlogs = (data, sort) => {
    if (sort === "descendingDate") {
      data.sort((a, b) => {
        let da = a.date; //to order posts so
        let db = b.date; //recent ones are first
        if (da < db) return 1;
        if (da > db) return -1;
        return 0;
      });
    }
  };

  const fetchBlogs = () => {
    fetch(`http://localhost:8080/blog/read`)
      .then((res) => res.json())
      .then((data) => {
        /*
        if (search) {
          let data2 = [];
          for (let i = 0; i < data.length; i++) {
            console.log(search);
            console.log(data[i].title);
            console.log(data[i].title.indexOf(search));
            if (data[i].title.includes(search)) {
              data2.push(data[i]);
            }
          }
          data = data2;
        }
        */
        sortBlogs(data, "descendingDate");
        console.log(data);
        setBlog(data);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "1rem", minHeight: "50vh" }}>
      <h1>Welcome to my Blog</h1>
      {isAdmin && (
        <>
          <CreateNewButton />
          <p>or</p>
        </>
      )}
      <TextField onChange={handleChange} value={search} size="small" label="Search" />
      <Button onClick={fetchBlogs} color="primary" variant="contained" style={{marginLeft: "1rem"}}>
        <SearchIcon /> Search
      </Button>

      {blog && (
        <div>
          <h3>Sort results by:</h3>
          <p>(insert sorting functions here...)</p>
          <div>
            <List style={{ marginLeft: "20%", marginRight: "20%" }}>
              {blog.map((b) => (
                <ListItem style={{ outline: "2px solid black" }} key={b.id}>
                  <ListItemText primary={b.title} secondary={b.date} />
                  <Link to={`/blog/${b.id}`}>View</Link>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      )}
      <br></br>
    </div>
  );
}
