
exports.up = function(knex, Promise) {
    return knex.schema.createTable("pre_set_feelings", tbl => {
      tbl.increments("id");
      tbl.string("feeling_text", 255).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("pre_set_feelings");
  };