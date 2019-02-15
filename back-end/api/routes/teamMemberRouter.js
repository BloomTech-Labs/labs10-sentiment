const express = require("express");
const router = express.Router();
const db = require('../database/dbConfig');

// GET ALL TEAM MEMBERS
router.get('/', (req, res) => {
    db('team_members')
        .then(getSuccess(res))
        .catch(serverErrorGet(res));
    });

  module.exports = router;