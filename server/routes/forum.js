var express = require("express");
var router = express.Router();

var db = require("../firebase");
const classesRef = db.collection("classes");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/read", async (req, res) => {
  const classes = [];
  const snapshot = await classesRef.get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    classes.push(docU);
  });
  res.send(classes);
});

router.post("/add", async (req, res) => {
  var input = req.body;
  const snapshot = classesRef.add(input);
  res.send(snapshot);
});

router.delete("/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var title = req.params.query;
  const classes = [];
  const snapshot = await db.collection("classes").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    classes.push(docU);
  });
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].ID === title) docToDeleteId = classes[i].id;
  }
  const del = await db.collection("classes").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});
router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  var title = req.params.query;
  var val = req.body.val;
  var type = req.body.type;
  const classes = [];
  const snapshot = await db.collection("classes").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    classes.push(docU);
  });
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].ID === title) docToUpdateId = classes[i].id;
  }
  const classRef = classesRef.doc(docToUpdateId);
  if (type === "Teacher") {
    const resp = await classRef.update({ Teacher: val });
  } else if (type === "Subject") {
    const resp2 = await classRef.update({ Subject: val });
  } else if (type === "Students") {
    const resp3 = await classRef.update({ Students: val });
  } else if (type === "End") {
    const resp2 = await classRef.update({ End: val });
  } else if (type === "Start") {
    const resp3 = await classRef.update({ Start: val });
  } else if (type === "ID") {
    const resp2 = await classRef.update({ ID: val });
  } else if (type === "Classroom") {
    const resp3 = await classRef.update({ Classroom: val });
  } else if (type === "Title") {
    const resp3 = await classRef.update({ Title: val });
  }
  res.send("Update");
});
module.exports = router;
