//
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
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

router.use(bodyParser.urlencoded({ extended: true }));

// router.get("/", function(req, res) {
//   res.status(200).send("Hello World");
// });

router.post("/", function(req, res, next) {
  let userName = req.body.user_name;
  let botPayload = {
    response_type: "in_channel",
    text: `Hello ${userName}, welcome to the Moodbot Slack channel!!`
  };

  if (userName !== "slackbot") {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

// router.get("/", (req, res) => {
//   db.get()
//     .then(getSuccess(res))
//     .catch(serverErrorGet(res));
// });

// router.post("/", (req, res) => {
//   let response = req;
//   console.log(response);
//   let postInfo = { slash: response };
//   db.insert(postInfo)
//     .then(postSuccess(res))
//     .catch(serverErrorPost(res));
// });

module.exports = router;
