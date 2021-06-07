import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "92.8ch",
    },
  },
}));

export default function CreateForumPost() {
  const classes = useStyles();
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="create-post"
          label="Make a new post"
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
          variant="outlined"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained">Post</Button>
        </div>
      </form>
    </div>
  );
}
