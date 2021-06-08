import React from "react";
import "./Blog.css";
import { Card, CardContent, Link, Typography } from "@material-ui/core";

export default function Blog() {
  return (
    <div className="blogBody">
      <div className="leftcolumn">
        <Card className="card">
          <CardContent>
            <Typography variant="h6">Title Heading</Typography>
            <Typography variant="subtitle2">Title Description, Date</Typography>
            <br></br>
            <div className="fakeimg" style={{ height: "200px" }}>
              Image
            </div>
            <br></br>
            <Typography variant="body2">Body</Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent>
            <Typography variant="h6">Title Heading</Typography>
            <Typography variant="subtitle2">Title Description, Date</Typography>
            <br></br>
            <div className="fakeimg" style={{ height: "200px" }}>
              Image
            </div>
            <br></br>
            <Typography variant="body2">Body</Typography>
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
}
