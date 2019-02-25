const express = require("express");
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.SECRETKEY);


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


  router.post('/subscribe50', (req, res) => {
    const stripeToken = req.body.stripeToken;
    const email = req.body.email;

    stripe.customers.create({
        email: email,
        source: stripeToken
    }, function(err, customer) {
        if(err) {
            res.send(
                serverErrorPost(res)
            )
        } else {
            const { id } = customer

            stripe.subscriptions.create({
                customer: id,
                items: [{plan: 'plan_EZCIVSUC7Coh7z'}],

            }, function(err, subscription) {
                if(err) {
                    res.send(
                        serverErrorPost(res)
                    )
                } else {
                    res.status(200).json({subscription})
                }
            })
        }
    })
})

router.post('/subscribe10', (req, res) => {
    const stripeToken = req.body.stripeToken;
    const email = req.body.email;

    stripe.customers.create({
        email: email,
        source: stripeToken
    }, function(err, customer) {
        if(err) {
            res.send(
                serverErrorPost(res)
            )
        } else {
            const { id } = customer

            stripe.subscriptions.create({
                customer: id,
                items: [{plan: 'plan_EZB6io5CDBFwN7'}],

            }, function(err, subscription) {
                if(err) {
                    res.send(
                        serverErrorPost(res)
                    )
                } else {
                    res.status(200).json({subscription})
                        
                    
                }
            })
        }
    })
})

module.exports = router;
