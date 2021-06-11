var express = require("express");
var router = express.Router();
var db = require("../firebase");
require("docstring");
/**
 * [forumRef description]
 * Reusable variable for calling db.collection
 */
const forumRef = db.collection("forum");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Welcome To A Forum");
});
/**
 *[router.get(/read) description]
 * Route to fetch all of the data currently in the documents of the forum database and display
 */
router.get("/read", async (req, res) => {
  /**[forum description] a variable storing all of the elements in forum */
  const forum = [];
  const snapshot = await forumRef.get();
  snapshot.forEach((doc) => {
    /**[document description] a variable to temporarily store the data that is pushed onto forum */
    let document = { ...doc.data(), id: doc.id };
    forum.push(document);
  });

  res.send(forum);
});

/**
 * [router.post(/add) description]
 * Route to add all of the contents of req.body (a passed in json) to the forum server as a new document
 */
router.post("/add", async (req, res) => {
  /**[input description] variable storing the passed in req.body
   * @param:req.body
   * @type: Json->string, the client code should pass in a json stringified document as the body attribute of the
   * call to this method
   *   */
  var input = req.body;
  const snapshot = forumRef.add(input);
  res.send(snapshot);
});

/**
 * [router.delete/:query description]
 * Route to delete a document
 * @param:{string} query the name field of the document you want to be deleted
 */
router.delete("/delete/:query", async (req, res) => {
  /**docToDeleteId: a temporary variable storing the ID of the document that will be deleted */
  var docToDeleteId = "";
  /** title: a temporary variable that is equal to query, should be the title of the forum post being deleted*/
  var title = req.params.query;
  /**forum: temp variable storing all of the documents in the forum database */
  const forum = [];
  /** snapshot holds the fetch call result from forumRef.get()*/
  const snapshot = await forumRef.get();
  /**loop through snapshot and add the documents to forum */
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  /**Loop through the elements of forum and check for the one with the matching title if found delete it */
  for (var i = 0; i < forum.length; i++) {
    if (forum[i].Title === title) docToDeleteId = forum[i].id;
  }
  const del = await db.collection("forum").doc(docToDeleteId).delete();
  res.send("DELETE Request Called");
});

/**
 * [router.post/update/:query description]
 * Route to update a document
 * @param:{string} query the name field of the document you want to be updated
 */
router.post("/update/:query", async (req, res) => {
  var docToUpdateId = "";
  /**title is gotten from the query parameter in the route, should be the title of the post to be updated */
  var title = req.params.query;
  /**val is taken from body, the strinfied json passed in with the call
   *  val should be the value you wish the field to become */
  var val = req.body.val;
  /**type is taken from body, the stringified json passed in with the call
   * type should be the type of field you wish to edit ie (Title, Content)
   */
  var type = req.body.type;
  const forum = [];
  const snapshot = await db.collection("forum").get();
  /**Store all of the data in the database into forum */
  snapshot.forEach((doc) => {
    let docU = { ...doc.data(), id: doc.id };
    forum.push(docU);
  });
  /**Find the ID of the document you wish to update */
  for (var i = 0; i < forum.length; i++) {
    if (forum[i].Title === title) docToUpdateId = forum[i].id;
  }
  //**docRef is the reference for the document with the selected ID */
  const docRef = forumRef.doc(docToUpdateId);
  /**Select based on the type parameter which value to update */
  if (type === "Title") {
    const resp = await docRef.update({ Title: val });
  } else if (type === "Content") {
    const resp2 = await docRef.update({ Content: val });
  } else if (type === "Likes") {
    const resp3 = await docRef.update({ Likes: val });
  } else if (type === "Comments") {
    const resp4 = await docRef.update({ Comments: val });
  } else if (type === "LikedBy") {
    const resp5 = await docRef.update({ LikedBy: val });
  }
  res.send("Update");
});
module.exports = router;
