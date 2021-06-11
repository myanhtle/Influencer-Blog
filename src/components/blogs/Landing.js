import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CreateNewButton from "./CreateButton";
import StarIcon from "@material-ui/icons/Star";
import { UserContext } from "../../contexts/UserContext";
import theme from "../../configs/theme"
import { makeStyles } from "@material-ui/core/styles";

const landingPageStyles = makeStyles({
  featuredPostsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "1rem",
  },
  postContainer: {
    maxWidth: "40vw",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      minWidth: "90vw"
    },
    flexBasis: "50%",
  }
})

//recent posts
//filters
//search bar
//links to different blogs (done)

//have featured blogs on landing page
//sidebar with all blogs, links

export default function Landing() {
  const styles = landingPageStyles();
  const [blog, setBlog] = useState(null);

  const { isAdmin } = useContext(UserContext);

  const [search, setSearch] = useState(null);

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
        if (a.date < b.date) return 1; //to order posts so
        if (a.date > b.date) return -1; //recent ones are first
        return 0;
      });
    } else if (sort === "ascendingDate") {
      data.sort((a, b) => {
        if (a.date < b.date) return -1; //to order posts so
        if (a.date > b.date) return 1; //older ones are first
        return 0;
      });
    } else if (sort === "featured") {
      data.sort((a, b) => {
        if (a.featured === true && b.featured === false) return -1;
        if (b.featured === true && a.featured === false) return 1;
        return 0;
      });
    }
    return data;
  };

  const fetchBlogs = (sort) => {
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

  const [featured, setFeatured] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:8080/blog/read`)
      .then((res) => res.json())
      .then((data) => {
        let data2 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].featured) {
            data2.push(data[i]);
          }
        }
        setFeatured(data2);
      });
  }, []);

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
            onClick={() => {
              fetchBlogs("descendingDate");
            }}
            color="primary"
            variant="contained"
            style={{ marginRight: "5%" }}
          >
            New
          </Button>
          <Button
            onClick={() => {
              fetchBlogs("ascendingDate");
            }}
            color="primary"
            variant="contained"
            style={{ marginRight: "5%" }}
          >
            Old
          </Button>
          <Button
            onClick={() => {
              fetchBlogs("featured");
            }}
            color="primary"
            variant="contained"
          >
            Featured
          </Button>
          <br></br>
          <br></br>
          <div>
            <List style={{ marginLeft: "20%", marginRight: "20%" }}>
              {blog.map((b) => (
                <div>
                  <ListItem
                    key={b.id}
                    style={{
                      outline: "2px solid black",
                    }}
                  >
                    {b.featured ? <StarIcon /> : null}
                    <ListItemText
                      style={{}}
                      primary={b.title}
                      secondary={b.date}
                    >
                      <StarIcon />
                    </ListItemText>
                    <Button variant="contained" color="secondary">
                      <Link style={{ color: "white" }} to={`/blog/${b.id}`}>
                        View
                      </Link>
                    </Button>
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
          <h2>Featured Posts</h2>
          <div className={styles.featuredPostsContainer}>
            {featured &&
              featured.map((f) => (
                <div className={styles.postContainer}>
                  <Card className="card">
                    {f.image && (
                      <div>
                        <img
                          className="img"
                          src={f.image}
                          style={{ maxHeight: "10rem" }}
                        ></img>
                        <br></br>
                      </div>
                    )}
                    <CardContent>
                      <Typography variant="h6">{f.title}</Typography>
                      <Typography variant="subtitle2">{f.date}</Typography>
                      <br></br>
                      <Typography variant="body2">
                        {f.messageContent}
                      </Typography>
                      <br></br>
                      <Button
                        href={`/blog/${f.id}`}
                        variant="contained"
                        color="secondary"
                        style={{ color: "white" }}
                      >
                        View Post
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
          </div>
          <br></br>
        </div>
      )}
    </div>
  );
}
