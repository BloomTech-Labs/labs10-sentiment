const express = require("express");
const configureMiddleware = require("./middleware/middleware.js");

const managerRouter = require("./routes/managerRouter.js");
const teamMemberRouter = require("./routes/teamMemberRouter.js");
const teamRouter = require("./routes/teamRouter.js");
const surveyRouter = require("./routes/surveyRouter.js");
const feelingRouter = require("./routes/feelingRouter.js");
const surveyFeelingRouter = require("./routes/survey_feelingsRouter");
const stripeRouter = require("./routes/stripeRouter");
const slashRouter = require("./routes/slashRouter");
const slackAuth = require("./routes/slackAuth.js");

const stripe = require("stripe")("sk_test_jHycy56d9VhQBFxJSQq5PCUy");
const bodyParser = require("body-parser");
// const exphbs = require('express-handlebars');
const server = express();
configureMiddleware(server);

// Stripe Middlewares
// Handlebars Middelware
// server.engine('handlebars', exphbs({defaultLayout: 'main'}));
// server.search('view engine', 'handlebars');
// Body Parser Middleware
// server.use(bodyParser.json());
server.use(bodyParser.text());
// server.use(bodyParser.urlencoded({extended:false}));

server.use("/api/managers", managerRouter);
server.use("/api/team_members", teamMemberRouter);
server.use("/api/teams", teamRouter);
server.use("/api/surveys", surveyRouter);
server.use("/api/feelings", feelingRouter);
server.use("/api/survey_feelings", surveyFeelingRouter);
server.use("/api/stripe", stripeRouter);
server.use("/api/slash", slashRouter);
server.use("/api/slackAuth", slackAuth);

server.get("/", (req, res) => {
  res.status(200).json("Sanity Check ITS WORKING");
  console.log("Sanity Check ITS WORKING!!!");
});

// var request = require("request");

// var options = { method: 'GET',
//   url: 'https://bikbik.auth0.com/api/v2/users',
//   qs: { q: 'name:"Joseph Eastman"', search_engine: 'v3' },
//   headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qVkJPRGhHTURjM1JUWTBRVGt4TkRrM1JURXpRek5HUVVRd01ERXhOVGhFUmpBMU1FRkJPUSJ9.eyJpc3MiOiJodHRwczovL2Jpa2Jpay5hdXRoMC5jb20vIiwic3ViIjoidkM0MzBTWlpmd25RSFdIbEt0SFc1SVloSnNZR3pIQ1FAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYmlrYmlrLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTUwNjA5MDA1LCJleHAiOjE1NTA2OTU0MDUsImF6cCI6InZDNDMwU1paZnduUUhXSGxLdEhXNUlZaEpzWUd6SENRIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.iQ-CqQtMQYB0iKJ3ZFxSQz9JqswkCh1fvDe9FPJXnqTbB0rEEIg1vJTaCIgJ0tGZmyBvFgbSyZgnHxCkx7ehqCaxATs6gfLNJEph2wutzO02lZaNCoUh1TWckftU1fPOPczzJ45e1ZVxHe-v9o74OvWrP_aPGV0aSAYefU-aW-tUhNWxQCsfU3e5R6USo44NE1rjHhNxNbc4_74v-8jscEg3Ck7NYWRDryWh4t5-p7eNP2nYje2iNLRADuAhawjpxJ3TZoukttX9EjA7sRlFOvHFmNeKK5FWYpVzm9HoOAA799bUro7VEJuoEd1zo9X7JfJZd35EfI8BEUP9DT4eJQ' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

server.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 1000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = server;
