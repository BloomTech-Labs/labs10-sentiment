const knex = require("knex");
require("dotenv").config();
const knexConfig = require("../../knexfile");
let environment = process.env.DB_ENV;
const client = knexConfig[environment];
module.exports = knex(client);
