exports.up = function(knex, Promise) {
  return knex.schema.createTable("teamMembers", tbl => {
    tbl.increments();
    tbl.string("firstName", 255).notNullable();
    tbl.string("lastName", 255).notNullable();
    tbl.string("email", 255).unique().notNullable();
    tbl.string("phone", 255).notNullable();
    tbl.string("type", 255);
    tbl.integer("team_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("teamMembers");
};
