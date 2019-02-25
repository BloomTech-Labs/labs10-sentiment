exports.up = function(knex, Promise) {
  return knex.schema.createTable("teams", tbl => {
    tbl.increments("id");
    tbl.string("name", 255).unique().notNullable();
    tbl.integer("team_code").unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("teams");
};
