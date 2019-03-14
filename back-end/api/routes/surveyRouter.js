const express = require("express");
const router = express.Router();
const request = require("request");
const schedule = require("node-schedule");
const db = require("../database/helpers/surveysDb");
const server = require("../server.js");
const moment = require("moment");

const teamMembersDb = require("../database/helpers/teamMembersDb");
const surveyDb = require("../database/helpers/surveysDb");
const surveyFeelingsDb = require("../database/helpers/surveysFeelingsDb");
const preFeelingsDb = require("../database/helpers/preFeelingsDb");
const feelingsdb = require("../database/helpers/feelingsDb");
const surveyAcitveDb = require("../database/helpers/surveysActiveDb");

const {
  postSuccess,
  serverErrorPost,
  getSuccess,
  serverErrorGet,
  serverErrorGetID,
  serverErrorDelete404,
  serverErrorDelete500,
  serverErrorUpdate404,
  serverErrorUpdate500
} = require("./routeHelpers/helpers.js");

const type = "survey";
const type2 = "Team Member";

// let timeInfo = {
//   dailyWeeklyMonthly: postInfo.dailyWeeklyMonthly, optional values are = daily/weekly/monthly
//   hour: postInfo.hour,
//   amPm: postInfo.amPm, / options AM/PM
//   timeZone: postInfo.timeZone / optional values PST/EST
// };

// let insertInfo = {
//   title: postInfo.title,
//   description: postInfo.description,
//   manager_id: postInfo.manager_id
// };

const onServerStartScheduleSurveys = () => {
  console.log("on server start");
  //////////////////////////////////////////////////////////

  surveyDb
    .get()
    .then(data => {
      if (data.length === 0) {
        console.log({
          error: `No surveys exist.`
        });
      } else {
        ////////////////////////////////////////////////////////////
        for (let t = 0; t < data.length; t++) {
          let survey_id = data[t].id;
          let { manager_id, title, description, ex_time } = data[t];

          surveyAcitveDb
            .getBySurveyID(survey_id)
            .then(data => {
              console.log("data check", data);
              if (data[0].active === false) {
                return;
              } else {
                surveyFeelingsDb
                  .getSurveyID(survey_id)
                  .then(data => {
                    // console.log("survey feeling array", data);
                    let feelingTextArray = [];

                    for (let i = 0; i < data.length; i++) {
                      let { feelings_id } = data[i];
                      preFeelingsDb
                        .getID(feelings_id)
                        .then(data => {
                          // console.log("pre feeling array", data);
                          if (data.length === 0) {
                            // res.status(404).json({
                            console.log({
                              error: `Pre Feeling with Id: ${feelings_id} does not exist.`
                            });
                          } else {
                            let { feeling_text } = data[0];
                            feelingTextArray.push(feeling_text);
                          }
                        })
                        .catch(err => console.log(err));
                    }

                    console.log(feelingTextArray);
                    let botInfo = {
                      message: true,
                      member_id: manager_id,
                      survey_id: survey_id,
                      title: title,
                      description: description,
                      // channelID:
                      options: feelingTextArray
                    };

                    console.log("botInfo", botInfo);
                    /////////////////////////////////////////////////////////survey_id to string
                    let stringSurveyId = survey_id.toString();
                    console.log("stringSurveyId", stringSurveyId);
                    schedule.scheduleJob(stringSurveyId, ex_time, function() {
                      console.log("Schedule Processed");
                      console.log("botInfo2", botInfo);
                      let postOptions = {
                        uri:
                          "https://botsentiment.herokuapp.com/api/slash/send-me-buttons",
                        method: "POST",
                        headers: {
                          "Content-type": "application/json"
                        },
                        json: botInfo
                      };
                      request(postOptions, (error, response, body) => {
                        if (error) {
                          // handle errors as you see fit
                          res.json({ error: "Error." });
                        }
                      });
                    });
                  })
                  .catch(err => console.log(err));
              }
            })
            .catch();
        }
        /////////////////////////////////
      }
    })
    .catch(err => console.log(err));

  //////////////////////////////////////////////////////////////
};

