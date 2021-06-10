var express = require("express");
var router = express.Router();

var db = require("../firebase");
/**refernce for getting the merhchandise */
const merchandiseRef = db.collection("merchandise");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome To A merchandise");
});

/**
 * [router.get(/read) description]
 * route to display all of the contents of the merchandise database
 */
router.get("/read", async (req, res) => {
  const merchandise = [];
  const snapshot = await merchandiseRef.get();
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    merchandise.push(docU);
  });
  res.send(merchandise);
});

/**
 * [router.post(/add) description]
 * route to add a new merchandise item
 * @params
 * body: contents you wish to add in json strinfied format
 */
router.post("/add", async (req, res) => {
  var input = req.body;
  const snapshot = merchandiseRef.add(input);
  res.send(snapshot);
});

/**
 * [router.post(/add) description]
 * route to remove a specific merchandise item
 * @params
 * query: the name of the merchandise you want to remove
 *
 */
router.delete("/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var name = req.params.query;
  const merchandise = [];
  const snapshot = await db.collection("merchandise").get();
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    merchandise.push(docU);
  });
  for (var i = 0; i < merchandise.length; i++) {
    if (merchandise[i].name === name) docToDeleteId = merchandise[i].id;
  }
  const del = await db.collection("merchandise").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});

/**
 * [router.post(/update/:query) description]
 * route to edit a document in merchandise
 * @params
 * query: the name of the merchandise you want to edit
 * body.val: the value you want it to be changed to
 * body.type: the field you are editing
 */
router.post("/update", async (req, res) => {
  var docToUpdateId = "";
  var name = req.body.title;
  var val = req.body.val;
  var type = req.body.type;
  const merchandise = [];
  const snapshot = await db.collection("merchandise").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    merchandise.push(docU);
  });

  for (var i = 0; i < merchandise.length; i++) {
    if (merchandise[i].name === name) docToUpdateId = merchandise[i].id;
  }

  const classRef = merchandiseRef.doc(docToUpdateId);
  if (type === "name") {
    const resp = await classRef.update({ name: val });
  } else if (type === "price") {
    const resp2 = await classRef.update({ price: val });
  } else if (type === "description") {
    const resp3 = await classRef.update({ description: val });
  } else if (type === "Stock") {
    const resp4 = await classRef.update({ Stock: val });
  }
  res.send("Update");
});

module.exports = router;
