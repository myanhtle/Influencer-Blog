var express = require("express");
var router = express.Router();

var db = require("../firebase");
const cartRef = db.collection("cart");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome To A cart");
});

router.get("/read", async (req, res) => {
  const cart = [];
  const snapshot = await cartRef.get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  // console.log(cart);
  res.send(cart);
});
router.get("/read/:query", async (req, res) => {
  const cart = [];
  var name = req.params.query;
  const snapshot = await cartRef.get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    if (doc.data().User === name) {
      let docU = { ...doc.data(), id: doc.id };
      cart.push(docU);
    }
  });
  // console.log(cart);
  res.send(cart);
});
router.get("/sum/:query", async (req, res) => {
  const cart = [];
  var sum = 0;
  var name = req.params.query;
  console.log(name);
  const snapshot = await cartRef.get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  // console.log(cart);
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].User === name) {
      sum = parseFloat(sum) + parseFloat(cart[i].Price);
      //  console.log(cart[i].Price);
    }
  }
  var val = {
    Sum: sum,
    User: "John",
  };
  console.log(val);
  //var data = JSON.stringify(val);
  //console.log(sum);
  // console.log(cart);
  // cart.push(sum);
  res.send(val);
});
router.post("/add", async (req, res) => {
  // console.log(req.body);
  var input = req.body;
  const snapshot = cartRef.add(input);

  res.send(snapshot);
});

router.delete("/delete/:query", async (req, res) => {
  console.log("Please");
  var docToDeleteId = "";
  var name = req.params.query;
  console.log(name);
  const cart = [];
  const snapshot = await db.collection("cart").get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].Name === name) docToDeleteId = cart[i].id;
  }
  //console.log(docToDeleteId);
  const del = await db.collection("cart").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});

router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  var name = req.params.query;
  var val = req.body.val;
  var type = req.body.type;
  // console.log(type);
  const cart = [];
  const snapshot = await db.collection("cart").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  //console.log(cart);
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].Name === name) docToUpdateId = cart[i].id;
  }

  const classRef = cartRef.doc(docToUpdateId);
  if (type === "Name") {
    const resp = await classRef.update({ Name: val });
  } else if (type === "Price") {
    const resp2 = await classRef.update({ Price: val });
  } else if (type === "Rating") {
    const resp3 = await classRef.update({ Rating: val });
  } else if (type === "Stock") {
    const resp4 = await classRef.update({ Stock: val });
  }
  res.send("Update");
});
module.exports = router;
