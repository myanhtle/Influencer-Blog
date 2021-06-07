import React from "react";
import "./Blog.css";

export default function Blog() {
  return (
    <div>
      <div className="header">
        <h2>Blog Name</h2>
      </div>

      <div className="leftcolumn">
        <div className="card">
          <h2>TITLE HEADING</h2>
          <h5>Title description, Dec 7, 2017</h5>
          <div className="fakeimg" style={{ height: "200px" }}>
            Image
          </div>
          <p>Some text..</p>
        </div>
        <div className="card">
          <h2>TITLE HEADING</h2>
          <h5>Title description, Sep 2, 2017</h5>
          <div className="fakeimg" style={{ height: "200px" }}>
            Image
          </div>
          <p>Some text..</p>
        </div>
      </div>
      <div className="rightcolumn">
        <div className="card">
          <h3>Popular Post</h3>
          <div className="fakeimg">Image</div>
          <br></br>
          <div className="fakeimg">Image</div>
          <br></br>
          <div className="fakeimg">Image</div>
        </div>
        <div className="card">
          <h3>Follow Me</h3>
          <p>Some text..</p>
        </div>
      </div>
      <div className="footer">
        <h2>Footer</h2>
      </div>
    </div>
  );
}
