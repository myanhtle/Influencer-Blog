var express = require("express");
var router = express.Router();
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
var db = require("../firebase");
/**Reference for db.collection("cart") to allow for easy reuse */
const cartRef = db.collection("cart");
require("docstring");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome To A cart");
});

/**
 *[router.get(/read) description]
 * Route to fetch all of the data currently in the documents of the cartdatabase and display
 */
router.get("/read", async (req, res) => {
  /**cart is an array holding all of the values for the documents in the cart */
  const cart = [];
  /**snapshot is the reference for the documents in the cart */
  const snapshot = await cartRef.get();
  /**traverse snapshot and push the documents into the cart */
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  /**display the cart at url/cart/read */
  res.send(cart);
});

/**
 *[router.get(/read/query) description]
 * Route to fetch all of the data currently in the documents of the cart database for a given user and display
 * @param:query should be the name of the person whose cart you wish to see
 */
router.get("/read/:query", async (req, res) => {
  const cart = [];
  /**name should be the passed in parameter, the name of the user whose cart is being accessed */
  var username = req.params.query;
  const snapshot = await cartRef.get();
  /**traversal and push to cart see get(/read) for more specifics */
  snapshot.forEach((doc) => {
    if (doc.data().user === username) {
      let docU = { ...doc.data(), id: doc.id };
      cart.push(docU);
    }
  });
  res.send(cart);
});

/**
 *[router.get(/sum/query) description]
 * Route to calculate the sum of a users cart
 * @param:query should be the name of the person whose cart you wish to get the sum of
 */
router.get("/sum/:query", async (req, res) => {
  const cart = [];
  /**sum stores the current sum of the carts contents  */
  var sum = 0;
  /**name is the parameter passed in representing the name of the user whose cart you are acessing */
  var username = req.params.query;
  const snapshot = await cartRef.get();
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].user === username) {
      sum = parseFloat(sum) + parseFloat(cart[i].price * cart[i].quantity);
    }
  }
  /**val is a json structured variable to be returned through res.send to the client application */
  var val = {
    sum: sum,
    user: username,
  };
  res.send(val);
});

/**
 *[router.post(/add) description]
 * Route to add the contents of the body json passed in the method call
 */
router.post("/add", async (req, res) => {
  /**body should contain all the elments you want to be stored as the new document */
  var input = req.body;
  const snapshot = cartRef.add(input);
  res.send(snapshot);
});

/**
 *[router.delete(/delete/:query)) description]
 * @params
 * query: name of the item you want deleted
 * title: user whose cart that item belongs to
 */
router.delete("/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var name = req.params.query;
  var user = req.body.user;
  const cart = [];
  const snapshot = await db.collection("cart").get();
  var dele;

  snapshot.forEach((doc) => {
    if (doc.data().user === user) {
      let docU = { ...doc.data(), id: doc.id };
      cart.push(docU);
    }
  });
  /**all tag should clear all items from a users cart, call with query all  */
  if (name === "all") {
    for (var i = 0; i < cart.length; i++) {
      docToDeleteId = cart[i].id;
      dele = await db.collection("cart").doc(docToDeleteId).delete();
    }
    /**otherwise the method will only delete the specific item whose name matches */
  } else {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === name) docToDeleteId = cart[i].id;
    }
    const del = await cartRef.doc(docToDeleteId).delete();
  }
  res.send("DELETE Request Called");
});

/**
 *[router.post(/update/:query)) description]
 * @params
 * query: name of the item you want updated
 * body.type: the field you want updated
 * body.val: the value you want the field changed to
 */
router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  var name = req.params.query;
  var val = req.body.val;
  var type = req.body.type;
  const cart = [];
  const snapshot = await db.collection("cart").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].Name === name) docToUpdateId = cart[i].id;
  }
  /**select based on type which field to update */
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
/**
 * [sumCalc description]
 * returns the current sum of the provider user, used by Stripe
 * @param
 * req.body: the body json passed in
 * @param
 * body.User: the user whose sum you want
 */
const sumCalc = async (req, res) => {
  const cart = [];
  var sum = 0;
  var user = req.body.User;
  const snapshot = await cartRef.get();
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    cart.push(docU);
  });
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].User === user) {
      sum = parseFloat(sum) + parseFloat(cart[i].Price);
    }
  }
  return sum;
};

/**
 *[router.post(/create-payment-intent)) description]
 *Stripe route to handle checkout procedure
 * @params
 * body.User: the user who is purchasing the card
 * Caller: CheckoutForm
 */
router.post("/create-payment-intent", async (req, res) => {
  /**the items you pass into this will be the ones it thinks you are purchasing */
  const user = req.body;
  /**create a new payment intent with the calculated sum (should be updated to take in a user) */
  const paymentIntent = await stripe.paymentIntents.create({
    amount: sumCalc(user),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
