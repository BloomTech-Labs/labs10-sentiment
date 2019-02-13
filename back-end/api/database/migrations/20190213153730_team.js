exports.up = function(knex, Promise) {
  return knex.schema.createTable("teams", tbl => {
    tbl.increments();

    tbl.string("name", 255).notNullable();
    tbl.integer("team_code").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("teams");
};
