const express = require("express");
const router = express.Router();
const db = require('../database/dbConfig');

// GET ALL TEAM MEMBERS
router.get('/', (req, res) => {
    db('team_members')
        .then(getSuccess(res))
        .catch(serverErrorGet(res));
    });
//knex create
router.post('/', (req, res) => {
    const team_members = req.body;
    db.insert(team_members)
    .into('team_members')
    .then(postSuccess(res))
    .catch(serverErrorPost(res));
});

module.exports = router;