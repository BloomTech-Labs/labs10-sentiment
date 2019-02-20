const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_jHycy56d9VhQBFxJSQq5PCUy');

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

router.post('/customer', async (req, res) => {
    const details = req.body
    try {
    let customer = stripe.customers.create({
        email: details.email
    });
    res.send(customer);
} catch (err) {
    res.status(500).end();
}
})

router.post('/subscribe10', async (req, res) => {
    const details = req.body
    try {
    let subscription = stripe.subscriptions.create({
        customer: details.customer,
        items: [{plan: plan_EZB6io5CDBFwN7}],
        source: details.source
    });
    res.send(subscription);
} catch (err) {
    res.status(500).end();
}
})

module.exports = router;