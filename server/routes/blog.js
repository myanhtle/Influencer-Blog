var express = require("express");
var router = express.Router();
var db = require("../firebase");

/* TEST */
router.get("/", (req, res) => {
  res.send("Hello World!");
});

/* Get blog posts from blog database */

router.get("/read", async (req, res) => {
  const snapshot = await db.collection("blog").get();
  const allPosts = [];
  snapshot.forEach((post) => {
    allPosts.push({ ...post.data(), id: post.id });
  });
  console.log(allPosts);
  res.send(allPosts);
});

/* Add post to blog database */

router.post("/add", async (req, res) => {
  const { date, likes, messageContent } = req.body;

  console.log(req.body);

  const resp = await db.collection("blog").add({
    date,
    likes,
    messageContent,
  });

  console.log("Added document with ID: ", resp.id);
  res.sendStatus(200);
});

module.exports = router;
