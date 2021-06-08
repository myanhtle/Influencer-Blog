import React, { useEffect, useState, useContext } from "react";
import ForumPost from "./ForumPost";
import CreateForumPost from "./CreateForumPost";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [clickedPost, setClickedPost] = useState(false);
  const [update, setUpdate] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/forum/read")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .then(console.log(posts));
  }, [clickedPost, update]);

  return (
    <div>
      <CreateForumPost
        setClickedPost={setClickedPost}
        setUpdate={setUpdate}
        setPosts={setPosts}
      />
      {posts.map((p) => (
        <ForumPost
          p={p}
          posts={posts}
          setPosts={setPosts}
          setClickedPost={setClickedPost}
          clickedPost={clickedPost}
        />
      ))}
    </div>
  );
}
