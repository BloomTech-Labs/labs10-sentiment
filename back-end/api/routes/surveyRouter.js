const express = require("express");
const router = express.Router();
const surveyDB = require("../database/dbConfig.js");

const postSuccess = res => id => {
  res.status(201).json(id);
};
const serverErrorPost = res => err => {
  res.status(422).json(err);
};

const getSuccess = res => data => {
  res.status(200).json(data);
};

const serverErrorGet = res => err => {
  res.status(500).json(err);
};

router.post("/", (req, res) => {
  const postInfo = req.body;
  surveyDB("surveys")
    .insert(postInfo)
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

router.get("/", (req, res) => {
  surveyDB("surveys")
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

module.exports = router;