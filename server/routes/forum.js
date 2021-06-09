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
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  // console.log(forum);
  res.send(forum);
});

router.post("/add", async (req, res) => {
  // console.log(req.body);
  var input = req.body;
  const snapshot = forumRef.add(input);
  res.send(snapshot);
});

router.delete("/delete/:query", async (req, res) => {
  var docToDeleteId = "";
  var title = req.params.query;
  const forum = [];
  const snapshot = await db.collection("forum").get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  for (var i = 0; i < forum.length; i++) {
    if (forum[i].Title === title) docToDeleteId = forum[i].id;
  }
  //console.log(docToDeleteId);
  const del = await db.collection("forum").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});
router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  var title = req.params.query;
  var val = req.body.val;
  var type = req.body.type;
  // console.log(type);
  const forum = [];
  const snapshot = await db.collection("forum").get();

  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  //console.log(forum);
  for (var i = 0; i < forum.length; i++) {
    if (forum[i].Title === title) docToUpdateId = forum[i].id;
  }

  const classRef = forumRef.doc(docToUpdateId);
  if (type === "Title") {
    const resp = await classRef.update({ Title: val });
  } else if (type === "Content") {
    const resp2 = await classRef.update({ Content: val });
  } else if (type === "Likes") {
    const resp3 = await classRef.update({ Likes: val });
  } else if (type === "Comments") {
    const resp4 = await classRef.update({ Comments: val });
  }
  res.send("Update");
});
module.exports = router;
