exports.up = function(knex, Promise) {
    return knex.schema.createTable("slackAuth", tbl => {
      tbl.increments("id");
      tbl.string("access_token").notNullable();
      tbl.string("user_id").notNullable();
      tbl.string("team_name").notNullable();
      tbl.string("team_id").notNullable();
      tbl.string("bot_user_id");
      tbl.string("bot_access_token");
      tbl.integer("member_id").unique().notNullable();
      tbl.string("channel_id");
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("slackAuth");
  };
  
