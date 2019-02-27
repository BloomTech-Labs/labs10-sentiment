//
exports.up = function(knex, Promise) {
  return knex.schema.createTable("feelings", tbl => {
    tbl.increments("id");
    tbl.string("feeling_text", 255).notNullable();
    tbl.timestamp("created_at", true).defaultTo(knex.fn.now());
    tbl.integer("team_member_id").notNullable();
    tbl.string("survey_time_stamp");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("feelings");
};
