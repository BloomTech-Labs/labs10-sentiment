exports.up = function(knex, Promise) {
  return knex.schema.createTable("survey_feelings", tbl => {
    tbl.increments("id");

    // tbl
    //   .integer("survey_id")
    //   .unsigned()
    //   .references("id")
    //   .inTable("surveys");
    // tbl
    //   .integer("feelings_id")
    //   .unsigned()
    //   .references("id")
    //   .inTable("feelings");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("survey_feelings");
};
