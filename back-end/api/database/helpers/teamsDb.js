db = require("../dbConfig.js");

const table = "teams";

module.exports = {
  get: function() {
    return db(table);
  },
  getID: function(id) {
    return db(table).where("id", id);
  },
  getTeamCode: function(teamCode) {
    return db(table).where("team_code", teamCode);
  },
  insert: function(post) {
    return db(table)
      .insert(post)
      .then(ids => ({ id: ids[0] }));
  },
  update: function(id, post) {
    return db(table)
      .where("id", id)
      .update(post);
  },
  remove: function(id) {
    return db(table)
      .where("id", id)
      .del();
  }
};
