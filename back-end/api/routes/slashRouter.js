const express = require("express");
const router = express.Router();
const db = require("../database/helpers/slashDb");

const {
  postSuccess,
  serverErrorPost,
  getSuccess,
  serverErrorGet,
  serverErrorGetID,
  serverErrorDelete404,
  serverErrorDelete500,
  serverErrorUpdate404,
  serverErrorUpdate500
} = require("./routeHelpers/helpers.js");

router.get("/", (req, res) => {
  db.get()
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

router.post("/", (req, res) => {
  let postInfo = { slash: req.body };
  db.insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

module.exports = router;
