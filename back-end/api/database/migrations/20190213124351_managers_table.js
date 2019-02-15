exports.up = function(knex, Promise) {
  return knex.schema.createTable("managers", tbl => {
    tbl.increments("id").primary();

    tbl.string("firstName", 255).notNullable();

    tbl.string("lastName", 255).notNullable();

    tbl.string("password", 255).notNullable();

    tbl.string("email", 255).notNullable();

    tbl.string("phone", 255).notNullable();

    tbl.string("type", 255).notNullable();

    tbl
      .integer("team_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("teams");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("managers");
};
