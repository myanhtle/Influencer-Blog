import React, { useEffect, useState, useContext } from "react";
import ForumPost from "./ForumPost";
import CreateForumPost from "./CreateForumPost";

export default function Forum() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/forum/read")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .then(console.log(posts));
  }, []);

  return (
    <div>
      <CreateForumPost />
      {posts.map((p) => (
        <ForumPost p={p} posts={posts} setPosts={setPosts} />
      ))}
    </div>
  );
}
