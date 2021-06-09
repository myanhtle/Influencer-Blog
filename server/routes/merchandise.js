var express = require("express");
var router = express.Router();

var db = require("../firebase");
const merchandiseRef = db.collection("merchandise");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome To A merchandise");
});

router.get("/read", async (req, res) => {
  const merchandise = [];
  const snapshot = await merchandiseRef.get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    merchandise.push(docU);
  });
  // console.log(merchandise);
  res.send(merchandise);
});

router.post("/add", async (req, res) => {
  // console.log(req.body);
  var input = req.body;
  const snapshot = merchandiseRef.add(input);
  res.send(snapshot);
});

router.delete("/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var name = req.params.query;
  const merchandise = [];
  const snapshot = await db.collection("merchandise").get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    merchandise.push(docU);
  });
  for (var i = 0; i < merchandise.length; i++) {
    if (merchandise[i].Name === name) docToDeleteId = merchandise[i].id;
  }
  //console.log(docToDeleteId);
  const del = await db.collection("merchandise").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});
router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  var name = req.params.query;
  var val = req.body.val;
  var type = req.body.type;
  // console.log(type);
  const merchandise = [];
  const snapshot = await db.collection("merchandise").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    merchandise.push(docU);
  });
  //console.log(merchandise);
  for (var i = 0; i < merchandise.length; i++) {
    if (merchandise[i].Name === name) docToUpdateId = merchandise[i].id;
  }

  const classRef = merchandiseRef.doc(docToUpdateId);
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
