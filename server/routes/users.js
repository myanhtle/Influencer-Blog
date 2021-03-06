var express = require("express");
var router = express.Router();
var db = require("../firebase");

/* TEST */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Confirming user existence */

router.get("/check/:username", async (req, res) => {
  var givenUsername = req.params.username;
  console.log(givenUsername);
  const users = [];
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    let usersArray = { ...doc.data(), id: doc.id };
    users.push(usersArray);
  });
  console.log(users);
  for (var i = 0; i < users.length; i++) {
    console.log(users[i].id)
    if (users[i].id === givenUsername) {
      return res.send({ userExists: true });
    }
  }
  res.send({ userExists: false });
});

/* Get user information */

router.get("/read/:username", async (req, res) => {
  var username = req.params.username;
  console.log(username);
  const resp = await db.collection("users").doc(username).get();
  console.log(resp);
  res.send(resp);
});

/* Create an Account */

router.post("/add", async (req, res) => {
  const { username, name, email } = req.body;

  console.log(req.body);

  const resp = await db.collection("users").doc(username).set({
    name,
    email,
  });
  console.log("Added document with ID: ", username);
  res.sendStatus(200);
});

/* Delete an Account */

router.delete("/delete", async (req, res) => {
  const { username } = req.body;
  console.log(req.body);

  const resp = await db.collection("users").doc(username).delete();

  console.log(username, " has been deleted");
  res.sendStatus(200);
});

module.exports = router;
