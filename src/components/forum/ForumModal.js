import React, { useState } from "react";
import CreateForumPost from "./CreateForumPost";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Tags({ setClickedPost, setUpdate, setPosts, setOpen }) {
  const classes = useStyles();
  const [postTags, setPostTags] = useState([]);

  const handleChange = (val) => {
    console.log(val);
    const temp = val.map((tag) => tag.tagTitle);
    setPostTags(temp);
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2%",
        }}
      >
        <Autocomplete
          multiple
          disableCloseOnSelect
          id="tags-standard"
          onChange={(e, val) => handleChange(val)}
          options={tags}
          getOptionLabel={(option) => option.tagTitle}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tags"
              placeholder="Tags"
            />
          )}
        />
      </div>

      <CreateForumPost
        postTags={postTags}
        setClickedPost={setClickedPost}
        setUpdate={setUpdate}
        setPosts={setPosts}
        setOpen={setOpen}
      />
    </div>
  );
}
const tags = [
  { tagTitle: "outdoors" },
  { tagTitle: "food" },
  { tagTitle: "travel" },
  { tagTitle: "lifestyle" },
];
