const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

module.exports = server => {
  server.use(morgan("short"));
  server.use(helmet());
  server.use(cors());
  server.use(express.json());
};
