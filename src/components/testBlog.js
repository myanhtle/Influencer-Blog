import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

function TestBlog() {
  const [blog, setBlog] = useState([]);
  const [clicked, setClicked] = useState(false);

  // useEffect(() => {
  //   fetch(`http://localhost:8080/blog/read`)
  //     .then((res) => res.json())
  //     .then((data) => setBlog(data));
  //   console.log(blog);
  // }, [clicked]);

  function handleClick() {
    const postData = {
      date: "2021-06-07",
      likes: 0,
      messageContent: "Official blog is under construction!",
    };

    fetch("http://localhost:8080/blog/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  }

  return <Button onClick={() => handleClick()}>Hello</Button>;
}

export default TestBlog;
