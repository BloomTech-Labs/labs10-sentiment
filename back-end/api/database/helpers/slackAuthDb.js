db = require("../dbConfig.js");
let teamMembers = db("teamMembers");
const table = "slackAuth";

module.exports = {
  get: function() {
    return db(table);
  },
  getID: function(id) {
    return db(table).where("id", id);
  },
  getByMemberId: function(member_id) {
    return db(table).where("member_id", member_id);
  },
  getBySlackUserId: function(user_id) {
    return db(table).where("user_id", user_id);
  },
  getBySlackTeamId: function(team_id) {
    return db("slackAuth")
      .innerJoin(
        db("teamMembers"),
        "slackAuth.member_id",
        "teamMembers.id"
      )
      .where({
        "slackAuth.team_id": team_id,
        "teamMembers.type": "manager"
      });
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
