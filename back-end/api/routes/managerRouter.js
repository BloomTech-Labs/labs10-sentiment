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

router.post('/', (req, res) => {
    const info = req.body;
    database('managers')
    .insert(info)
    .then(ids => {
        database('managers')
        .where({ id: ids[0] })
        then(user => {
            res.status(201).send('success')
        })
        .catch(() => res.status(405).send('information incomplete'))
    })
    .catch(() => res.status(500).send('error saving data'))
})

module.exports = router;