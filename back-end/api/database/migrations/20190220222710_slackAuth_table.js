exports.up = function(knex, Promise) {
    return knex.schema.createTable("slackAuth", tbl => {
      tbl.increments("id");
      tbl.string("slackAuth").notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("slackAuth");
  };
  
