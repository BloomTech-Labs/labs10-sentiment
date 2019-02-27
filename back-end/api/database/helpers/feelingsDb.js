db = require("../dbConfig.js");

const table = "feelings";

module.exports = {
  get: function() {
    return db(table);
  },
  getID: function(id) {
    return db(table).where("id", id);
  },
  getByMemberAndSurveyTimeStamp: function(team_member_id, survey_time_stamp) {
    return db(table).where({ survey_time_stamp: survey_time_stamp, team_member_id: team_member_id });
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