const surveyScheduler = (timeInfo, postInfo) => {
  let hour;
  let min = timeInfo.min;
  let exTime = "";
  let manager_id = postInfo.manager_id;
  let title = postInfo.title;
  let description = postInfo.description;
  let dayLightSavingsTest = moment().isDST();
  let dayLightSavings;
  let HerokuTimeFactor = 4;

  console.log("dayLightSavingsTest", dayLightSavingsTest);

  if (dayLightSavingsTest === true) {
    dayLightSavings = 1;
  } else {
    dayLightSavings = 0;
  }

  if (timeInfo.timeZone === "PST") {
    if (timeInfo.amPm === "AM") {
      if (timeInfo.hour === 12) {
        timeInfo.hour = 0;
      }
      hour = timeInfo.hour + 8 - dayLightSavings - HerokuTimeFactor;
    } else if (timeInfo.amPm === "PM") {
      if (timeInfo.hour === 12) {
        timeInfo.hour = 0;
      }
      hour = timeInfo.hour + 12 + 8 - dayLightSavings - HerokuTimeFactor;
      if (hour >= 24) {
        hour = hour - 24;
      }
    }
  } else if (timeInfo.timeZone === "EST") {
    if (timeInfo.amPm === "AM") {
      if (timeInfo.hour === 12) {
        timeInfo.hour = 0;
      }
      hour = timeInfo.hour + 5 - dayLightSavings - HerokuTimeFactor;
    } else if (timeInfo.amPm === "PM") {
      if (timeInfo.hour === 12) {
        timeInfo.hour = 0;
      }
      hour = timeInfo.hour + 12 + 5 - dayLightSavings - HerokuTimeFactor;
      if (hour >= 24) {
        hour = hour - 24;
      }
    }
  }

  if (timeInfo.dailyWeeklyMonthly === "daily") {
    exTime = `${min} ${hour} * * *`; /////////////////////////////////////////////
  } else if (timeInfo.dailyWeeklyMonthly === "weekly") {
    exTime = `${min} ${hour} * * 5`;
  } else if (timeInfo.dailyWeeklyMonthly === "monthly") {
    exTime = `${min} ${hour} 1 * *`;
  } else if (timeInfo.dailyWeeklyMonthly === "test") {
    exTime = `*/1 * * * *`;
  }

  console.log("exTime", exTime);

  surveyDb
    .getManagerID(manager_id)
    .then(data => {
      console.log("survey data", data);
      let survey_id = Math.max.apply(
        Math,
        data.map(function(o) {
          return o.id;
        })
      );

      console.log("survey id", survey_id);
      if (data.length === 0) {
        console.log({
          error: `Survey with Manager Id: ${manager_id} does not exist.`
        });
      } else {
        let updatePost = {
          ex_time: exTime
        };
        surveyDb
          .update(survey_id, updatePost)
          .then(() => {
            surveyFeelingsDb
              .getSurveyID(survey_id)
              .then(data => {
                console.log("survey feeling array", data);
                let feelingTextArray = [];

                for (let i = 0; i < data.length; i++) {
                  let { feelings_id } = data[i];
                  preFeelingsDb
                    .getID(feelings_id)
                    .then(data => {
                      console.log("pre feeling array", data);
                      if (data.length === 0) {
                        // res.status(404).json({
                        console.log({
                          error: `Pre Feeling with Id: ${feelings_id} does not exist.`
                        });
                      } else {
                        let { feeling_text } = data[0];
                        feelingTextArray.push(feeling_text);
                      }
                    })
                    .catch(err => console.log(err));
                }

                console.log(feelingTextArray);
                let botInfo = {
                  message: true,
                  member_id: manager_id,
                  survey_id: survey_id,
                  title: title,
                  description: description,
                  options: feelingTextArray
                };

                console.log("botInfo", botInfo);
                let stringSurveyId = survey_id.toString();
                console.log("stringSurveyId", stringSurveyId);

                schedule.scheduleJob(stringSurveyId, exTime, function() {
                  console.log("Schedule Processed");
                  console.log("botInfo2", botInfo);
                  let postOptions = {
                    uri:
                      "https://botsentiment.herokuapp.com/api/slash/send-me-buttons",
                    method: "POST",
                    headers: {
                      "Content-type": "application/json"
                    },
                    json: botInfo
                  };
                  request(postOptions, (error, response, body) => {
                    if (error) {
                      // handle errors as you see fit
                      res.json({ error: "Error." });
                    }
                  });
                });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

// function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
// let postOptions = {
//   uri: responseURL,
//   method: "POST",
//   headers: {
//     "Content-type": "application/json"
//   },
//   json: JSONmessage
// };
// request(postOptions, (error, response, body) => {
//   if (error) {
//     // handle errors as you see fit
//     res.json({ error: "Error." });
//   }
// });
// }

router.post("/", (req, res) => {
  const postInfo = req.body;
  // body = manager_id/ description/ title / time values

  teamMembersDb
    .get()
    .where("id", postInfo.manager_id)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: `${type2} with ID ${postInfo.manager_id} does not exist.`
        });
      } else {
        let insertInfo = {
          title: postInfo.title,
          description: postInfo.description,
          manager_id: postInfo.manager_id,
          ex_time: ""
        };

        let timeInfo = {
          dailyWeeklyMonthly: postInfo.dailyWeeklyMonthly,
          hour: postInfo.hour,
          amPm: postInfo.amPm,
          timeZone: postInfo.timeZone,
          min: postInfo.min
        };

        let preFeelingIdsArray = postInfo.preFeelingIdsArray;

        db.insert(insertInfo)
          .then(() => {
            db.get()
              .then(data => {
                let newID = Math.max.apply(
                  Math,
                  data.map(function(o) {
                    return o.id;
                  })
                );
                console.log("insert data", newID);
                let postActive = {
                  survey_id: newID,
                  active: true
                };
                surveyAcitveDb
                  .insert(postActive)
                  .then(postSuccess(res))
                  .catch(serverErrorPost(res));

                console.log({
                  timeInfo: timeInfo,
                  insertInfo: insertInfo
                });
                db.getManagerID(postInfo.manager_id)
                  .then(data => {
                    console.log("survey manager", data);

                    let survey_ID = Math.max.apply(
                      Math,
                      data.map(function(o) {
                        return o.id;
                      })
                    );

                    for (let i = 0; i < preFeelingIdsArray.length; i++) {
                      let post = {
                        survey_id: survey_ID,
                        feelings_id: preFeelingIdsArray[i]
                      };
                      surveyFeelingsDb
                        .insert(post)
                        .then(getSuccess(res))
                        .catch(serverErrorGet(res));
                    }
                  })
                  .then(() => {
                    surveyScheduler(timeInfo, insertInfo);
                  })
                  .catch(serverErrorGet(res));
              })
              .catch(serverErrorGet(res));
          })
          .catch(serverErrorPost(res));
      }
    });
});

router.get("/manager/:id", (req, res) => {
  const { id } = req.params;
  db.get()
    .where({ manager_id: id })
    .then(getSuccess(res))
    .catch(serverErrorGet(res));
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   feelingsdb.get().where({ survey_id: id }).then(data => {
//     db.getID(id)
//     .then(response => {
//       res.status(200).json({ response, data})
//     })
//     .catch(serverErrorGetID(res, type, id));
//   })

// });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  feelingsdb
    .get()
    .where({ survey_time_stamp: id })
    .then(data => {
      db.get()
        .where({ survey_time_stamp: id })
        .then(response => {
          res.status(200).json({ response, data });
        })
        .catch(serverErrorGetID(res, type, id));
    });
});

router.delete(`/:id`, (req, res) => {
  const { id } = req.params;
  db.getID(id)
    .then(data => {
      if (data.length > 0) {
        db.remove(id).then(() => {
          db.get().then(() => {
            console.log("delete id", id);
            let stringSurveyId = id.toString();
            console.log("stringSurveyId", stringSurveyId);

            var my_job = schedule.scheduledJobs[stringSurveyId];
            my_job.cancel();
            res.status(200).json({ message: `Survey ID: ${id} canceled` });
          });
        });
      } else {
        serverErrorDelete404(res, type, id);
      }
    })
    .catch(() => {
      serverErrorDelete500(res, type);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.getID(id).then(data => {
    if (data) {
      db.update(id, changes)
        .then(() => {
          db.get().then(getSuccess(res));
        })
        .catch(() => {
          serverErrorUpdate500(res, type);
        });
    } else {
      serverErrorUpdate404(res, type, id);
    }
  });
});

router.get("/changeActivity/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  let change;
  surveyAcitveDb.getBySurveyID(id).then(data => {
    if (data.length > 0) {
      console.log("data change", data);
      let activity = data[0].active;
      let surveyActiveID = data[0].id;
      console.log("activity", activity);

      if (activity === 1) {
        change = {
          active: false
        };
      } else {
        change = {
          active: false
        };
      }
      surveyAcitveDb
        .update(surveyActiveID, change)
        .then(() => {
          // surveyAcitveDb.get().then(getSuccess(res));

          let stringSurveyId = id.toString();
          console.log("stringSurveyId", stringSurveyId);
          var my_job = schedule.scheduledJobs[stringSurveyId];
          my_job.cancel();
          res.status(200).json({ message: `Survey ID: ${id} canceled` });
        })
        .catch(() => {
          serverErrorUpdate500(res, type);
        });
    } else {
      serverErrorUpdate404(res, type, id);
    }
  });
});

// router.get("/requestActivity", (req, res) => {
//   surveyAcitveDb
//     .get()
//     .then(data => {
//       res.status(200).json(data);
//     })
//     .catch(serverErrorGet(res));
// });

// router.get("/requestActivity/:id", (req, res) => {
//   const { id } = req.params;
//   console.log("id req", id);

//   surveyAcitveDb
//     .getBySurveyID(id)
//     .then(data => {
//       res.status(200).json(data[0].active);
//     })
//     .catch(serverErrorGetID(res, type, id));
// });

// router.get("/test/moment", (req, res) => {
//   let test = moment().isDST();
//   let time = moment();
//   res.json(time);
// });

module.exports = { router, onServerStartScheduleSurveys };
