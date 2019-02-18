const express = require("express");
const configureMiddleware = require("../back-end/api/middleware/middleware.js");

const server = express();
configureMiddleware(server);

server.get("/", (req, res) => {
  res.status(200).json("MOOD BOT ITS WORKING");
  console.log("MOOD BOT ITS WORKING!!!");
});

module.exports = server;
