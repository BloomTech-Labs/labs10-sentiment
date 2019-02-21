exports.up = function(knex, Promise) {
    return knex.schema.createTable("slash", tbl => {
      tbl.increments("id");
      tbl.string("slash").notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("slash");
  };
