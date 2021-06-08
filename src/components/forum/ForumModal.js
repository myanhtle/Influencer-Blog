import React from "react";
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

export default function Tags({ setClickedPost, setUpdate, setPosts }) {
  const classes = useStyles();

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
          id="tags-standard"
          options={tags}
          getOptionLabel={(option) => option.tagTitle}
          defaultValue={[tags[0]]}
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
        setClickedPost={setClickedPost}
        setUpdate={setUpdate}
        setPosts={setPosts}
      />
    </div>
  );
}
const tags = [{ tagTitle: "outdoors" }, { tagTitle: "food" }];
