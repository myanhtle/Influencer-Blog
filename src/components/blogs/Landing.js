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
import { UserContext } from "../../contexts/UserContext";

//recent posts
//filters
//search bar
//links to different blogs (done)

//have featured blogs on landing page
//sidebar with all blogs, links

export default function Landing() {
  const [blog, setBlog] = useState(null);

  const { isAdmin } = useContext(UserContext);

  const [search, setSearch] = useState(null);
  const [sort, setSort] = useState("descendingDate");

  const filterSortBlogs = (data, search, sort) => {
    if (search) {
      let data2 = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(search.toLowerCase())) {
          data2.push(data[i]);
        }
      }
      data = data2;
    }

    if (sort === "descendingDate") {
      data.sort((a, b) => {
        let da = a.date; //to order posts so
        let db = b.date; //recent ones are first
        if (da < db) return 1;
        if (da > db) return -1;
        return 0;
      });
    } else if (sort === "ascendingDate") {
      data.sort((a, b) => {
        let da = a.date; //to order posts so
        let db = b.date; //older ones are first
        if (da < db) return -1;
        if (da > db) return 1;
        return 0;
      });
    }
    return data;
  };

  const fetchBlogs = () => {
    fetch(`http://localhost:8080/blog/read`)
      .then((res) => res.json())
      .then((data) => {
        data = filterSortBlogs(data, search, sort);
        setBlog(data);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      style={{ textAlign: "center", marginBottom: "1rem", minHeight: "50vh" }}
    >
      <h1>Welcome to my Blog</h1>
      {isAdmin && (
        <>
          <CreateNewButton />
          <p>or</p>
        </>
      )}
      <TextField
        onChange={handleChange}
        value={search}
        size="small"
        label="Search"
      />
      <Button
        onClick={fetchBlogs}
        color="primary"
        variant="contained"
        style={{ marginLeft: "1rem" }}
      >
        <SearchIcon /> Search
      </Button>

      <br></br>
      {blog && (
        <div>
          <h3>Sort results by:</h3>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSort("descendingDate");
              console.log(sort);
              fetchBlogs();
            }}
            color="primary"
            variant="contained"
          >
            New
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSort("ascendingDate");
              console.log(sort);
              fetchBlogs();
            }}
            color="primary"
            variant="contained"
          >
            Old
          </Button>
          <br></br>
          <br></br>
          <div>
            <List style={{ marginLeft: "20%", marginRight: "20%" }}>
              {blog.map((b) => (
                <div>
                  <ListItem key={b.id} style={{ outline: "2px solid black" }}>
                    <ListItemText primary={b.title} secondary={b.date} />
                    <Link to={`/blog/${b.id}`}>View</Link>
                  </ListItem>
                  <br></br>
                </div>
              ))}
            </List>
          </div>
        </div>
      )}
      {blog === null && (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      )}
    </div>
  );
}
