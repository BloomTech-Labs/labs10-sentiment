const express = require('express');
const configureRoutes = require('./routes/routes.js');
const configureMiddleware = require('./middleware/middleware.js');
const server = express();

configureMiddleware(server);
configureRoutes(server);

module.exports = {
  server
};