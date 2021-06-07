import React, { useState } from "react";
import ForumPost from "./ForumPost";
import CreateForumPost from "./CreateForumPost";

export default function Forum() {
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <CreateForumPost />
      <ForumPost />
    </div>
  );
}
