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
  //     title: "Icecream for Breakfast",
  //     date: "2021-06-08",
  //     likes: 0,
  //     messageContent:
  //       "Couldn't resist my sugar tooth this morning. I had chocolate icecream for breakfast",
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

  // function handleClickFour() {
  //   const updatedLikes = {
  //     id: "rlhVQQNxYIwozARZlCJT",
  //     currentLikeCount: 2,
  //   };

  //   fetch("http://localhost:8080/blog/like", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedLikes),
  //   });
  // }

  //  function handleClickFive() {
  //   const updatedLikes = {
  //     id: "rlhVQQNxYIwozARZlCJT",
  //     currentLikeCount: 2,
  //   };

  //   fetch("http://localhost:8080/blog/like", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedLikes),
  //   });
  // }

  // function handleClickSix() {
  //   const commentData = {
  //     postId: "blzjoGWPieVheGZkC0tv",
  //     userId: "me123",
  //     likes: 0,
  //     content: "Vanilla is the way to go.",
  //   };

  //   fetch("http://localhost:8080/blog/add/comment", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(commentData),
  //   });
  // }

  // function handleClickSeven() {
  //   const commentData = {
  //     postId: "blzjoGWPieVheGZkC0tv",
  //     commentId: "vP7jlP0PIsQHdyTypE0r",
  //   };

  //   fetch("http://localhost:8080/blog/delete/comment", {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(commentData),
  //   });
  // }

  const id = "iuXi5QCzLWINkCGz11zl";
  const url = new URL("http://localhost:8080/blog/read/comment");
  url.searchParams.append("postId", id);

  function handleClickSeven() {
    fetch(url).then((res) => res.json());
  }

  return <Button onClick={() => handleClickSeven()}>Hello</Button>;
}

export default TestBlog;
