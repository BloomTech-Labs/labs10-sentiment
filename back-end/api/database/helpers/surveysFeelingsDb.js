db = require("../dbConfig.js");

const table = "survey_feelings";

module.exports = {
  get: function() {
    return db(table);
  },
  getID: function(id) {
    return db(table).where("id", id);
  },
  getSurveyAndFeelingID: function(survey_id, feelings_id) {
    return db(table).where({ survey_id: survey_id, feelings_id: feelings_id });
  },
  getSurveyID: function(survey_id) {
    return db(table).where("survey_id", survey_id);
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
