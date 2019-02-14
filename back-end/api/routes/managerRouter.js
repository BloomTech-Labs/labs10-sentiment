const express = require("express");
const router = express.Router();
const database = require('../database/dbConfig');

router.get('/', (req, res) => {
    database('managers')
    .then(data => {
        res.status(200).send(data)
    })
    .catch(() => res.status(500).send('error'))
})

module.exports = router;