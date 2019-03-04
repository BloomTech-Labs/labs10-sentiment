exports.up = function(knex, Promise) {
  return knex.schema.createTable("surveys", tbl => {
    tbl.increments("id");
    tbl.string("title", 255).notNullable();
    tbl.string("description", 255).notNullable();
    tbl.timestamp("created_at", true).defaultTo(knex.fn.now());
    tbl.integer("manager_id").notNullable();
    tbl.string("survey_time_stamp");
    tbl.string("ex_time");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("surveys");
};
