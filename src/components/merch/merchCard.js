import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import logo from "../../images/logo_black.png";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    paddingTop: "10%",
    height: 175,
    paddingLeft: theme.spacing(3),
  },
  img: {
    height: 600,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
}));
const baseButtonStyle = {
  borderWidth: "0px",
  fontWeight: "bold",
  color: "white",
};
const selectButtonStyle = {
  ...baseButtonStyle,
};

const InputStyle = {
  backgroundColor: "#E5E5E5",
  borderRadius: "10px",
  padding: "5px",
};
export default function MerchCard({ item }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [added, setAdded] = useState(false);
  const { username } = useContext(UserContext);
  const [deleteVal, setDeleteVal] = useState([]);
  const [update, setUpdate] = useState([]);
  const [updateType, setUpdateType] = useState([]);
  const [updateVal, setUpdateVal] = useState([]);
  const [open, setOpen] = useState(false);
  const [openU, setOpenU] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState([]);
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(0);

  const typeList = ["name", "description", "price"];
  /* Creates an array of image links */
  const imgReel = [];
  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  const handleClickOpenU = () => {
    setOpenU(true);
  };

  const handleCloseU = () => {
    setOpenU(false);
  };
  const handleChangePrice = (e) => {
    setPrice(e.currentTarget.value);
  };
  const handleChangeName = (e) => {
    setName(e.currentTarget.value);
  };
  const handleChangeStock = (e) => {
    setStock(e.currentTarget.value);
  };
  const handleChangeRating = (e) => {
    setRating(e.currentTarget.value);
  };
  const handleChangeDelete = (e) => {
    setDeleteVal(e.currentTarget.value);
  };
  const handleChangeUpdate = (e) => {
    setUpdate(e.currentTarget.value);
  };
  const handleChangeType = (e) => {
    setUpdateType(e.currentTarget.value);
  };
  const handleChangeVal = (e) => {
    setUpdateVal(e.currentTarget.value);
  };
  if (item.image) {
    item.image.forEach((img) => imgReel.push({ imgPath: img }));
  } else {
    imgReel.push({ imgPath: logo });
  }

  console.log(imgReel);
  /* */

  /*Functionality for Next button*/
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  /*Functionality for Back button*/
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const updatemerch = (e) => {
    fetch(`http://localhost:8080/merchandise/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.name,
        type: updateType,
        val: updateVal,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setUpdate("");
    setUpdateType("");
    setUpdateVal("");
  };
  /*Functionality for Cart button*/
  const handleClick = () => {
    const itemDetails = {
      name: item.name,
      price: item.price,
      user: username,
    };

    console.log(itemDetails);
    var data = JSON.stringify(itemDetails);
    fetch(`http://localhost:8080/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    setAdded(true);
  };
  const deletePost = (e) => {
    fetch(`http://localhost:8080/merchandise/delete/${item.name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
      body: JSON.stringify({ title: item.name }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className={classes.root}>
      <img className={classes.img} src={imgReel[activeStep].imgPath} />
      <Paper square elevation={2} className={classes.header}>
        <div>
          <Typography>
            {item.name} <br /> {item.description} <br /> ${item.price}
          </Typography>
          <br />
          <div className="merchCard-functionContainer">
            <div className="editMerch-container">
              <Button onClick={() => deletePost()}>
                <DeleteIcon />
              </Button>

              <Button onClick={handleClickOpenU}>
                <EditIcon />
              </Button>
              <Dialog
                open={openU}
                onClose={handleCloseU}
                aria-labelledby="form-dialog-title"
              >
                <form>
                  Type:
                  <Select
                    style={selectButtonStyle}
                    onChange={handleChangeType}
                    selected={typeList[0]}
                  >
                    {typeList.map((type) => {
                      return <option value={type}> {type} </option>;
                    })}
                  </Select>
                  <Input
                    style={InputStyle}
                    name="newVal"
                    placeholder="What should it be set to?"
                    value={updateVal}
                    onChange={handleChangeVal}
                  />
                  <Button style={baseButtonStyle} onClick={() => updatemerch()}>
                    Update Post
                  </Button>
                </form>
              </Dialog>
            </div>
            <div className="addToCart-container">
              {added === false ? (
                <Button onClick={() => handleClick()}>Add to Bag</Button>
              ) : (
                <Button disabled>Added to Bag</Button>
              )}
            </div>
          </div>
        </div>
      </Paper>
      <MobileStepper
        variant="dots"
        steps={imgReel.length}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === imgReel.length - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}
