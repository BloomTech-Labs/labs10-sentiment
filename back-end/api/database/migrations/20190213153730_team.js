exports.up = function(knex, Promise) {
  return knex.schema.createTable("teams", tbl => {
    // tbl.increments("id").primary(["id"]);
    tbl.serial("id");
    tbl.string("name", 255).notNullable();
    tbl.integer("team_code").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("teams");
};
