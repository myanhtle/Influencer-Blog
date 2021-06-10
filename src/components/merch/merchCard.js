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

export default function MerchCard({ item }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [added, setAdded] = useState(false);
  const { username } = useContext(UserContext);

  /* Creates an array of image links */
  const imgReel = [];

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
              <Button>
                <DeleteIcon />
              </Button>
              <Button>
                <EditIcon />
              </Button>
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
