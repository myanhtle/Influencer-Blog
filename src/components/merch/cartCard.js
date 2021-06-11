import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "10px",
    margin: "20px",
    width: "50%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    paddingTop: "90px",
    paddingLeft: "50px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  image: {
    height: "250px",
  },

  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  removeButton: {
    marginLeft: "400px",
  },
}));

export default function CartCard({ item }) {
  const classes = useStyles();
  const theme = useTheme();

  const handleRemove = () => {
    fetch(`http://localhost:8080/cart/delete/${item.name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: item.user }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    window.location.reload();
  };

  return (
    <Card className={classes.root}>
      <img className={classes.image} src={item.images[0]} />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.description}
          </Typography>
          <br />
          <Typography>${item.price}</Typography>
          <div className={classes.flexContainer}>
            <Typography>Qty: {item.quantity}</Typography>
            <div className={classes.removeButton}>
              <Button onClick={() => handleRemove()}>Remove</Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
