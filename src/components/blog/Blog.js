import React, { useState, useEffect } from "react";
import "./Blog.css";
import { Button, Card, CardContent, Link, Typography } from "@material-ui/core";

export default function Blog() {
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

  function handleClick() {
    const postData = {
      title: "Icecream for Breakfast",
      date: "2021-06-08",
      likes: 0,
      messageContent:
        "Couldn't resist my sugar tooth this morning. I had chocolate icecream for breakfast",
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

  function handleClickTwo(id) {
    const postId = {
      id,
    };
    fetch("http://localhost:8080/blog/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postId),
    });
  }

  return (
    <div>
      <div className="leftcolumn">
        <br></br>
        <div
          style={{ marginLeft: "35%", marginRight: "35%", textAlign: "center" }}
        >
          <Button
            onClick={() => {
              handleClick();
              setClicked(true);
            }}
            variant="contained"
            color="primary"
          >
            Create New Post
          </Button>
        </div>
        {blog.map((b) => (
          <Card className="card">
            <CardContent>
              <Typography variant="h6">
                {b.title}
                <div
                  style={{
                    float: "right",
                    marginLeft: "auto",
                    marginRight: "0",
                  }}
                >
                  <Button variant="contained" color="secondary">
                    edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleClickTwo(b.id);
                      setClicked(true);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    delete
                  </Button>
                </div>
              </Typography>
              <Typography variant="subtitle2">{b.date}</Typography>
              <br></br>
              {b.image && (
                <div>
                  <div className="img" style={{ height: "200px" }}>
                    Image
                  </div>
                  <br></br>
                </div>
              )}
              <Typography variant="body2">{b.messageContent}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rightcolumn">
        <Card className="card">
          <CardContent>
            <Typography variant="h6">Table of Contents:</Typography>
            <ul>
              <li>
                <Link>Post 1</Link>
              </li>
              <li>
                <Link>Post 2</Link>
              </li>
              <li>
                <Link>Post 3</Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <br></br>
      </div>
    </div>
  );
}
