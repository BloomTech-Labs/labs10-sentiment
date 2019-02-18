exports.up = function(knex, Promise) {
  return knex.schema.createTable("survey_feelings", tbl => {
    tbl.increments("id");
    tbl.integer("survey_id").notNullable();
    tbl.integer("feelings_id").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("survey_feelings");
};
