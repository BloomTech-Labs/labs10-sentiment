const knex = require('knex');
const knexConfig = require('../../knexfile.js');
let environment = process.env.DB_ENV;
const client = knexConfig[environment];
module.exports = knex(client);