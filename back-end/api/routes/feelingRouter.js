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

module.exports = router;
