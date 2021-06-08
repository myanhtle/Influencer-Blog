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

/* Delete post from blog database */

router.delete("/delete", async (req, res) => {
  console.log(req.body);
  const resp = await db.collection("blog").doc(req.body.id).delete();
  console.log("Deleted document with ID: ", resp.id);
  res.sendStatus(200);
});

/* Update post in blog database */

router.post("/update", async (req, res) => {
  const { date, messageContent, id } = req.body;
  console.log("starting update");
  console.log("body:", req.body);

  const fieldChange = {};

  if (date) {
    fieldChange["date"] = date;
  }
  if (messageContent) {
    fieldChange["messageContent"] = messageContent;
  }

  console.log("fieldChange", fieldChange);

  const resp = await db.collection("blog").doc(id).update(fieldChange);
  console.log("Updated document with ID: ", id);
  res.sendStatus(200);
});

/* Update like count for each blog post */

/*Like*/

router.post("/like", async (req, res) => {
  const { currentLikeCount, id } = req.body;
  const resp = await db
    .collection("blog")
    .doc(id)
    .update({ likes: currentLikeCount + 1 });
  res.sendStatus(200);
});

/*Unlike*/

router.post("/unlike", async (req, res) => {
  const { currentLikeCount, id } = req.body;
  const resp = await db
    .collection("blog")
    .doc(id)
    .update({ likes: currentLikeCount - 1 });
  res.sendStatus(200);
});

module.exports = router;
