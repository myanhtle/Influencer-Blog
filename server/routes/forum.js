var express = require("express");
var router = express.Router();

var db = require("../firebase");
const forumRef = db.collection("forum");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome To A Forum");
});

router.get("/read", async (req, res) => {
  const forum = [];
  const snapshot = await forumRef.get();
  console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  console.log(forum);
  res.send(forum);
});

router.post("/add", async (req, res) => {
  var input = req.body;
  const snapshot = forumRef.add(input);
  res.send(snapshot);
});

router.delete("/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var title = req.params.query;
  const forum = [];
  const snapshot = await db.collection("forum").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  for (var i = 0; i < forum.length; i++) {
    if (forum[i].ID === title) docToDeleteId = forum[i].id;
  }
  const del = await db.collection("forum").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});
router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  var title = req.params.query;
  var val = req.body.val;
  var type = req.body.type;
  const forum = [];
  const snapshot = await db.collection("forum").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  for (var i = 0; i < forum.length; i++) {
    if (forum[i].ID === title) docToUpdateId = forum[i].id;
  }
  const classRef = forumRef.doc(docToUpdateId);
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
