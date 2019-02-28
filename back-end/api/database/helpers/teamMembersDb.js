db = require("../dbConfig.js");

const table = "teamMembers";

module.exports = {
  get: function() {
    return db(table);
  },
  getID: function(id) {
    return db(table).where("id", id);
  },
  getByTeamId: function(team_id) {
    return db(table).where("team_id", team_id);
  },
  getManager: function(team_id) {
    return db(table).where({team_id: team_id, type: "manager"});
  },
  getEmail: function(email) {
    return db(table).where("email", email);
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
