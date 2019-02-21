const express = require("express");
const router = express.Router();
require('dotenv').config();
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

  // customer needs to be created. the customer id needs to be sent back and kept on state.
  // two subscription options. i think we need two buttons. one for 10 and one for 50. 
  // once i figure out how to implement subscriptions we can just create two routes. one at /10 and one at /50

router.post('/customer', (req, res) => {
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

router.post('/subscribe10', (req, res) => {
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
