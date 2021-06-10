import { useState } from "react";
import { Button, makeStyles, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  root: {
    background: "#003c6c", // gradient color l -> r
    borderRadius: 3,
    border: 0,
    color: "#FDC700", // text color
    height: 60,
    width: 346,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    fontSize: "18px",
  },
});

export default function AddMerch() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const image = [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    var merchData = {
      name,
      description,
      price,
      image,
      stock,
    };

    var data = JSON.stringify(merchData);
    fetch(`http://localhost:8080/merchandise/add`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    setOpen(false);
  };

  const imageTextBoxes = ["textbox"];

  const handleAddImage = () => {
    imageTextBoxes.push("textbox");
  };

  console.log(imageTextBoxes);

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.root}
        onClick={handleClickOpen}
      >
        Add Merchandise
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Merchandise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the following fields to add an item to the merchandise
            database.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item Name"
            fullWidth
            onChange={(event) => setName(event.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Item Description"
            fullWidth
            onChange={(event) => setDescription(event.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Item Price"
            fullWidth
            onChange={(event) => setPrice(event.target.value)}
          />
          <br></br>
          <br></br>
          <TextField
            autoFocus
            margin="dense"
            id="stock"
            label="Item Stock Count"
            fullWidth
            onChange={(event) => setStock(event.target.value)}
          />
          <br></br>
          <br></br>
          {imageTextBoxes.map((textbox) => (
            <TextField
              autoFocus
              margin="dense"
              id="image"
              label="Image Address"
              fullWidth
              onChange={(event) => image.push(event.target.value)}
            />
          ))}

          <Button onClick={() => handleAddImage()}>
            <AddIcon />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
