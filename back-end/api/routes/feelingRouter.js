const express = require("express");
const router = express.Router();
const db = require("../database/dbConfig");

router.post("/", (req, res) => {
  const info = req.body;
  db.insert(info)
    .into("feelings")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ error: "failed to post new team member", err });
    });
});

router.get("/", (req, res) => {
  db("feelings")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(() => res.status(500).send("error"));
});

module.exports = router;
