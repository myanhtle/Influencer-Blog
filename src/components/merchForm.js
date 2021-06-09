import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import { title } from "process";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function MerchForm() {
  const [open, setOpen] = React.useState(false);
  const [openU, setOpenU] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [merch, setMerch] = useState([]);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState([]);
  const [stock, setStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [deleteVal, setDeleteVal] = useState([]);
  const [update, setUpdate] = useState([]);
  const [updateType, setUpdateType] = useState([]);
  const [updateVal, setUpdateVal] = useState([]);
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState([]);
  const like = () => {}
  const darkBlue = "#004981";
  const lightBlue = "#6ea8d4";
  const baseButtonStyle = {
    backgroundColor: darkBlue,
    borderWidth: "0px",
    fontWeight: "bold",
    color: "white",
  };
  const selectButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: selectMode ? lightBlue : darkBlue,
  };
  const typeList = ["Name", "Price", "Stock", "Rating"];
  const InputStyle = {
    backgroundColor: "#E5E5E5",
    borderRadius: "10px",
    padding: "5px",
  };
  const handleClickOpen = () => {
    if (merch.length === 0) {
      fetchMerch();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchMerch();
  };
  const handleClickOpenD = () => {
    if (merch.length === 0) {
      fetchMerch();
    }
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
    fetchMerch();
  };
  const handleClickOpenU = () => {
    if (merch.length === 0) {
      fetchMerch();
    }
    setOpenU(true);
  };

  const handleCloseU = () => {
    setOpenU(false);
    fetchMerch();
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
  const fetchMerch = () => {
    fetch(`http://localhost:8080/merchandise/read`)
      .then((res) => res.json())
      .then((data) => setMerch(data));
  };
  const fetchCart = () => {
    fetchSum();
    fetch(`http://localhost:8080/cart/read`)
      .then((res) => res.json())
      .then((data) => setCart(data));
  };
  const fetchUserCart = () => {
    fetchSum();
    fetch(`http://localhost:8080/cart/read/John`)
      .then((res) => res.json())
      .then((data) => setCart(data));
  };
  const fetchSum = () => {
    fetch(`http://localhost:8080/cart/sum/Samantha`)
      .then((res) => res.json())
      .then((data) => setSum(data));
    // console.log(sum);
  };
  const addToCart = (c) => {
    var val = {
      Name: c.Name,
      Price: c.Price,
      User: "Samantha",
    };
    console.log(val);
    var data = JSON.stringify(val);
    fetch(`http://localhost:8080/cart/add`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  const remove = (c) => {
    fetch(`http://localhost:8080/cart/delete/${c.Name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
      body: JSON.stringify({ Title: c.User }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setDeleteVal("");
  };
  const clearCart = () => {
    fetch(`http://localhost:8080/cart/delete/all`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
      body: JSON.stringify({ title: "John" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const createMerch = (name, price, rating, stock) => {
    var val = {
      Name: name,
      Price: price,
      Rating: rating,
      Stock: stock,
    };
    console.log(val);
    var data = JSON.stringify(val);
    fetch(`http://localhost:8080/merchandise/add`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  const deletePost = (e) => {
    fetch(`http://localhost:8080/merchandise/delete/${deleteVal}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
      },
      body: JSON.stringify({ title: deleteVal }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setDeleteVal("");
  };

  const updatemerch = (e) => {
    //   console.log(update);
    //   console.log(updateType);
    //   console.log(updateVal);
    fetch(`http://localhost:8080/merchandise/update/${update}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: update,
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

  return (
    <div>
      <Button onClick={() => fetchMerch()}>Update Posts</Button>
      <Button style={baseButtonStyle} onClick={handleClickOpen}>
        Create Merch
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          <Input
            style={InputStyle}
            start="Title"
            placeholder="Enter the name"
            value={name}
            onChange={handleChangeName}
          />
          <Input
            style={InputStyle}
            name="Write what you want!"
            placeholder="Enter the price"
            value={price}
            onChange={handleChangePrice}
          />
          <Input
            style={InputStyle}
            name="Write what you want!"
            placeholder="A Rating"
            value={rating}
            onChange={handleChangeRating}
          />
          <Input
            style={InputStyle}
            name="Write what you want!"
            placeholder="Enter the stock"
            value={stock}
            onChange={handleChangeStock}
          />
          <Button
            style={baseButtonStyle}
            onClick={() => createMerch(name, price, rating, stock)}
          >
            Post
          </Button>
        </form>
      </Dialog>
      <Button style={baseButtonStyle} onClick={handleClickOpenU}>
        Update Post
      </Button>
      <Dialog
        open={openU}
        onClose={handleCloseU}
        aria-labelledby="form-dialog-title"
      >
        <form>
          Title:
          <Select style={selectButtonStyle} onChange={handleChangeUpdate}>
            {merch.map((id) => {
              return <option value={id.Name}> {id.Name} </option>;
            })}
          </Select>
          Type:
          <Select style={selectButtonStyle} onChange={handleChangeType}>
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
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button style={baseButtonStyle} onClick={handleClickOpenD}>
        Delete Post
      </Button>
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="form-dialog-title"
      >
        <form>
          Title:
          <Select style={selectButtonStyle} onChange={handleChangeDelete}>
            {merch.map((id) => {
              return <option value={id.Name}> {id.Name} </option>;
            })}
          </Select>
          <Button style={baseButtonStyle} onClick={() => deletePost()}>
            Delete Class
          </Button>
        </form>
      </Dialog>
      <form>
        Posts:
        {merch.map((c) => (
          <p>
            Name:{c.Name + " "}
            Price:{c.Price + " "}
            Rating: {c.Rating + " "}
            <Button onClick={() => like(c)}>Rate</Button>
          </p>
        ))}
      </form>
      <Button onClick={() => fetchCart()}>Fetch Cart</Button>
      <Button onClick={() => fetchUserCart()}>User Cart</Button>
      <Button onClick={() => fetchSum()}>Update Sum</Button>
      <Button onClick={() => clearCart()}>Clear Cart</Button>
      <p>{sum.Sum}</p>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default MerchForm;
