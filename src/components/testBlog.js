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

  // function handleClick() {
  //   const postData = {
  //     date: "2021-06-07",
  //     likes: 0,
  //     messageContent: "Official blog is under construction!",
  //   };

  //   fetch("http://localhost:8080/blog/add", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(postData),
  //   });
  // }

  // function handleClickTwo() {
  //   const postId = {
  //     id: "LijDaywEwDlFpWAJCIHU",
  //   };

  //   fetch("http://localhost:8080/blog/delete", {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(postId),
  //   });
  // }

  // function handleClickThree() {
  //   const updatedPost = {
  //     date: "2021-06-14",
  //     messageContent:
  //       "Official blog under construction, woohoo! Tune in for the finished product.",
  //     id: "rlhVQQNxYIwozARZlCJT",
  //   };
  //   if (updatedPost)
  //     fetch("http://localhost:8080/blog/update", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedPost),
  //     });
  // }

  function handleClickFour() {
    const updatedLikes = {
      id: "rlhVQQNxYIwozARZlCJT",
      currentLikeCount: 2,
    };

    fetch("http://localhost:8080/blog/like", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLikes),
    });
  }

  return <Button onClick={() => handleClickFour()}>Hello</Button>;
}

export default TestBlog;
